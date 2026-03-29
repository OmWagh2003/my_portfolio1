"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
    {
        institution: "Vishwakarma Institute of Technology",
        location: "Pune, Maharashtra",
        degree: "B-Tech in Artificial Intelligence and Data Science",
        score: "CGPA – 8.89",
        date: "2021 – 2025",
        // description: "Specializing in Large Language Models, Generative AI, and high-performance computing architectures. Core focus on building scalable RAG pipelines and enterprise-grade AI systems."
    },
];

const skills = [
    "Python", "Prompt Engineering", "AI", "Machine Learning",
    "Deep Learning", "Generative AI", "RAG Pipelines", "FastAPI", "SQL", "matplotlib",
    "pandas", "NumPy", "scikit-learn"
];

export const EducationSkills = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Clean, minimal entrance animation
            gsap.fromTo(
                cardRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    },
                }
            );

            // Infinite scroll marquee for skills
            if (marqueeRef.current) {
                gsap.to(marqueeRef.current, {
                    xPercent: -50,
                    ease: "linear",
                    duration: 25,
                    repeat: -1,
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const edu = educationData[0];

    return (
        <section
            id="education"
            ref={containerRef}
            className="w-full py-24 bg-[#050505] border-t border-gray-900/50"
        >
            <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col">

                {/* Section Title */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white capitalize">
                        Education<span className="text-[#9D4EDD]">.</span>
                    </h2>
                </div>

                {/* Minimal Row Card */}
                <div
                    ref={cardRef}
                    className="group relative flex flex-col md:flex-row gap-6 md:gap-12 items-start pb-10 border-b border-gray-800/60 transition-colors hover:border-[#9D4EDD]/30"
                >
                    {/* Date/Timeline Column */}
                    <div className="shrink-0 pt-1 text-gray-500 font-mono text-sm w-32 border-l-2 border-transparent group-hover:border-[#9D4EDD] pl-4 transition-all duration-300">
                        {edu.date}
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 flex flex-col gap-2">
                        <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                            {edu.institution}
                        </h3>
                        <p className="text-lg font-medium text-[#9D4EDD]">
                            {edu.degree}
                        </p>
                        {/* <p className="text-gray-400 font-light leading-relaxed mt-2 max-w-2xl">
                            {edu.description}
                        </p> */}
                    </div>

                    {/* Meta Column (Score & Location) */}
                    <div className="shrink-0 flex flex-col gap-1 md:items-end md:text-right mt-2 md:mt-0">
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Score</span>
                        <span className="text-lg font-semibold text-white">{edu.score}</span>
                        <span className="text-sm text-gray-500 mt-2">{edu.location}</span>
                    </div>
                </div>
            </div>

            {/* Skills Marquee - Kept Minimal & Cool */}
            <div className="w-full relative py-8 border-y border-gray-900/50 bg-[#0a0a0a] mt-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                <div className="whitespace-nowrap flex items-center">
                    <div ref={marqueeRef} className="flex gap-8 whitespace-nowrap text-2xl md:text-3xl font-bold tracking-tight text-gray-800 uppercase">
                        {[...skills, ...skills].map((skill, idx) => (
                            <span key={idx} className="hover:text-gray-300 transition-colors cursor-default">
                                {skill}
                                <span className="text-[#9D4EDD] ml-8 opacity-50">★</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
