"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef1 = useRef<HTMLHeadingElement>(null);
    const textRef2 = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Elegant entry animation
        const tl = gsap.timeline();
        tl.fromTo(
            textRef1.current,
            { y: 100, opacity: 0, rotationX: -20 },
            { y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: "power4.out" }
        )
            .fromTo(
                textRef2.current,
                { y: 100, opacity: 0, rotationX: -20 },
                { y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: "power4.out" },
                "-=0.9"
            )
            .fromTo(
                subtitleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.6"
            )
            .fromTo(
                bgRef.current,
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 0.15, duration: 2, ease: "power2.out" },
                0
            );

        // Subtle parallax on scroll
        gsap.to(containerRef.current, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        // Live dotted background animation
        gsap.to(bgRef.current, {
            backgroundPosition: "40px 40px",
            duration: 15,
            ease: "none",
            repeat: -1,
        });

        // Gentle parallax and subtle fade out for hero image
        gsap.to(imageRef.current, {
            opacity: 0.3,
            scale: 1.1,
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-[100svh] w-full flex flex-col justify-center px-10 md:px-24 overflow-hidden bg-[#050505]"
        >
            {/* Hero Image Background */}
            <div
                ref={imageRef}
                className="absolute inset-0 z-0 h-full w-full overflow-hidden"
            >
                <Image
                    src="/hero.jpg"
                    alt="Om Wagh Hero Background"
                    fill
                    quality={100}
                    className="object-cover scale-100"
                    style={{ objectPosition: "60% 5%" }}
                    priority
                />
            </div>

            {/* Subtle Data/Grid Background */}
            <div
                ref={bgRef}
                className="absolute inset-0 pointer-events-none opacity-10 mix-blend-screen"
                style={{
                    backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            {/* Top Nav */}
            <div className="absolute top-8 left-0 w-full flex justify-between items-start px-10 md:px-24 z-20 text-sm font-sans mix-blend-difference">
                <div className="flex flex-col mt-0.5">
                    <span className="text-gray-400">Available for Work</span>
                    <a href="#contact" className="font-medium text-white tracking-widest uppercase text-xs mt-1 underline hover:text-[#9D4EDD] transition-colors">Let&apos;s Talk</a>
                </div>
                <div className="hidden md:flex gap-8 pt-1.5">
                    <a href="#experience" className="text-gray-400 hover:text-white transition-colors">Experience</a>
                    <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
                    <a href="#education" className="text-gray-400 hover:text-white transition-colors">Education</a>
                </div>
                <div className="flex items-start gap-6">
                    <a href="/Om_Wagh_Resume_updated1.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-1.5 bg-[#9D4EDD]/20 border border-[#9D4EDD]/60 rounded-full text-white hover:bg-[#9D4EDD]/30 hover:border-[#9D4EDD] transition-all duration-300 shadow-[0_0_15px_rgba(157,78,221,0.3)] hover:shadow-[0_0_25px_rgba(157,78,221,0.6)]">
                        <span className="text-sm">📄</span>
                        <span className="font-medium tracking-widest uppercase text-[10px] mt-[1px]">View Resume</span>
                    </a>
                    <a href="https://www.linkedin.com/in/om-wagh-953007235/" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-white hover:text-[#9D4EDD] transition-colors relative group pt-1.5">
                        <span className="relative z-10">LinkedIn</span>
                        <MoveUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="absolute bottom-12 md:bottom-16 left-10 md:left-24 z-10 flex flex-col items-start pr-10">
                <div style={{ perspective: "1000px" }}>
                    <h1
                        ref={textRef1}
                        className="text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mix-blend-difference font-bold text-white"
                    >
                        OM WAGH
                    </h1>
                </div>
                <div style={{ perspective: "1000px" }}>
                    <h1
                        ref={textRef2}
                        className="text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mix-blend-difference font-bold text-gray-400"
                    >
                        AI DEVELOPER<span className="text-[#9D4EDD]">.</span>
                    </h1>
                </div>

                <p
                    ref={subtitleRef}
                    className="mt-4 text-sm md:text-base text-gray-300 max-w-md font-light leading-relaxed border-l-2 border-[#9D4EDD] pl-4 mix-blend-difference"
                >
                    Specializing in <span className="text-[#9D4EDD] font-medium">Product Building</span>, Enterprise AI pipelines, and intelligent cloud systems.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 right-10 md:right-24 flex items-center gap-4 mix-blend-difference">
                <span className="text-xs tracking-widest text-gray-400 uppercase">Scroll to explore</span>
                <div className="w-[1px] h-12 bg-gray-700 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-[#9D4EDD] animate-ping" />
                </div>
            </div>
        </section>
    );
};
