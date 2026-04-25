import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initSticker = () => {
    const sticker = document.getElementById("sticker") as HTMLElement | null;
    if (!sticker) return;

    // Base horizontal movement distance (adjust if sticker size changes)
    const DIST = 260;

    // Initial entrance animation (not tied to scroll)
    gsap.fromTo(
        sticker,
        {
            y: -250,
            scale: 0.7,
            rotation: 180,
            opacity: 0,
            filter: "blur(10px)",
        },
        {
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.8,
            ease: "power3.out",
        }
    );

    // Subtle floating motion to avoid a static look
    gsap.to(sticker, {
        y: "+=10",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    });

    // Single timeline to avoid conflicting animations
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#info-section",
            start: "top 80%",
            endTrigger: "#tech-section",
            end: "bottom 40%",
            scrub: 1.8, // smooth inertia (works well with Lenis)
        },
    });

    // Move left
    tl.to(sticker, {
        x: -DIST,
        y: -20,
        rotation: -10,
        scale: 0.95,
        filter: "blur(1px)",
        ease: "none", // strictly tied to scroll
    });

    // Move right
    tl.to(sticker, {
        x: DIST,
        y: 30,
        rotation: 10,
        scale: 1.05,
        filter: "blur(0px)",
        ease: "none",
    });

    // Move left again
    tl.to(sticker, {
        x: -DIST,
        y: 0,
        rotation: -6,
        scale: 0.9,
        filter: "blur(2px)",
        ease: "none",
    });

    // Impact effect (scale + blur + fade)
    tl.to(sticker, {
        x: -DIST * 0.3,
        scale: 1.6,
        rotation: 4,
        opacity: 0.4,
        filter: "blur(6px)",
        ease: "power2.out",
    });

    // Final fade out
    tl.to(sticker, {
        scale: 2,
        opacity: 0,
        filter: "blur(20px)",
        ease: "power2.out",
    });

    // Refresh ScrollTrigger after layout is ready
    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });
};