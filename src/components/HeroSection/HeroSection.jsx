import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroSection.module.css";
import ParticleBackground from "./ParticleBackground";
import { createParallaxEffect, createScaleParallax } from "../../utils/parallaxEffects";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const sectionRef = useRef(null);
  const logosRef = useRef(null);
  const heroLogoRef = useRef(null);
  const taglineRef = useRef(null);
  const enterButtonRef = useRef(null);
  const accessibleButtonRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Анімація логотипів
    if (logosRef.current) {
      gsap.fromTo(
        logosRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Анімація головного логотипу
    if (heroLogoRef.current) {
      gsap.fromTo(
        heroLogoRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Анімація теглайну
    if (taglineRef.current) {
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Анімація кнопки Enter
    if (enterButtonRef.current) {
      gsap.fromTo(
        enterButtonRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Анімація кнопки Accessible
    if (accessibleButtonRef.current) {
      gsap.fromTo(
        accessibleButtonRef.current,
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
      );
    }

    // Анімація футера
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Паралакс ефекти через RAF
    const parallaxCleanups = [];

    // Паралакс для головного логотипу (повільніший)
    if (heroLogoRef.current) {
      parallaxCleanups.push(
        createParallaxEffect(heroLogoRef.current, {
          speed: -0.3,
          direction: "y",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        })
      );
    }

    // Паралакс для теглайну (середня швидкість)
    if (taglineRef.current) {
      parallaxCleanups.push(
        createParallaxEffect(taglineRef.current, {
          speed: -0.2,
          direction: "y",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        })
      );
    }

    // Паралакс для кнопки Enter (швидший)
    if (enterButtonRef.current) {
      parallaxCleanups.push(
        createParallaxEffect(enterButtonRef.current, {
          speed: -0.15,
          direction: "y",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        })
      );
    }

    // Паралакс для логотипів (дуже повільний)
    if (logosRef.current) {
      parallaxCleanups.push(
        createParallaxEffect(logosRef.current, {
          speed: -0.1,
          direction: "y",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        })
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === section) {
          trigger.kill();
        }
      });
      // Очищаємо паралакс ефекти
      parallaxCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  const handleEnterClick = () => {
    const welcomeSection = document.getElementById("welcome");
    if (welcomeSection) {
      welcomeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className={styles.heroSection} id="hero">
      {/* Particle Background - заміна 3D анімації */}
      <ParticleBackground sectionRef={sectionRef} />

      {/* Top right button */}
      <button ref={accessibleButtonRef} className={styles.accessibleButton}>
        <div className={styles.accessibleLineTop}></div>
        <div className={styles.accessibleLineBottom}></div>
        <svg
          className={styles.accessibleBorder}
          width="240"
          height="59"
          viewBox="0 0 240 59"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.2"
            d="M3.1,47.6l8.9,9.2c0.8,0.8,1.8,1.2,2.9,1.2h204c1.1,0,2.1-0.4,2.9-1.2l15.8-16.2c0.7-0.7,1.1-1.8,1.1-2.8V16.2 c0-1-0.4-2-1.1-2.8L226.9,2.2C226.2,1.4,225.1,1,224,1H21.7c-1,0-2,0.4-2.7,1L3.3,16.4c-0.8,0.8-1.3,1.8-1.3,3v25.4 C2,45.8,2.4,46.8,3.1,47.6z"
            stroke="rgba(153, 255, 136, 0.6)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <svg
          className={styles.accessibleLayerPath}
          width="240"
          height="60"
          viewBox="0 0 240 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="button__layer__path"
            d="M231,53.5H16.3c-0.5,0-1-0.2-1.4-0.6l-8.3-8.3C6.2,44.2,6,43.7,6,43.2V13.5V10c0-2.2,1.8-4,4-4h214.7 c0.5,0,1,0.2,1.4,0.6l8.3,8.3c0.4,0.4,0.6,0.9,0.6,1.4V46v3.5C235,51.7,233.2,53.5,231,53.5"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="12 7 38 13 210 25 300 300"
            strokeDashoffset="0"
          />
        </svg>
        <span className={styles.accessibleText}>Accessible version</span>
        <svg
          className={styles.accessibleArrow}
          width="18"
          height="13"
          viewBox="0 0 18 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 2.26904C6.32172 3.2154 10.0474 6.27714 9.99954 6.55548C9.82715 7.5575 6.03439 10.2296 5 10.7306"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.5008 1.5C13.087 2.62923 17.0002 6.27996 17.0002 6.51812C17.0002 7.15217 12.2416 10.9022 11.0002 11.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 6.88464L1 6.88464"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Main content center */}
      <div className={styles.heroContent}>
        {/* Logos */}
        <div ref={logosRef} className={styles.logosContainer}>
          <div className={styles.logoWrapper}>
            <img
              src="/sprite-logo.svg"
              alt="Sprite Zero Sugar"
              className={styles.logo}
            />
          </div>
          <span className={styles.logoX}>×</span>
          <div className={styles.logoWrapper}>
            <img
              src="/marvel-theater.webp"
              alt="Marvels' Black Panther Wakanda Forever only in theater"
              className={styles.logo}
            />
          </div>
        </div>

        {/* Main title - Logo */}
        <div className={styles.heroLogoContainer}>
          <img
            ref={heroLogoRef}
            src="/hall-logo.svg"
            alt="The Hall of Zero Limits"
            className={styles.heroLogo}
          />
        </div>

        {/* Tagline */}
        <p ref={taglineRef} className={styles.tagline}>
          EXPLORE NEW PATHS.
          <br />
          FIND YOUR GIFT.
        </p>

        {/* Enter button */}
        <button
          ref={enterButtonRef}
          className={styles.enterButton}
          onClick={handleEnterClick}
        >
          <div className={styles.enterLineTop}></div>
          <div className={styles.enterLineBottom}></div>
          <svg
            className={styles.enterBorder}
            width="240"
            height="59"
            viewBox="0 0 240 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              d="M3.1,47.6l8.9,9.2c0.8,0.8,1.8,1.2,2.9,1.2h204c1.1,0,2.1-0.4,2.9-1.2l15.8-16.2c0.7-0.7,1.1-1.8,1.1-2.8V16.2 c0-1-0.4-2-1.1-2.8L226.9,2.2C226.2,1.4,225.1,1,224,1H21.7c-1,0-2,0.4-2.7,1L3.3,16.4c-0.8,0.8-1.3,1.8-1.3,3v25.4 C2,45.8,2.4,46.8,3.1,47.6z"
              stroke="rgba(153, 255, 136, 0.6)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <svg
            className={styles.enterLayerPath}
            width="240"
            height="60"
            viewBox="0 0 240 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="button__layer__path"
              d="M231,53.5H16.3c-0.5,0-1-0.2-1.4-0.6l-8.3-8.3C6.2,44.2,6,43.7,6,43.2V13.5V10c0-2.2,1.8-4,4-4h214.7 c0.5,0,1,0.2,1.4,0.6l8.3,8.3c0.4,0.4,0.6,0.9,0.6,1.4V46v3.5C235,51.7,233.2,53.5,231,53.5"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="12 7 38 13 210 25 300 300"
              strokeDashoffset="0"
            />
          </svg>
          <span className={styles.enterText}>ENTER</span>
          <svg
            className={styles.enterArrow}
            width="18"
            height="13"
            viewBox="0 0 18 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 2.26904C6.32172 3.2154 10.0474 6.27714 9.99954 6.55548C9.82715 7.5575 6.03439 10.2296 5 10.7306"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.5008 1.5C13.087 2.62923 17.0002 6.27996 17.0002 6.51812C17.0002 7.15217 12.2416 10.9022 11.0002 11.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 6.88464L1 6.88464"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Bottom right footer */}
      <div ref={footerRef} className={styles.bottomFooter}>
        <div className={styles.footerFrame}>
          <div className={styles.footerLogos}>
            <img
              src="/sprite-logo.svg"
              alt="Sprite"
              className={styles.footerLogo}
            />
            <div className={styles.footerDivider}></div>
            <img
              src="/marvel-theater.webp"
              alt="Wakanda Forever"
              className={styles.footerLogo}
            />
          </div>
          <div className={styles.footerDivider}></div>
          <p className={styles.footerText}>Sprite Zero Sugar® | © MARVEL</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
