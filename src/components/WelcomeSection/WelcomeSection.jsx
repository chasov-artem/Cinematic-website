import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WelcomeSection.module.css";
import SphereIcon from "./SphereIcon";
import NavButtonLeft from "./NavButtonLeft";
import NavButtonRight from "./NavButtonRight";

gsap.registerPlugin(ScrollTrigger);

function WelcomeSection() {
  const sectionRef = useRef(null);
  const wisdomContainerRef = useRef(null);
  const wisdomLabelRef = useRef(null);
  const welcomeCenterRef = useRef(null);
  const tutorialPanelRef = useRef(null);
  const rightTopButtonRef = useRef(null);
  const rightCenterButtonRef = useRef(null);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [journeyStarted, setJourneyStarted] = useState(false);

  const wisdomTexts = [
    "You have entered the Hall of Zero Limits. Great things lie ahead for all who open themselves to finding their gift.",
    "This is an ever-changing space for creativity\nand growth. Here, you will find new insights and\ntools to help inspire you. After all, inspiration is\nthe water every gift needs to grow.",
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Анімація Wisdom Container
    if (wisdomContainerRef.current) {
      gsap.fromTo(
        wisdomContainerRef.current,
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
      );
    }

    // Анімація Wisdom Label
    if (wisdomLabelRef.current) {
      gsap.fromTo(
        wisdomLabelRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Анімація Welcome Center (коли показується)
    if (welcomeCenterRef.current) {
      gsap.fromTo(
        welcomeCenterRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Анімація Tutorial Panel
    if (tutorialPanelRef.current) {
      gsap.fromTo(
        tutorialPanelRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
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

    // Анімація правої кнопки меню
    if (rightTopButtonRef.current) {
      gsap.fromTo(
        rightTopButtonRef.current,
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

    // Анімація правої центральної кнопки
    if (rightCenterButtonRef.current) {
      gsap.fromTo(
        rightCenterButtonRef.current,
        { opacity: 0, x: 30 },
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
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [journeyStarted, currentTextIndex]);

  const handleNext = () => {
    setCurrentTextIndex((prev) => {
      // Дозволяємо перейти за межі масиву для показу центральних елементів
      return prev + 1;
    });
  };

  const handlePrev = () => {
    if (currentTextIndex > 0) {
      setCurrentTextIndex((prev) => prev - 1);
    }
  };

  const handleBeginJourney = () => {
    setJourneyStarted(true);
    setCurrentTextIndex(0); // Сховати Tutorial Panel
  };

  const handleNextSection = () => {
    const originStoriesSection = document.getElementById("origin-stories");
    if (originStoriesSection) {
      originStoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isFirstSlide = currentTextIndex === 0;
  const showCenterElements = currentTextIndex >= 2 && !journeyStarted;
  const showWisdomContainer = currentTextIndex < 2 && !journeyStarted;

  return (
    <section ref={sectionRef} className={styles.welcomeSection} id="welcome">
      {/* Top left logo */}
      <div className={styles.topLogo}>
        <img
          src="/hall-logo.svg"
          alt="The Hall of Zero Limits"
          className={styles.logoImage}
        />
      </div>

      {/* Main content container - Wisdom Guide */}
      {showWisdomContainer && (
        <div ref={wisdomContainerRef} className={styles.wisdomContainerWrapper}>
          <div className={styles.wisdomContainer}>
            <img
              src="/wisdom-guide-frame.svg"
              alt=""
              className={styles.wisdomContainerFrame}
            />
            <div className={styles.sphereIcon}>
              <SphereIcon />
            </div>
            <div className={styles.wisdomContent}>
              <div className={styles.wisdomText}>
                <p style={{ whiteSpace: "pre-line" }}>
                  {wisdomTexts[currentTextIndex]}
                </p>
              </div>

              <div className={styles.navigationButtons}>
                <button
                  className={`${styles.navButton} ${styles.navButtonLeft} ${
                    isFirstSlide ? styles.navButtonDisabled : ""
                  }`}
                  onClick={handlePrev}
                  disabled={isFirstSlide}
                  aria-label="Previous"
                >
                  <NavButtonLeft isDisabled={isFirstSlide} />
                </button>
                <button
                  className={`${styles.navButton} ${styles.navButtonRight}`}
                  onClick={handleNext}
                  aria-label="Next"
                >
                  <NavButtonRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Left side - GUIDE WISDOM label */}
      {showWisdomContainer && (
        <div ref={wisdomLabelRef} className={styles.wisdomLabelContainer}>
          <div className={styles.wisdomLine}></div>
          <div className={styles.wisdomLabel}>
            <span className={styles.wisdomLabelWord}>WISDOM</span>
            <span className={styles.wisdomLabelWord}>GUIDE</span>
          </div>
        </div>
      )}

      {/* Bottom left footer */}
      <div className={styles.bottomFooter}>
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

      {/* Tutorial Panel - показується коли showCenterElements */}
      {showCenterElements && (
        <div ref={tutorialPanelRef} className={styles.tutorialPanel}>
          <div className={styles.tutorialHeader}>TUTORIAL</div>
          <div className={styles.tutorialPanelLines}>
            <img
              src="/panel-lines.webp"
              alt="Panel lines"
              className={styles.panelLinesImage}
            />
            <div className={styles.tutorialIcons}>
              <div className={styles.tutorialIconWrapper}>
                <div className={styles.tutorialIconHexagon}>
                  <svg
                    className={styles.hexagonFrame}
                    width="80"
                    height="80"
                    viewBox="-20 -20 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Найзовнішній прозорий шестигранник */}
                    <path
                      d="M4 -20 L76 -20 L100 40 L76 100 L4 100 L-20 40 Z"
                      stroke="rgba(153, 255, 136, 0.08)"
                      strokeWidth="1.5"
                      fill="none"
                      filter="url(#hexagonOuterShadow)"
                    />
                    {/* Зовнішня рамка */}
                    <path
                      d="M24 0 L56 0 L80 40 L56 80 L24 80 L0 40 Z"
                      stroke="rgba(153, 255, 136, 0.3)"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* Внутрішня рамка з світінням */}
                    <path
                      d="M24 0 L56 0 L80 40 L56 80 L24 80 L0 40 Z"
                      stroke="rgba(153, 255, 136, 0.8)"
                      strokeWidth="2"
                      fill="none"
                      filter="url(#hexagonGlow)"
                    />
                    <defs>
                      <filter id="hexagonOuterShadow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <filter id="hexagonGlow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>
                  <img
                    src="/mouse-icon.svg"
                    alt="Mouse icon"
                    className={`${styles.tutorialIcon} ${styles.tutorialIconMouse}`}
                  />
                </div>
                <p className={styles.tutorialIconText}>
                  Scroll up and down to explore the Hall
                </p>
              </div>
              <div className={styles.tutorialIconWrapper}>
                <div className={styles.tutorialIconHexagon}>
                  <svg
                    className={styles.hexagonFrame}
                    width="80"
                    height="80"
                    viewBox="-20 -20 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Найзовнішній прозорий шестигранник */}
                    <path
                      d="M4 -20 L76 -20 L100 40 L76 100 L4 100 L-20 40 Z"
                      stroke="rgba(153, 255, 136, 0.08)"
                      strokeWidth="1.5"
                      fill="none"
                      filter="url(#hexagonOuterShadowEye)"
                    />
                    {/* Зовнішня рамка */}
                    <path
                      d="M24 0 L56 0 L80 40 L56 80 L24 80 L0 40 Z"
                      stroke="rgba(153, 255, 136, 0.3)"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* Внутрішня рамка з світінням */}
                    <path
                      d="M24 0 L56 0 L80 40 L56 80 L24 80 L0 40 Z"
                      stroke="rgba(153, 255, 136, 0.8)"
                      strokeWidth="2"
                      fill="none"
                      filter="url(#hexagonGlowEye)"
                    />
                    <defs>
                      <filter id="hexagonOuterShadowEye">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <filter id="hexagonGlowEye">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>
                  <svg
                    className={`${styles.tutorialIcon} ${styles.tutorialIconEye}`}
                    width="35"
                    height="32"
                    viewBox="0 0 35 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.78567 15.5386L7.55478 15.0951L6.8964 15.4378L7.46143 15.9192L7.78567 15.5386ZM17.5296 10.4658L17.7945 10.0418L17.5522 9.89037L17.2987 10.0223L17.5296 10.4658ZM25.6495 15.5386L26.0248 15.869L26.4141 15.4267L25.9144 15.1145L25.6495 15.5386ZM8.01656 15.9821L17.7605 10.9093L17.2987 10.0223L7.55478 15.0951L8.01656 15.9821ZM17.2647 10.8899L25.3846 15.9626L25.9144 15.1145L17.7945 10.0418L17.2647 10.8899ZM25.6495 15.5386C25.2742 15.2082 25.2743 15.2081 25.2743 15.2081C25.2743 15.2081 25.2742 15.2081 25.2742 15.2082C25.2741 15.2083 25.274 15.2084 25.2738 15.2087C25.2733 15.2092 25.2726 15.21 25.2715 15.2112C25.2695 15.2135 25.2663 15.2172 25.2619 15.2221C25.2532 15.2319 25.2399 15.2467 25.2223 15.2662C25.1871 15.3054 25.1346 15.3633 25.0663 15.4374C24.9296 15.5856 24.73 15.7981 24.4801 16.0536C23.9797 16.5651 23.2805 17.2458 22.4833 17.9249C21.6842 18.6056 20.7974 19.2756 19.9216 19.773C19.0358 20.2761 18.2131 20.5725 17.5296 20.5725V21.5725C18.4701 21.5725 19.4743 21.1771 20.4155 20.6426C21.3667 20.1024 22.3068 19.3889 23.1318 18.6861C23.9586 17.9818 24.6803 17.2789 25.1949 16.7529C25.4525 16.4895 25.6589 16.2698 25.8014 16.1153C25.8726 16.0381 25.9279 15.9771 25.9657 15.9352C25.9845 15.9142 25.999 15.898 26.009 15.8868C26.0139 15.8812 26.0177 15.8769 26.0204 15.874C26.0217 15.8725 26.0227 15.8713 26.0235 15.8705C26.0238 15.87 26.0241 15.8697 26.0244 15.8695C26.0245 15.8693 26.0246 15.8692 26.0246 15.8691C26.0247 15.869 26.0248 15.869 25.6495 15.5386ZM17.5296 20.5725C16.8358 20.5725 15.906 20.2695 14.8557 19.7582C13.8202 19.2541 12.7259 18.577 11.7212 17.8923C10.7183 17.2088 9.81428 16.5243 9.16048 16.0102C8.83384 15.7533 8.57027 15.5395 8.38876 15.3902C8.29802 15.3156 8.22782 15.2571 8.18055 15.2175C8.15691 15.1977 8.13901 15.1826 8.12714 15.1725C8.1212 15.1675 8.11677 15.1638 8.11389 15.1613C8.11245 15.1601 8.1114 15.1592 8.11073 15.1586C8.1104 15.1584 8.11016 15.1582 8.11003 15.1581C8.10996 15.158 8.10993 15.158 8.1099 15.1579C8.10989 15.1579 8.10992 15.158 7.78567 15.5386C7.46143 15.9192 7.4615 15.9192 7.46159 15.9193C7.46166 15.9194 7.46178 15.9195 7.46191 15.9196C7.46217 15.9198 7.46253 15.9201 7.46298 15.9205C7.46389 15.9213 7.4652 15.9224 7.46689 15.9238C7.47028 15.9267 7.47522 15.9309 7.48167 15.9363C7.49458 15.9472 7.51355 15.9632 7.53828 15.984C7.58775 16.0254 7.66029 16.0858 7.75351 16.1625C7.93994 16.3158 8.20924 16.5343 8.54234 16.7963C9.20803 17.3198 10.131 18.0187 11.1581 18.7187C12.1834 19.4175 13.322 20.1238 14.418 20.6574C15.4992 21.1837 16.5994 21.5725 17.5296 21.5725V20.5725Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M13.1919 15.6844L12.9558 15.2436L12.4213 15.53L12.8043 16.0002L13.1919 15.6844ZM17.2171 13.5276L17.4875 13.107L17.2401 12.948L16.9809 13.0869L17.2171 13.5276ZM20.5713 15.6844L21.0132 15.9183L21.2282 15.5123L20.8417 15.2638L20.5713 15.6844ZM13.4281 16.1251L17.4532 13.9683L16.9809 13.0869L12.9558 15.2436L13.4281 16.1251ZM16.9466 13.9482L20.3009 16.1049L20.8417 15.2638L17.4875 13.107L16.9466 13.9482ZM20.5713 15.6844C20.1294 15.4504 20.1295 15.4502 20.1296 15.4501C20.1296 15.4501 20.1297 15.45 20.1297 15.4499C20.1298 15.4498 20.1298 15.4497 20.1299 15.4496C20.1299 15.4495 20.1299 15.4495 20.1298 15.4496C20.1297 15.45 20.1292 15.4508 20.1285 15.4522C20.127 15.455 20.1243 15.4598 20.1204 15.4667C20.1128 15.4804 20.1005 15.502 20.0837 15.5303C20.0501 15.5869 19.9986 15.6702 19.93 15.7712C19.7923 15.974 19.5891 16.2435 19.3273 16.5113C18.7949 17.0559 18.0776 17.5372 17.2171 17.5372V18.5372C18.4649 18.5372 19.4247 17.8421 20.0424 17.2103C20.3556 16.8899 20.5956 16.5711 20.7574 16.3328C20.8386 16.2132 20.9009 16.1127 20.9436 16.0407C20.965 16.0046 20.9816 15.9756 20.9932 15.9549C20.999 15.9445 21.0036 15.9362 21.0069 15.93C21.0086 15.927 21.0099 15.9244 21.011 15.9225C21.0115 15.9215 21.012 15.9207 21.0123 15.92C21.0125 15.9196 21.0127 15.9193 21.0128 15.9191C21.0129 15.9189 21.013 15.9187 21.013 15.9187C21.0131 15.9185 21.0132 15.9183 20.5713 15.6844ZM17.2171 17.5372C16.3353 17.5372 15.4411 17.0365 14.7243 16.4688C14.3746 16.1919 14.0857 15.9139 13.8843 15.705C13.7839 15.6008 13.7061 15.5147 13.654 15.4554C13.628 15.4258 13.6085 15.4031 13.596 15.3882C13.5897 15.3808 13.5852 15.3753 13.5824 15.372C13.581 15.3703 13.5801 15.3692 13.5796 15.3686C13.5794 15.3683 13.5793 15.3682 13.5793 15.3682C13.5793 15.3682 13.5793 15.3682 13.5793 15.3683C13.5794 15.3683 13.5794 15.3684 13.5794 15.3684C13.5795 15.3685 13.5796 15.3686 13.1919 15.6844C12.8043 16.0002 12.8044 16.0003 12.8045 16.0004C12.8045 16.0004 12.8046 16.0006 12.8047 16.0007C12.8049 16.0009 12.8051 16.0011 12.8053 16.0014C12.8058 16.002 12.8063 16.0027 12.807 16.0035C12.8084 16.0052 12.8103 16.0075 12.8126 16.0102C12.8172 16.0158 12.8237 16.0236 12.832 16.0334C12.8485 16.053 12.8723 16.0807 12.9028 16.1155C12.9638 16.1849 13.0522 16.2826 13.1644 16.399C13.3883 16.6313 13.7103 16.9415 14.1034 17.2528C14.8721 17.8615 15.9904 18.5372 17.2171 18.5372V17.5372Z"
                      fill="currentColor"
                    ></path>
                    <circle
                      cx="17.2931"
                      cy="15.9869"
                      r="0.819932"
                      stroke="currentColor"
                    ></circle>
                    <path
                      d="M5.81692 11.0674C6.80453 12.8134 7.79601 13.7644 8.68668 15.167"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M28.731 20.9072C27.7434 19.1612 26.7519 18.2102 25.8612 16.8076"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M8.85598 9.42773C9.58582 11.2962 10.4323 12.3783 11.1149 13.8932"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M25.6919 22.5469C24.9621 20.6784 24.1156 19.5963 23.433 18.0814"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M11.7232 7.78809C12.453 9.65657 13.2995 10.7387 13.9821 12.2535"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M22.8247 24.7451C22.0949 22.8766 21.2484 21.7945 20.5658 20.2797"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M14.9341 6.06348C15.5559 7.92764 16.2946 9.00037 16.8798 10.5102"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M19.6138 25.9111C18.992 24.047 18.2533 22.9742 17.6681 21.4644"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M19.6763 6C19.133 7.88854 19.1344 9.191 18.7617 10.7669"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M14.8716 25.9746C15.4149 24.0861 15.4135 22.7836 15.7862 21.2077"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M23.2544 8.04004C22.1619 9.67348 21.7666 10.9145 20.9318 12.3021"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M11.2935 23.9346C12.386 22.3011 12.7813 21.0601 13.6161 19.6725"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M25.8013 9.42773C24.7088 11.0612 24.3135 12.3022 23.4787 13.6898"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M8.74661 22.5469C9.83911 20.9134 10.2344 19.6724 11.0692 18.2848"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M28.6997 11.0518C27.3386 12.4692 26.7325 13.622 25.6681 14.8424"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M5.85598 20.9229C7.2171 19.5054 7.82319 18.3526 8.88762 17.1322"
                      stroke="currentColor"
                    ></path>
                  </svg>
                </div>
                <p className={styles.tutorialIconText}>
                  Tap on this icon to access the content
                </p>
              </div>
              <div className={styles.tutorialIconWrapper}>
                <div className={styles.tutorialIconHexagon}>
                  <svg
                    className={styles.hexagonFrame}
                    width="80"
                    height="80"
                    viewBox="-20 -20 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Найзовнішній прозорий шестигранник */}
                    <path
                      d="M4 -20 L76 -20 L100 40 L76 100 L4 100 L-20 40 Z"
                      stroke="rgba(153, 255, 136, 0.08)"
                      strokeWidth="1.5"
                      fill="none"
                      filter="url(#hexagonOuterShadowMenu)"
                    />
                    {/* Зовнішня рамка */}
                    <path
                      d="M24 0 L56 0 L80 40 L56 80 L24 80 L0 40 Z"
                      stroke="rgba(153, 255, 136, 0.3)"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* Внутрішня рамка з світінням */}
                    <path
                      d="M24 0 L56 0 L80 40 L56 80 L24 80 L0 40 Z"
                      stroke="rgba(153, 255, 136, 0.8)"
                      strokeWidth="2"
                      fill="none"
                      filter="url(#hexagonGlowMenu)"
                    />
                    <defs>
                      <filter id="hexagonOuterShadowMenu">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <filter id="hexagonGlowMenu">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>
                  <svg
                    className={`${styles.tutorialIcon} ${styles.tutorialIconMenu}`}
                    width="33"
                    height="28"
                    viewBox="0 0 33 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 6H27.3333V10H6V14H27.3333V18H6V22H27.3333"
                      stroke="currentColor"
                    ></path>
                  </svg>
                </div>
                <p className={styles.tutorialIconText}>
                  This menu will help track your progress
                </p>
              </div>
            </div>
          </div>
          {/* Begin Journey Button */}
          <button
            className={styles.beginJourneyButton}
            onClick={handleBeginJourney}
          >
            <div className={styles.beginJourneyLineTop}></div>
            <div className={styles.beginJourneyLineBottom}></div>
            <svg
              className={styles.beginJourneyBorder}
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
              className={styles.beginJourneyLayerPath}
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
            <span className={styles.beginJourneyText}>BEGIN JOURNEY</span>
            <svg
              className={styles.beginJourneyArrow}
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
      )}

      {/* Bottom center - Welcome */}
      {!showWisdomContainer && !showCenterElements && (
        <div ref={welcomeCenterRef} className={styles.welcomeCenter}>
          <div className={styles.welcomeLogo}>
            <div className={styles.welcomeLogoLine}>THE HALL OF</div>
            <div
              className={`${styles.welcomeLogoLine} ${styles.welcomeLogoLineSerif}`}
            >
              ZERO LIMITS
            </div>
          </div>
          <div className={styles.welcomeText}>
            <span className={styles.welcomeLabel}>WELCOME</span>
          </div>
          <img
            src="/cross-icon.svg"
            alt="Cross icon"
            className={styles.welcomeCrossIcon}
          />
        </div>
      )}

      {/* Right side elements - показуються після натискання кнопки */}
      {journeyStarted && (
        <>
          {/* Top right - Menu button */}
          <button ref={rightTopButtonRef} className={styles.rightTopButton}>
            <svg
              width="33"
              height="28"
              viewBox="0 0 33 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6H27.3333V10H6V14H27.3333V18H6V22H27.3333"
                stroke="currentColor"
              />
            </svg>
          </button>

          {/* Center right - Arrow button */}
          <div
            ref={rightCenterButtonRef}
            className={styles.rightCenterButtonWrapper}
          >
            <span className={styles.rightCenterNextText}>NEXT</span>
            <img
              src="/cross-icon.svg"
              alt="Cross icon"
              className={styles.rightCenterCrossIcon}
            />
            <img
              src="/octagon-frame.svg"
              alt="Octagon frame"
              className={styles.rightCenterButtonFrame}
            />
            <img
              src="/octagon-frame.svg"
              alt="Octagon frame inner"
              className={styles.rightCenterButtonFrameInner}
            />
            <button
              className={`${styles.navButton} ${styles.rightCenterButton}`}
              onClick={handleNextSection}
            >
              <NavButtonRight />
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default WelcomeSection;
