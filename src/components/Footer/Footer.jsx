import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaTwitter } from "react-icons/fa";
import { useMenu } from "../../contexts/MenuContext";
import NavButtonRight from "../WelcomeSection/NavButtonRight";
import NavButtonLeft from "../WelcomeSection/NavButtonLeft";
import SphereIcon from "../WelcomeSection/SphereIcon";
import welcomeStyles from "../WelcomeSection/WelcomeSection.module.css";
import quizModalStyles from "../Quiz/QuizModal.module.css";
import styles from "./Footer.module.css";

function Footer() {
  const { markSectionCompleted } = useMenu();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const footerRef = useRef(null);
  const thankYouMenuRef = useRef(null);
  const thankYouTitleRef = useRef(null);
  const thankYouCrossIconRef = useRef(null);
  const thankYouPanelLinesRef = useRef(null);
  const thankYouLogosRef = useRef(null);
  const thankYouHallLogoRef = useRef(null);
  const thankYouShareTextRef = useRef(null);
  const thankYouSocialButtonsRef = useRef(null);
  const keepExploringButtonRef = useRef(null);
  const spriteLinkRef = useRef(null);
  const wisdomTextRef = useRef(null);

  const wisdomTexts = [
    "You've made great strides toward finding your gift. Your legacy is a continuous journey and it does not end here.",
    "Keep exploring or share the experience with your friends. Remember, all are welcome to find their place in the Hall of Zero Limits.",
  ];

  const handleNext = () => {
    // Переходимо до наступного тексту або до Thank You меню
    if (currentTextIndex < wisdomTexts.length) {
      setCurrentTextIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentTextIndex > 0) {
      setCurrentTextIndex((prev) => prev - 1);
    }
  };

  // Функція для анімації появи тексту по словах
  const animateTextReveal = (textElement) => {
    if (!textElement) return;

    const words = textElement.querySelectorAll('[data-word]');
    if (words.length === 0) return;

    // Очищаємо попередні анімації
    gsap.killTweensOf(words);

    // Спочатку ховаємо всі слова
    gsap.set(words, { opacity: 0, y: 20 });

    // Анімуємо поступове з'явлення кожного слова
    gsap.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08, // Затримка між словами
    });
  };

  const isFirstSlide = currentTextIndex === 0;
  const showThankYouMenu = currentTextIndex === wisdomTexts.length;
  const showWisdomGuide = isMenuOpen && !showThankYouMenu;

  // Ефект для анімації тексту при зміні індексу
  useEffect(() => {
    if (wisdomTextRef.current && showWisdomGuide && currentTextIndex < wisdomTexts.length) {
      const textElement = wisdomTextRef.current;
      // Невелика затримка, щоб DOM оновився
      const timer = setTimeout(() => {
        animateTextReveal(textElement);
      }, 150);

      return () => {
        clearTimeout(timer);
        // Очищаємо анімації при розмонтуванні
        if (textElement) {
          const words = textElement.querySelectorAll('[data-word]');
          gsap.killTweensOf(words);
        }
      };
    }
  }, [currentTextIndex, showWisdomGuide, wisdomTexts.length]);

  // Позначаємо секцію як завершену, коли показується Thank You меню
  useEffect(() => {
    if (showThankYouMenu) {
      markSectionCompleted("footer", true);
    }
  }, [showThankYouMenu, markSectionCompleted]);

  const handleKeepExploring = () => {
    const welcomeSection = document.getElementById("welcome");
    if (welcomeSection) {
      welcomeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Анімація появи Thank You меню
  useEffect(() => {
    if (!showThankYouMenu || !thankYouMenuRef.current) return;

    const timeline = gsap.timeline();

    // Анімація фону меню
    timeline.fromTo(
      thankYouMenuRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    // Анімація заголовка THANK YOU
    if (thankYouTitleRef.current) {
      timeline.fromTo(
        thankYouTitleRef.current,
        { opacity: 0, y: -30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );
    }

    // Анімація хрестика
    if (thankYouCrossIconRef.current) {
      timeline.fromTo(
        thankYouCrossIconRef.current,
        { opacity: 0, rotation: -90 },
        { opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.5"
      );
    }

    // Анімація панельних ліній
    if (thankYouPanelLinesRef.current) {
      timeline.fromTo(
        thankYouPanelLinesRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.4"
      );
    }

    // Анімація логотипів (Sprite × Marvel)
    if (thankYouLogosRef.current) {
      timeline.fromTo(
        thankYouLogosRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }

    // Анімація Hall логотипу
    if (thankYouHallLogoRef.current) {
      timeline.fromTo(
        thankYouHallLogoRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
    }

    // Анімація тексту "SHARE THE EXPERIENCE"
    if (thankYouShareTextRef.current) {
      timeline.fromTo(
        thankYouShareTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );
    }

    // Анімація соціальних кнопок з послідовною затримкою
    if (thankYouSocialButtonsRef.current) {
      const buttons = thankYouSocialButtonsRef.current.querySelectorAll(
        `.${quizModalStyles.socialButton}`
      );
      buttons.forEach((button, index) => {
        timeline.fromTo(
          button,
          { opacity: 0, scale: 0, rotation: -180 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: index * 0.1,
          },
          "-=0.3"
        );
      });
    }

    // Анімація кнопки "keep exploring"
    if (keepExploringButtonRef.current) {
      timeline.fromTo(
        keepExploringButtonRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
        "-=0.2"
      );
    }

    // Анімація посилання sprite.com
    if (spriteLinkRef.current) {
      timeline.fromTo(
        spriteLinkRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );
    }

    return () => {
      timeline.kill();
    };
  }, [showThankYouMenu]);

  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsMenuOpen(true);
          }
        });
      },
      {
        threshold: 0.1, // Меню відкриється, коли 10% футера видимо
      }
    );

    observer.observe(footerRef.current);

    // Слухаємо подію для відкриття меню ззовні
    const handleOpenMenu = () => {
      setIsMenuOpen(true);
      // Прокручуємо до футера, якщо потрібно
      if (footerRef.current) {
        footerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("openFooterMenu", handleOpenMenu);

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
      window.removeEventListener("openFooterMenu", handleOpenMenu);
    };
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef} id="footer">
      {/* Top left logo */}
      <div className={welcomeStyles.topLogo}>
        <img
          src="/hall-logo.svg"
          alt="The Hall of Zero Limits"
          className={welcomeStyles.logoImage}
        />
      </div>

      {/* Main content container - Wisdom Guide */}
      {showWisdomGuide && (
        <>
          <div className={welcomeStyles.wisdomContainerWrapper}>
            <div className={welcomeStyles.wisdomContainer}>
              <img
                src="/wisdom-guide-frame.svg"
                alt=""
                className={welcomeStyles.wisdomContainerFrame}
                loading="lazy"
              />
              <div className={welcomeStyles.sphereIcon}>
                <SphereIcon />
              </div>
              <div className={welcomeStyles.wisdomContent}>
                <div className={welcomeStyles.wisdomText} ref={wisdomTextRef}>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {wisdomTexts[currentTextIndex] && wisdomTexts[currentTextIndex].split(/(\s+|\n)/).map((segment, index) => {
                      // Обробляємо переноси рядків
                      if (segment === '\n') {
                        return <br key={index} />;
                      }
                      // Пробіли залишаємо як є
                      if (segment.trim() === '') {
                        return <span key={index} className={welcomeStyles.wisdomWord} style={{ display: 'inline' }}>{segment}</span>;
                      }
                      // Слова обгортаємо в span для анімації
                      return (
                        <span key={index} className={welcomeStyles.wisdomWord} data-word style={{ display: 'inline-block' }}>
                          {segment}
                        </span>
                      );
                    })}
                  </p>
                </div>

                <div className={welcomeStyles.navigationButtons}>
                  <button
                    className={`${welcomeStyles.navButton} ${
                      welcomeStyles.navButtonLeft
                    } ${isFirstSlide ? welcomeStyles.navButtonDisabled : ""}`}
                    onClick={handlePrev}
                    disabled={isFirstSlide}
                    aria-label="Previous"
                  >
                    <NavButtonLeft isDisabled={isFirstSlide} />
                  </button>
                  <button
                    className={`${welcomeStyles.navButton} ${welcomeStyles.navButtonRight}`}
                    onClick={handleNext}
                    aria-label="Next"
                  >
                    <NavButtonRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Left side - GUIDE WISDOM label */}
          <div className={welcomeStyles.wisdomLabelContainer}>
            <div className={welcomeStyles.wisdomLine}></div>
            <div className={welcomeStyles.wisdomLabel}>
              <span className={welcomeStyles.wisdomLabelWord}>WISDOM</span>
              <span className={welcomeStyles.wisdomLabelWord}>GUIDE</span>
            </div>
          </div>

        </>
      )}

      {/* Thank You Menu */}
      {showThankYouMenu && (
        <div ref={thankYouMenuRef} className={styles.thankYouMenu}>
          {/* THANK YOU Title */}
          <div ref={thankYouTitleRef} className={styles.thankYouTitle}>THANK YOU</div>

          {/* Cross Icon */}
          <img
            ref={thankYouCrossIconRef}
            src="/cross-icon.svg"
            alt="Cross icon"
            className={styles.thankYouCrossIcon}
            loading="lazy"
          />

          {/* Panel Lines */}
          <div ref={thankYouPanelLinesRef} className={styles.thankYouPanelLines}>
            <img
              src="/panel-lines.webp"
              alt="Panel lines"
              className={styles.thankYouPanelLinesImage}
              loading="lazy"
            />
            {/* Logos in center */}
            <div ref={thankYouLogosRef} className={styles.thankYouLogos}>
              <img
                src="/sprite-logo.svg"
                alt="Sprite Zero Sugar"
                className={styles.thankYouLogo}
              />
              <span className={styles.thankYouX}>×</span>
              <img
                src="/marvel-theater.webp"
                alt="Marvel Studios Black Panther Wakanda Forever"
                className={styles.thankYouLogo}
              />
            </div>

            {/* Hall Logo below */}
            <div ref={thankYouHallLogoRef} className={styles.thankYouHallLogo}>
              <img
                src="/hall-logo.svg"
                alt="The Hall of Zero Limits"
                className={styles.thankYouHallLogoImage}
              />
            </div>

            {/* Share Text */}
            <div ref={thankYouShareTextRef} className={styles.thankYouShareText}>SHARE THE EXPERIENCE</div>

            {/* Social Buttons */}
            <div
              ref={thankYouSocialButtonsRef}
              className={`${quizModalStyles.socialButtons} ${styles.thankYouSocialButtons}`}
            >
              <button className={quizModalStyles.socialButton}>
                <img
                  src="/octagon-frame.svg"
                  alt="Octagon frame"
                  className={quizModalStyles.socialButtonFrame}
                />
                <img
                  src="/octagon-frame.svg"
                  alt="Octagon frame inner"
                  className={quizModalStyles.socialButtonFrameInner}
                />
                <span className={quizModalStyles.socialButtonText}>f</span>
              </button>
              <button className={quizModalStyles.socialButton}>
                <img
                  src="/octagon-frame.svg"
                  alt="Octagon frame"
                  className={quizModalStyles.socialButtonFrame}
                />
                <img
                  src="/octagon-frame.svg"
                  alt="Octagon frame inner"
                  className={quizModalStyles.socialButtonFrameInner}
                />
                <FaTwitter className={quizModalStyles.socialButtonIcon} />
              </button>
              <button className={quizModalStyles.socialButton}>
                <img
                  src="/octagon-frame.svg"
                  alt="Octagon frame"
                  className={quizModalStyles.socialButtonFrame}
                />
                <img
                  src="/octagon-frame.svg"
                  alt="Octagon frame inner"
                  className={quizModalStyles.socialButtonFrameInner}
                />
                <img
                  src="/link-icon.svg"
                  alt="Link icon"
                  className={quizModalStyles.socialButtonIcon}
                />
              </button>
            </div>
          </div>

          {/* Keep Exploring Button */}
          <button
            ref={keepExploringButtonRef}
            className={styles.keepExploringButton}
            onClick={handleKeepExploring}
          >
            <div className={styles.keepExploringLineTop}></div>
            <div className={styles.keepExploringLineBottom}></div>
            <svg
              className={styles.keepExploringBorder}
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
              className={styles.keepExploringLayerPath}
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
            <span className={styles.keepExploringText}>keep exploring</span>
            <svg
              className={styles.keepExploringArrow}
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

          {/* Sprite.com Link */}
          <a
            ref={spriteLinkRef}
            href="https://www.coca-cola.com/us/en/brands/sprite?redirect=true"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.spriteLink}
          >
            <span className={styles.spriteLinkText}>
              <span className={styles.spriteLinkWord}>or visit</span>
              <span className={styles.spriteLinkWord}>sprite.com</span>
              <span className={styles.spriteLinkLineLeft}></span>
              <span className={styles.spriteLinkLineRight}></span>
            </span>
          </a>
        </div>
      )}

      {/* Bottom right footer */}
      <div className={welcomeStyles.bottomFooter}>
        <div className={welcomeStyles.footerFrame}>
          <div className={welcomeStyles.footerLogos}>
            <img
              src="/sprite-logo.svg"
              alt="Sprite"
              className={welcomeStyles.footerLogo}
            />
            <div className={welcomeStyles.footerDivider}></div>
            <img
              src="/marvel-theater.webp"
              alt="Wakanda Forever"
              className={welcomeStyles.footerLogo}
            />
          </div>
          <div className={welcomeStyles.footerDivider}></div>
          <p className={welcomeStyles.footerText}>
            Sprite Zero Sugar® | © MARVEL
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
