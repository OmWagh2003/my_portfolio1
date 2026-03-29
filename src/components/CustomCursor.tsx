"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const textTags = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "li", "a", "button", "label"];

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const tagName = target.tagName.toLowerCase();
      const isInteractive = textTags.includes(tagName) || target.closest("a") || target.closest("button");

      if (isInteractive) {
        setIsHovered(true);
        // Scale elements if they are a text/button tag
        if (textTags.includes(tagName) && !target.classList.contains("no-zoom")) {
          const style = window.getComputedStyle(target);
          if (style.display === "inline") {
            target.style.display = "inline-block";
          }
          gsap.to(target, { scale: 1.05, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        }
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();

      if (textTags.includes(tagName) && !target.classList.contains("no-zoom")) {
        gsap.to(target, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      }
      setIsHovered(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-accent pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovered ? 2 : 1,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.15,
        }}
      />

      <motion.div
        className="fixed top-0 left-0 w-[500px] h-[500px] pointer-events-none z-[1]"
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.1,
        }}
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(157,78,221,0.06) 11%, transparent 20%)",
        }}
      />
    </>
  );
};
