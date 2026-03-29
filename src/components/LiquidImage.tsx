"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LiquidShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uTexture: new THREE.Texture(),
        uScrollVelocity: 0,
    },
    // vertex shader
    `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uScrollVelocity;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Add a wave effect based on scroll velocity and time
      float wave = sin(pos.x * 5.0 + uTime * 2.0) * uScrollVelocity * 0.15;
      pos.z += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
    // fragment shader
    `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uScrollVelocity;

    void main() {
      vec2 uv = vUv;
      
      // RGB shift based on scroll velocity
      float shift = uScrollVelocity * 0.05;
      float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
      
      // Convert to grayscale slightly and increase contrast to match design
      vec3 color = vec3(r, g, b);
      float gray = dot(color, vec3(0.299, 0.587, 0.114));
      vec3 finalColor = mix(color, vec3(gray), 0.8) * 1.3;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ LiquidShaderMaterial });

// Add TypeScript definition for the custom shader element
declare global {
    namespace JSX {
        interface IntrinsicElements {
            liquidShaderMaterial: any;
        }
    }
}

const Scene = ({ src }: { src: string }) => {
    const texture = useTexture(src);
    const materialRef = useRef<any>(null);
    const { viewport } = useThree();

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.elapsedTime;
        }
    });

    useEffect(() => {
        let proxy = { velocity: 0 };
        const st = ScrollTrigger.create({
            trigger: document.body,
            start: 0,
            end: "max",
            onUpdate: (self) => {
                const rawVel = self.getVelocity();
                // Normalize velocity
                const velocity = Math.min(Math.max(Math.abs(rawVel) / 1000, 0), 1);

                gsap.to(proxy, {
                    velocity,
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (materialRef.current) {
                            materialRef.current.uScrollVelocity = proxy.velocity;
                        }
                    }
                });
            }
        });

        return () => {
            st.kill();
        }
    }, []);

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            {/* @ts-ignore - custom shader element typing */}
            <liquidShaderMaterial ref={materialRef} uTexture={texture} />
        </mesh>
    );
};

export const LiquidImage = ({ src }: { src: string }) => {
    return (
        <div className="w-full h-full relative">
            <Canvas camera={{ position: [0, 0, 1.5], fov: 45 }}>
                <Scene src={src} />
            </Canvas>
        </div>
    );
};
