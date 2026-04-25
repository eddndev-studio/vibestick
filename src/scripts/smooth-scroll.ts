import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initSmoothScroll = () => {
    // Disable smooth scroll on mobile for performance
    if (window.innerWidth < 768) return null;

    const lenis = new Lenis({
        lerp: 0.08, // Lower = smoother interpolation (more "premium" feel)
        smoothWheel: true,
    });

    /**
     * Sync Lenis with GSAP ScrollTrigger
     * Ensures ScrollTrigger updates on every Lenis scroll frame
     */
    lenis.on("scroll", () => {
        ScrollTrigger.update();
    });

    /**
     * Use GSAP's internal ticker instead of requestAnimationFrame
     * This keeps GSAP and Lenis perfectly in sync
     */
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing for more accurate timing
    gsap.ticker.lagSmoothing(0);

    /**
     * Handle anchor links (header navigation)
     * Overrides default browser behavior and uses Lenis scroll
     */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();

            const target = anchor.getAttribute("href");
            if (!target) return;

            lenis.scrollTo(target, {
                offset: -80, // Adjust based on fixed header height
                duration: 1.2,
                easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
            });
        });
    });

    /**
     * Initial refresh to ensure all ScrollTriggers are correctly positioned
     */
    ScrollTrigger.refresh();

    return lenis;
};