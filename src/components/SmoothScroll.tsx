"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    // Bypass React 19 typings conflict with older Lenis package
    const Lenis = ReactLenis as any;

    return (
        <Lenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
            {children}
        </Lenis>
    );
};
