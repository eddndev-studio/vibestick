import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initBackgroundAnimations = () => {
    const isMobile = window.innerWidth < 768;

    // Skip heavy animations on mobile devices for performance
    if (isMobile) return;

    /**
     * -------------------------------------------------------
     * STARFIELD BACKGROUND (lightweight, DOM-based)
     * -------------------------------------------------------
     * Creates a fixed background layer with animated stars
     * to simulate a subtle "space" environment.
     */

    // Prevent duplicate initialization
    if (document.getElementById("stars-bg")) return;

    const starsContainer = document.createElement("div");
    starsContainer.id = "stars-bg";
    document.body.appendChild(starsContainer);

    gsap.set(starsContainer, {
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
    });

    const STAR_COUNT = 70;

    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement("div");

        gsap.set(star, {
            position: "absolute",
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            background: "white",
            borderRadius: "50%",
            opacity: Math.random(),
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
        });

        starsContainer.appendChild(star);

        // Vertical floating motion (subtle parallax feel)
        gsap.to(star, {
            y: "+=" + (Math.random() * 40 + 10),
            duration: Math.random() * 6 + 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        // Opacity flicker (twinkling effect)
        gsap.to(star, {
            opacity: Math.random(),
            duration: Math.random() * 2 + 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }

    /**
     * Subtle vertical shift on scroll to simulate depth
     */
    gsap.to(starsContainer, {
        y: -150,
        scrollTrigger: {
            trigger: "#tech-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
        },
    });

    /**
     * -------------------------------------------------------
     * INFO SECTION
     * -------------------------------------------------------
     * Fade out glow and center hexagons
     */
    const bgTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#info-section",
            start: "top 80%",
            end: "center center",
            scrub: 1,
        },
    });

    bgTl.to("#glow-1", {
        opacity: 0,
        ease: "power1.out",
        immediateRender: false,
    }, 0);

    bgTl.to([".hex-1", ".hex-3"], {
        opacity: 0,
        scale: 0.5,
        ease: "power1.out",
        immediateRender: false,
    }, 0);

    bgTl.to(".hex-2", {
        top: "50%",
        right: "50%",
        xPercent: 50,
        yPercent: -50,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        ease: "power2.inOut",
        immediateRender: false,
    }, 0);

    bgTl.to(".hex-4", {
        top: "50%",
        right: "50%",
        xPercent: 50,
        yPercent: -50,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        ease: "power2.inOut",
        immediateRender: false,
    }, 0);

    /**
     * -------------------------------------------------------
     * LAB SECTION
     * -------------------------------------------------------
     * Spread hexagons horizontally and scale them
     */
    const labBgTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#lab-section",
            start: "top bottom",
            end: "center center",
            scrub: 1,
            immediateRender: false,
        },
    });

    labBgTl.to(".hex-2-wrap", {
        x: "-13vw",
        rotation: 360,
        scale: 0.5,
        ease: "power2.inOut",
    }, 0);

    labBgTl.to(".hex-4-wrap", {
        x: "13vw",
        rotation: 360,
        scale: 2,
        ease: "power2.inOut",
    }, 0);

    /**
     * -------------------------------------------------------
     * TECH SECTION
     * -------------------------------------------------------
     * Move hexagons to the left side and create concentric motion
     */
    const techBgTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#tech-section",
            start: "top bottom",
            end: "center center",
            scrub: 1,
            immediateRender: false,
        },
    });

    techBgTl.to(".hex-2-wrap", {
        x: "calc(-50vw + 640px - 10vw)",
        rotation: 720,
        scale: 0.8,
        ease: "power2.inOut",
    }, 0);

    techBgTl.to(".hex-4-wrap", {
        x: "calc(-50vw + 640px - 10vw)",
        rotation: -720,
        scale: 0.6,
        ease: "power2.inOut",
    }, 0);

    /**
     * -------------------------------------------------------
     * MISSION SECTION
     * -------------------------------------------------------
     * Move hexagons diagonally to opposite corners
     */
    const missionBgTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#mission-section",
            start: "top bottom",
            end: "center center",
            scrub: 1,
            immediateRender: false,
        },
    });

    missionBgTl.to(".hex-2-wrap", {
        x: "35vw",
        y: "-30vh",
        rotation: 1080,
        scale: 0.6,
        ease: "power2.inOut",
    }, 0);

    missionBgTl.to(".hex-4-wrap", {
        x: "-35vw",
        y: "30vh",
        rotation: -1080,
        scale: 0.4,
        ease: "power2.inOut",
    }, 0);

    /**
     * Refresh ScrollTrigger after setup
     */
    ScrollTrigger.refresh();
};