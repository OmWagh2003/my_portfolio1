"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const aiProjects = [
    {
        id: "01",
        name: "AI RFP EVALUATOR",
        date: "April 2025",
        tech: "Python, FastAPI, LangChain, RAG, GroqAPI (LLaMA)",
        description:
            "Built an AI-powered RFP analysis system automating 80% of manual eligibility extraction from government PDFs. Engineered an end-to-end GenAI workflow for 100% automated decision reporting.",
        highlights: ["Semantic matching/scoring engine", "70% accuracy threshold tuning"],
        image: "/AI_RFP_EVALUATOR.png"
    },
    {
        id: "02",
        name: "AI-POWERED LPR",
        date: "Feb 2024",
        tech: "Python, YOLOv8, EasyOCR",
        description:
            "Developed a web application for multiple license plate recognition (LPR) integrated with a vehicle database and do comprehensive compliance checks within a minute .",
        highlights: ["89% mAP accuracy", "Handle multilingual plates accurately"],
        image: "/AI_POWERED_LPR.png"
    },
    {
        id: "03",
        name: "VIDEO SUMMARIZATION",
        date: "Nov 2023",
        tech: "Python, LSA, Gensim, Pegasus, IBM Watson",
        description:
            "Developed a website that provides two-way summarization of YouTube videos, enabling users to understand a 1-hour long video in just 10-15 minutes.",
        highlights: ["Extractive (Gensim): 29% original text", "Abstractive (Pegasus): 16% original text"],
        image: "/VIDEO_SUMMARIZATION.png"
    },
];

export const Projects = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapperRef.current || !containerRef.current) return;

        // We make sure it works perfectly on desktop. We disable the horizontal pin on small screens for better UX.
        const runAnimation = () => {
            const sections = gsap.utils.toArray(".project-panel");

            let tl = gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    start: "top top",
                    end: () => "+=" + wrapperRef.current!.offsetWidth,
                },
            });

            // Simple fade up for inner content to ensure it's not broken
            sections.forEach((section: any) => {
                gsap.fromTo(
                    section.querySelectorAll(".project-reveal"),
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: section,
                            containerAnimation: tl,
                            start: "left center",
                        },
                    }
                );
            });

            return tl;
        };

        let ctx: gsap.Context;

        // Only run horizontal scroll on larger screens to avoid mobile jank
        let mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            ctx = gsap.context(() => {
                runAnimation();
            }, containerRef);
        });

        // Simple vertical fade-in for mobile layout
        mm.add("(max-width: 767px)", () => {
            const sections = gsap.utils.toArray(".project-panel");
            sections.forEach((section: any) => {
                gsap.fromTo(
                    section.querySelectorAll(".project-reveal"),
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 75%",
                        },
                    }
                );
            });
        });

        return () => {
            if (ctx) ctx.revert();
            mm.revert();
        };
    }, []);

    return (
        <section id="projects" ref={containerRef} className="h-auto md:h-screen w-full flex flex-col overflow-hidden bg-[#050505] border-t border-gray-900 relative">
            
            {/* Section Title */}
            <div className="w-full shrink-0 pt-16 px-6 md:pt-16 md:px-24 z-50">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white capitalize">
                    Projects<span className="text-[#9D4EDD]">.</span>
                </h2>
            </div>

            <div ref={wrapperRef} className="flex flex-col md:flex-row h-auto flex-1 w-full md:w-[300vw]">
                {aiProjects.map((project, i) => (
                    <div
                        key={project.id}
                        className="project-panel h-auto md:h-full w-full md:w-screen flex-shrink-0 flex items-center justify-center py-12 px-6 md:p-12 lg:p-24 relative overflow-hidden"
                    >
                        {/* Background Accent */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                            <span className="text-[40vw] font-bold text-[#9D4EDD] select-none tracking-tighter">
                                {project.id}
                            </span>
                        </div>

                        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center">
                            {/* Text Content */}
                            <div className="w-full md:w-5/12 flex flex-col order-2 md:order-1 flex-shrink-0">
                                <div className="project-reveal hidden md:flex mb-4 items-center gap-4">
                                    <span className="text-[#9D4EDD] font-mono text-xl">{project.id}</span>
                                    <div className="h-[1px] w-12 bg-gray-700" />
                                    <span className="text-gray-400 font-mono tracking-wider">{project.date}</span>
                                </div>

                                <h2 className="project-reveal text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white uppercase leading-none">
                                    {project.name}
                                </h2>

                                <div className="project-reveal mb-8 p-6 bg-[#0a0a0a] border border-gray-800 rounded-2xl">
                                    <p className="text-gray-300 text-lg leading-relaxed mix-blend-difference">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="project-reveal mb-8">
                                    <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-4">Tech Stack</h3>
                                    <p className="text-white font-medium text-lg border-l-2 border-[#9D4EDD] pl-4">
                                        {project.tech}
                                    </p>
                                </div>

                                <div className="project-reveal">
                                    <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-4">Impact / Highlights</h3>
                                    <ul className="space-y-2">
                                        {project.highlights.map((h, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-gray-300">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#9D4EDD]" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Visual Content (Actual Image) */}
                            <div className="project-reveal hidden md:flex w-full md:w-7/12 min-h-[40vh] md:h-[65vh] bg-[#0a0a0a] border border-gray-800 rounded-3xl overflow-hidden group order-1 md:order-2 relative shadow-2xl">
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
