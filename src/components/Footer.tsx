"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveUpRight, Mail, Phone, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
    {
        title: "UBS Hackathon",
        role: "2nd Rank",
        date: "Apr 2024",
        desc: "Collaborated in a team to develop a Smart Bin project addressing real-life waste management challenges, securing a top ranking among 50+ participating teams.",
    },
    {
        title: "Wesualization Unleashed",
        role: "Finalist",
        date: "Mar 2024",
        desc: "Selected as one of the top 5 finalists in the dashboard visualization competition out of 100+ national teams.",
    },
    {
        title: "IEEE Student Branch",
        role: "Executive Committee Member",
        date: "VIT, Pune",
        desc: "Worked with the Technical and Design team on the successful planning and execution of college events, and led a Python workshop.",
    },
];

export const Footer = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        gsap.fromTo(
            ".achievement-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".achievements-grid",
                    start: "top 80%",
                },
            }
        );
    }, []);

    return (
        <footer ref={containerRef} className="w-full bg-[#050505] relative overflow-hidden">

            {/* Achievements Section */}
            <div className="w-full max-w-6xl mx-auto px-6 md:px-24 py-24 border-t border-gray-900">
                <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tighter text-white">
                    ACHIEVEMENTS<span className="text-[#9D4EDD]">.</span>
                </h2>

                <div className="achievements-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {achievements.map((item, i) => (
                        <div key={i} className="achievement-card flex flex-col p-8 bg-[#0a0a0a] border border-gray-800 rounded-2xl hover:border-[#9D4EDD]/40 transition-colors group">
                            <span className="text-[#9D4EDD] font-mono text-sm mb-4">{item.date}</span>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <h4 className="text-md font-medium text-gray-400 mb-5">{item.role}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Massive CTA / Contact */}
            <div id="contact" className="w-full bg-[#9D4EDD] text-black rounded-t-[3rem] p-12 md:p-24 relative overflow-hidden">
                {/* Abstract background noise/pattern */}
                <div
                    className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle at center, #000 2px, transparent 2px)",
                        backgroundSize: "20px 20px"
                    }}
                />

                <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between md:items-end gap-12">
                    <div>
                        <h2 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter mb-8">
                            LET'S<br />BUILD.
                        </h2>
                        <p className="max-w-md text-lg md:text-xl font-medium opacity-80 mb-8">
                            Looking to integrate advanced AI models or build scalable cloud architectures? Let's connect.
                        </p>

                        <div className="flex flex-col gap-4 font-mono text-sm font-medium">
                            <a href="mailto:omwagh610@gmail.com" className="flex items-center gap-4 hover:underline">
                                <Mail size={16} /> omwagh610@gmail.com
                            </a>
                            <a href="tel:+917499684130" className="flex items-center gap-4 hover:underline">
                                <Phone size={16} /> +91 7499684130
                            </a>
                            <div className="flex items-center gap-4">
                                <MapPin size={16} /> Pune, Maharashtra
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6 mt-8 md:mt-0">
                        <a
                            href="https://www.linkedin.com/in/om-wagh-953007235/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center w-20 h-20 rounded-full bg-black text-white hover:bg-gray-900 hover:-translate-y-2 transition-all duration-300"
                        >
                            <MoveUpRight size={24} />
                        </a>
                    </div>
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto mt-24 flex justify-between items-center text-sm font-bold border-t border-black/20 pt-8">
                    <span>© {new Date().getFullYear()} Om Wagh</span>
                    <span>AI Developer</span>
                </div>
            </div>
        </footer>
    );
};
