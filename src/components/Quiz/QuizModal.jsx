import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { IoIosClose } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import NavButtonLeft from "../WelcomeSection/NavButtonLeft";
import welcomeStyles from "../WelcomeSection/WelcomeSection.module.css";
import heroStyles from "../HeroSection/HeroSection.module.css";
import menuStyles from "../MenuModal/MenuModal.module.css";
import styles from "./QuizModal.module.css";

// Заглушка питань - потім можна винести в окремий файл
const questions = [
  {
    id: 1,
    title: "SELECT A MOVIE GENRE",
    options: [
      { id: "doc", text: "DOCUMENTARY", subtitle: "DOCUMENTARY" },
      { id: "comedy", text: "COMEDY", subtitle: "COMEDY" },
    ],
  },
  {
    id: 2,
    title: "YOUR STRENGTH IN GROUP PROJECTS IS:",
    options: [
      {
        id: "research",
        text: "RESEARCH & PLANNING",
        subtitle: "RESEARCH & PLANNING",
      },
      {
        id: "design",
        text: "DESIGNING THE PRESENTATION",
        subtitle: "DESIGNING THE PRESENTATION",
      },
    ],
  },
  {
    id: 3,
    title: "YOU'D RATHER DISCUSS:",
    options: [
      { id: "astrology", text: "ASTROLOGY", subtitle: "ASTROLOGY" },
      { id: "astronomy", text: "ASTRONOMY", subtitle: "ASTRONOMY" },
    ],
  },
  {
    id: 4,
    title: "YOU'D PREFER TO:",
    options: [
      {
        id: "take-apart",
        text: "TAKE SOMETHING APART",
        subtitle: "TAKE SOMETHING APART",
      },
      {
        id: "create-version",
        text: "CREATE A BETTER VERSION",
        subtitle: "CREATE A BETTER VERSION",
      },
    ],
  },
];

const QuizModal = ({ isOpen, onClose }) => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const resultsContentRef = useRef(null);
  const optionsContainerRef = useRef(null);
  const questionHeaderRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Блокуємо скрол на body
      document.body.style.overflow = "hidden";
      // Також блокуємо скрол на html для надійності
      document.documentElement.style.overflow = "hidden";
      
      // Блокуємо скрол події на document з високим пріоритетом (capture phase)
      // Це перехоплює події до того, як їх обробить Lenis
      const handleDocumentWheel = (e) => {
        // Перевіряємо, чи подія відбулася всередині resultsContent
        const resultsContent = resultsContentRef.current;
        if (!resultsContent) {
          // Якщо resultsContent не існує, блокуємо всі події
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
        
        // Перевіряємо, чи подія всередині resultsContent
        let element = e.target;
        let isInsideResults = false;
        
        while (element && element !== document.body) {
          if (element === resultsContent) {
            isInsideResults = true;
            break;
          }
          element = element.parentElement;
        }
        
        // Блокуємо скрол, якщо не всередині resultsContent
        if (!isInsideResults) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
      };
      
      const handleDocumentTouchMove = (e) => {
        // Перевіряємо, чи подія відбулася всередині resultsContent
        const resultsContent = resultsContentRef.current;
        if (!resultsContent) {
          // Якщо resultsContent не існує, блокуємо всі події
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
        
        // Перевіряємо, чи подія всередині resultsContent
        let element = e.target;
        let isInsideResults = false;
        
        while (element && element !== document.body) {
          if (element === resultsContent) {
            isInsideResults = true;
            break;
          }
          element = element.parentElement;
        }
        
        // Блокуємо скрол, якщо не всередині resultsContent
        if (!isInsideResults) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
      };
      
      // Додаємо обробники на document з capture: true для перехоплення до Lenis
      document.addEventListener('wheel', handleDocumentWheel, { passive: false, capture: true });
      document.addEventListener('touchmove', handleDocumentTouchMove, { passive: false, capture: true });
      // Також на window для надійності
      window.addEventListener('wheel', handleDocumentWheel, { passive: false, capture: true });
      window.addEventListener('touchmove', handleDocumentTouchMove, { passive: false, capture: true });
      
      return () => {
        document.removeEventListener('wheel', handleDocumentWheel, { capture: true });
        document.removeEventListener('touchmove', handleDocumentTouchMove, { capture: true });
        window.removeEventListener('wheel', handleDocumentWheel, { capture: true });
        window.removeEventListener('touchmove', handleDocumentTouchMove, { capture: true });
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      setIsQuizStarted(false);
      setCurrentQuestion(1);
      setAnswers([]);
      setShowResults(false);
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Знаходимо поточне питання
  const currentQ = questions.find((q) => q.id === currentQuestion);

  // Анімація появи карток при зміні питання
  useEffect(() => {
    if (!isQuizStarted || showResults || !currentQ) return;

    // Анімація заголовка питання - поява зверху з fade
    if (questionHeaderRef.current) {
      gsap.fromTo(
        questionHeaderRef.current,
        { opacity: 0, y: -50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }
      );
    }

    // Анімація карток - поява з боків з обертанням
    if (optionsContainerRef.current) {
      const optionButtons = optionsContainerRef.current.querySelectorAll(
        `.${styles.optionButton}`
      );

      // Встановлюємо початкові позиції для кожної картки
      optionButtons.forEach((button, index) => {
        // Перша картка зліва, друга справа
        const isLeft = index === 0;
        gsap.set(button, {
          opacity: 0,
          x: isLeft ? -200 : 200,
          y: 50,
          rotation: isLeft ? -15 : 15,
          scale: 0.8,
        });
      });

      // Анімуємо появу карток одночасно з різних боків
      gsap.to(optionButtons, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1, // Невелика затримка між картками
        delay: 0.3, // Затримка після заголовка
      });
    }

    return () => {
      // Очищаємо анімації при розмонтуванні
      if (optionsContainerRef.current) {
        const optionButtons = optionsContainerRef.current.querySelectorAll(
          `.${styles.optionButton}`
        );
        gsap.killTweensOf(optionButtons);
      }
      if (questionHeaderRef.current) {
        gsap.killTweensOf(questionHeaderRef.current);
      }
    };
  }, [currentQuestion, isQuizStarted, showResults, currentQ]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Дозволяємо скрол всередині resultsContent
  const handleResultsContentWheel = (e) => {
    // Дозволяємо скрол всередині resultsContent
    e.stopPropagation();
  };
  
  const handleResultsContentTouchMove = (e) => {
    // Дозволяємо скрол всередині resultsContent
    e.stopPropagation();
  };

  const handleOptionClick = (optionId, event) => {
    if (!currentQ) return;

    // Анімація вибору картки - пульсація та підсвітка
    const clickedButton = event.currentTarget;
    if (clickedButton) {
      // Створюємо timeline для послідовних анімацій
      const tl = gsap.timeline();
      
      // Пульсація при натисканні
      tl.to(clickedButton, {
        scale: 1.05,
        duration: 0.15,
        ease: "power2.out",
      })
      .to(clickedButton, {
        scale: 1,
        duration: 0.15,
        ease: "power2.in",
      });

      // Підсвітка обраної картки
      gsap.to(clickedButton, {
        filter: "brightness(1.3) drop-shadow(0 0 12px rgba(153, 255, 136, 1))",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    // Зберігаємо відповідь
    const newAnswer = {
      questionId: currentQuestion,
      optionId: optionId,
    };
    setAnswers([...answers, newAnswer]);

    // Анімація зникнення - картки роз'їжджаються в сторони
    if (optionsContainerRef.current) {
      const optionButtons = optionsContainerRef.current.querySelectorAll(
        `.${styles.optionButton}`
      );
      
      optionButtons.forEach((button, index) => {
        const isLeft = index === 0;
        const isClicked = button === clickedButton;
        
        if (isClicked) {
          // Обрана картка збільшується і зникає
          gsap.to(button, {
            scale: 1.1,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          });
        } else {
          // Інша картка від'їжджає вбік
          gsap.to(button, {
            x: isLeft ? -300 : 300,
            opacity: 0,
            rotation: isLeft ? -20 : 20,
            scale: 0.8,
            duration: 0.4,
            ease: "power2.in",
          });
        }
      });

      // Анімація зникнення заголовка
      if (questionHeaderRef.current) {
        gsap.to(questionHeaderRef.current, {
          opacity: 0,
          y: -30,
          scale: 0.9,
          duration: 0.4,
          ease: "power2.in",
        });
      }
    }

    // Переходимо до наступного питання
    if (currentQuestion < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      // Квіз завершено - показуємо результати
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  };

  const handlePrevQuestion = () => {
    if (showResults) {
      // Повертаємося до останнього питання з результатів
      setShowResults(false);
      setCurrentQuestion(questions.length);
    } else if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      // Видаляємо останню відповідь
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleContinue = () => {
    onClose();
  };

  const handleTakeQuizAgain = () => {
    setShowResults(false);
    setIsQuizStarted(false);
    setCurrentQuestion(1);
    setAnswers([]);
    // Повертаємося до початкового екрану квізу
  };

  if (!isOpen) return null;

  return (
    <div 
      className={styles.modalOverlay} 
      onClick={handleBackdropClick}
    >
      <div className={styles.modalContent}>
        {/* Border frame - only on start screen */}
        {!isQuizStarted && (
          <img
            src="/frame-border.svg"
            alt="Modal border"
            className={styles.modalBorder}
          />
        )}

        {/* Top right - Close button */}
        <button
          className={styles.modalCloseButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
        >
          <span className={styles.closeText}>
            <IoIosClose className={styles.closeX} />
            <span className={styles.closeWord}>CLOSE</span>
            <span className={styles.closeWord}>QUIZ</span>
            <span className={styles.closeLineLeft}></span>
            <span className={styles.closeLineRight}></span>
          </span>
        </button>

        {/* Center content */}
        <div className={styles.contentFrame}>
          {!isQuizStarted ? (
            <div className={styles.quizContent}>
              {/* Title with green SVG and dots */}
              <div className={styles.titleSection}>
                {/* Green SVG decoration */}
                <img
                  src="/quote-icon.svg"
                  alt="Green decoration"
                  className={styles.greenDecoration}
                />
                <div className={styles.titleWrapper}>
                  <div className={styles.titleTextContainer}>
                    <div className={styles.titleLine}>
                      <img
                        src="/title-decoration.svg"
                        alt="Title decoration"
                        className={styles.titleDecoration}
                      />
                      FIND
                      <span className={styles.titleDots}>•</span>
                    </div>
                    <div className={styles.titleLineLarge}>
                      <span className={styles.titleDots}>•</span>
                      YOUR GIFT
                      <span className={styles.titleDots}>•</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions text */}
              <div className={styles.instructionsText}>
                Let's put the insight, learning, and inspiration you've found
                here in the Hall of Zero Limits to work. To see what purpose may
                be calling, answer the following questions about your passions
                and preferences. Each has only two answers, so simply choose the
                answer that best applies to you. Go forth; the key to
                discovering your gift awaits.
              </div>

              {/* BEGIN QUIZ button */}
              <button
                className={styles.beginQuizButton}
                onClick={() => setIsQuizStarted(true)}
              >
                <div className={styles.beginQuizLineTop}></div>
                <div className={styles.beginQuizLineBottom}></div>
                <svg
                  className={styles.beginQuizBorder}
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
                  className={styles.beginQuizLayerPath}
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
                <span className={styles.beginQuizText}>BEGIN QUIZ</span>
                <svg
                  className={styles.beginQuizArrow}
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

              {/* OR KEEP EXPLORING FIRST */}
              <button
                className={styles.keepExploring}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
              >
                <div className={styles.keepExploringLine}></div>
                <span className={styles.keepExploringText}>
                  OR KEEP EXPLORING FIRST
                  <span className={styles.keepExploringLineLeft}></span>
                  <span className={styles.keepExploringLineRight}></span>
                </span>
                <div className={styles.keepExploringLine}></div>
              </button>
            </div>
          ) : showResults ? (
            <div 
              ref={resultsContentRef} 
              className={styles.resultsContent}
              onWheel={handleResultsContentWheel}
              onTouchMove={handleResultsContentTouchMove}
            >
              {/* Results Title */}
              <div className={styles.resultsTitle}>QUIZ RESULTS</div>

              {/* Intro Text */}
              <div className={styles.resultsIntro}>
                You've reached the end of the quiz—and quite possibly the
                beginning of a new journey. The findings are like each of us:
                multi-dimensional. Go ahead, absorb them, and ask yourself to
                which path they may be pointing.
              </div>

              {/* Results Container */}
              <div className={styles.resultsContainer}>
                {/* Left Section - Result Details */}
                <div className={styles.resultDetails}>
                  <div className={styles.resultTitle}>
                    <span>THE</span>
                    <span>DECODER</span>
                  </div>
                  <div className={styles.resultSubtitle}>
                    With underlying characteristics of The Illuminator.
                  </div>
                  <div className={styles.resultDescription}>
                    Numbers form a bridge between the abstract and physical
                    worlds, and perhaps the path to discovering your gift.
                    Analytical and strategic, you're adept at zeroing in on the
                    connection between new problems and existing knowledge. You
                    can inspire by teaching, influence policy via research,
                    secure futures in accounting and finance, and inform the
                    creative process in a multitude of fields.
                  </div>
                </div>
              </div>

              {/* Social Sharing and Action Buttons */}
              <div className={styles.socialSharing}>
                <div className={styles.socialTitle}>
                  SHARE YOUR GIFT WITH FRIENDS
                </div>
                <div className={styles.socialButtons}>
                  <button className={styles.socialButton}>
                    <img
                      src="/octagon-frame.svg"
                      alt="Octagon frame"
                      className={styles.socialButtonFrame}
                    />
                    <img
                      src="/octagon-frame.svg"
                      alt="Octagon frame inner"
                      className={styles.socialButtonFrameInner}
                    />
                    <span className={styles.socialButtonText}>f</span>
                  </button>
                  <button className={styles.socialButton}>
                    <img
                      src="/octagon-frame.svg"
                      alt="Octagon frame"
                      className={styles.socialButtonFrame}
                    />
                    <img
                      src="/octagon-frame.svg"
                      alt="Octagon frame inner"
                      className={styles.socialButtonFrameInner}
                    />
                    <FaTwitter className={styles.socialButtonIcon} />
                  </button>
                </div>

                {/* Scroll indicator */}
                <div className={styles.scrollIndicator}>
                  <div className={styles.scrollText}>SCROLL</div>
                  <svg
                    className={styles.scrollArrow}
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
                </div>

                {/* Continue Button - використовуємо стиль enterButton з HeroSection */}
                <button
                  className={`${heroStyles.enterButton} ${styles.continueButtonOverride}`}
                  onClick={handleContinue}
                >
                  <div className={heroStyles.enterLineTop}></div>
                  <div className={heroStyles.enterLineBottom}></div>
                  <svg
                    className={heroStyles.enterBorder}
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
                    className={heroStyles.enterLayerPath}
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
                  <span className={heroStyles.enterText}>CONTINUE</span>
                  <svg
                    className={heroStyles.enterArrow}
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

                {/* Take Quiz Again Link - використовуємо стиль close button з MenuModal */}
                <button
                  className={`${menuStyles.modalCloseButton} ${styles.takeQuizAgainOverride}`}
                  onClick={handleTakeQuizAgain}
                >
                  <span className={menuStyles.closeText}>
                    <span className={menuStyles.closeWord}>TAKE THE QUIZ AGAIN</span>
                    <span className={menuStyles.closeLineLeft}></span>
                    <span className={menuStyles.closeLineRight}></span>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.questionContent}>
              {/* Left center - PREV button */}
              {currentQuestion > 1 && (
                <div className={styles.prevButtonWrapper}>
                  <span className={styles.prevButtonText}>PREV</span>
                  <img
                    src="/cross-icon.svg"
                    alt="Cross icon"
                    className={styles.prevButtonCrossIcon}
                  />
                  <img
                    src="/octagon-frame.svg"
                    alt="Octagon frame"
                    className={styles.prevButtonFrame}
                  />
                  <img
                    src="/octagon-frame.svg"
                    alt="Octagon frame inner"
                    className={styles.prevButtonFrameInner}
                  />
                  <button
                    className={`${welcomeStyles.navButton} ${styles.prevButton}`}
                    onClick={handlePrevQuestion}
                  >
                    <NavButtonLeft />
                  </button>
                </div>
              )}

              {/* Question Header */}
              <div ref={questionHeaderRef} className={styles.questionHeader}>
                <div className={styles.questionNumber}>
                  QUESTION {currentQuestion}
                </div>
                <div className={styles.questionTitle}>
                  {currentQ?.title === "SELECT A MOVIE GENRE" ? (
                    <>
                      <span>SELECT A</span>
                      <span>MOVIE GENRE</span>
                    </>
                  ) : currentQ?.title ===
                    "YOUR STRENGTH IN GROUP PROJECTS IS:" ? (
                    <>
                      <span>YOUR STRENGTH IN</span>
                      <span>GROUP PROJECTS IS:</span>
                    </>
                  ) : currentQ?.title === "YOU'D RATHER DISCUSS:" ? (
                    <>
                      <span>YOU'D RATHER</span>
                      <span>DISCUSS:</span>
                    </>
                  ) : currentQ?.title === "YOU'D PREFER TO:" ? (
                    <>
                      <span>YOU'D</span>
                      <span>PREFER TO:</span>
                    </>
                  ) : (
                    currentQ?.title
                      .split(" ")
                      .map((word, index) => <span key={index}>{word}</span>)
                  )}
                </div>
              </div>

              {/* Options */}
              {currentQ && (
                <div ref={optionsContainerRef} className={styles.optionsContainer}>
                  {currentQ.options.map((option) => (
                    <button
                      key={option.id}
                      className={styles.optionButton}
                      onClick={(e) => handleOptionClick(option.id, e)}
                    >
                      <img
                        src="/frame-border.svg"
                        alt="Frame border"
                        className={styles.optionFrame}
                      />
                      <img
                        src="/answer-green-lines.svg"
                        alt="Green lines"
                        className={styles.answerGreenLines}
                      />
                      <div className={styles.optionContent}>
                        <img
                          src="/icon-polygon.svg"
                          alt="Polygon icon"
                          className={styles.optionIconTopLeft}
                        />
                        <img
                          src="/icon-polygon.svg"
                          alt="Polygon icon"
                          className={styles.optionIconBottomRight}
                        />
                        <div className={styles.optionText}>{option.text}</div>
                        <img
                          src="/icon-polygon.svg"
                          alt="Polygon icon"
                          className={styles.optionIcon}
                        />
                        <div className={styles.optionSubtitle}>
                          {option.subtitle}
                        </div>
                      </div>
                      <div className={styles.clickToSelect}>
                        CLICK TO SELECT
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
