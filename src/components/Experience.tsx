"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const highlightsRefs = useRef<HTMLLIElement[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Title reveal
            gsap.fromTo(
                titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Card reveal
            gsap.fromTo(
                cardRef.current,
                { y: 100, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // List stagger reveal
            gsap.fromTo(
                highlightsRefs.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={containerRef}
            className="relative w-full min-h-[80svh] flex flex-col items-center justify-center px-6 md:px-24 py-20 bg-[#050505] overflow-hidden border-t border-gray-900"
        >
            <div className="w-full max-w-6xl">
                <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-16 tracking-tighter mix-blend-difference">
                    EXPERIENCE<span className="text-[#9D4EDD]">.</span>
                </h2>

                <div
                    ref={cardRef}
                    className="relative bg-[#0a0a0a] border border-gray-800 rounded-3xl p-8 md:p-12 overflow-hidden group hover:border-[#9D4EDD]/50 transition-colors duration-500"
                >
                    {/* Subtle Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9D4EDD]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-800 pb-6">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">AI Developer</h3>
                            <p className="text-[#9D4EDD] text-lg font-medium tracking-wide">Glide Cloud Solution</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                            <span className="inline-block px-4 py-2 bg-gray-900 text-gray-300 rounded-full text-sm font-medium border border-gray-800">
                                June 2024 - Present
                            </span>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-6 font-semibold">Key Responsibilities</h4>
                        <ul className="space-y-6 text-gray-300 leading-relaxed font-light text-md md:text-lg">
                            <li
                                ref={(el) => { if (el) highlightsRefs.current[0] = el; }}
                                className="flex items-start gap-4"
                            >
                                <span className="text-[#9D4EDD] mt-1 shrink-0">❖</span>
                                <p>
                                    Leading a small team in backend development for a <strong className="text-white font-medium">mainframe systems-to-cloud native modernization tool</strong>, building robust <strong className="text-white font-medium">AI based</strong> architectures along with <strong className="text-white font-medium">Eval Pipeline.</strong>
                                </p>
                            </li>
                            <li
                                ref={(el) => { if (el) highlightsRefs.current[1] = el; }}
                                className="flex items-start gap-4"
                            >
                                <span className="text-[#9D4EDD] mt-1 shrink-0">❖</span>
                                <p>
                                    Developed an advanced <strong className="text-white font-medium">"chat with document"</strong> system using LLMs, enabling natural-language interaction with complex mainframe code comprehension across 6 specific code types.
                                </p>
                            </li>
                            <li
                                ref={(el) => { if (el) highlightsRefs.current[2] = el; }}
                                className="flex items-start gap-4"
                            >
                                <span className="text-[#9D4EDD] mt-1 shrink-0">❖</span>
                                <p>
                                    Curently a part of first phase i.e legacy mainframe to technical and business level comprehnsion where our <strong className="text-white font-medium">comprehnsions have achived 90-95% accuracy</strong> and developing new features and handling client apps on daily basis .
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="relative z-10 mt-10 flex flex-wrap gap-3">
                        {["Python", "FastAPI", "Prompt Engineering", "LLM Models"].map((tech, i) => (
                            <span key={i} className="px-3 py-1 bg-[#111] text-xs font-mono text-gray-400 border border-gray-800 rounded-md">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
