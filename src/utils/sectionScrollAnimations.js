import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Додає стандартні scroll анімації до секції з навігаційними кнопками
 */
export const addSectionScrollAnimations = (sectionRef, refs) => {
  const section = sectionRef.current;
  if (!section) return null;

  const animations = [];

  // Анімація Top Logo
  if (refs.topLogoRef?.current) {
    animations.push(
      gsap.fromTo(
        refs.topLogoRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    );
  }

  // Анімація Top Button
  if (refs.topButtonRef?.current) {
    animations.push(
      gsap.fromTo(
        refs.topButtonRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    );
  }

  // Анімація Left Button
  if (refs.leftButtonRef?.current) {
    animations.push(
      gsap.fromTo(
        refs.leftButtonRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    );
  }

  // Анімація Right Button
  if (refs.rightButtonRef?.current) {
    animations.push(
      gsap.fromTo(
        refs.rightButtonRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    );
  }

  // Анімація Watch Buttons з послідовною затримкою
  if (refs.watchButtonsRef?.current) {
    const buttons = refs.watchButtonsRef.current.querySelectorAll('[class*="watchButtonWrapper"], .watchButtonWrapper');
    buttons.forEach((button, index) => {
      animations.push(
        gsap.fromTo(
          button,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.15,
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        )
      );
    });
  }

  // Анімація Bottom Center
  if (refs.bottomCenterRef?.current) {
    animations.push(
      gsap.fromTo(
        refs.bottomCenterRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )
    );
  }

  // Анімація Wisdom Container (для InspirationGarden)
  if (refs.wisdomContainerRef?.current) {
    animations.push(
      gsap.fromTo(
        refs.wisdomContainerRef.current,
        { opacity: 0, x: -50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    );
  }

  return () => {
    animations.forEach((anim) => {
      if (anim && anim.kill) {
        anim.kill();
      }
    });
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars?.trigger === section) {
        trigger.kill();
      }
    });
  };
};
