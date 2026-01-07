import { useState } from "react";
import NavButtonRight from "../WelcomeSection/NavButtonRight";
import NavButtonLeft from "../WelcomeSection/NavButtonLeft";
import welcomeStyles from "../WelcomeSection/WelcomeSection.module.css";
import styles from "./Quiz.module.css";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What type of content do you prefer?",
      options: ["Comedy", "Documentary", "Action", "Drama"],
    },
    {
      id: 2,
      question: "What inspires you most?",
      options: ["Music", "Art", "Nature", "Technology"],
    },
    {
      id: 3,
      question: "How do you express yourself?",
      options: ["Writing", "Visual Arts", "Performance", "Design"],
    },
  ];

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const handlePrev = () => {
    const librarySection = document.getElementById("library");
    if (librarySection) {
      librarySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNextSection = () => {
    const footerSection = document.querySelector("footer");
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (showResult) {
    return (
      <section className={styles.quizSection} id="quiz">
        {/* Top left logo */}
        <div className={welcomeStyles.topLogo}>
          <img
            src="/hall-logo.svg"
            alt="The Hall of Zero Limits"
            className={welcomeStyles.logoImage}
          />
        </div>

        {/* Top right - Menu button */}
        <button className={welcomeStyles.rightTopButton}>
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

        {/* Left center - PREV button */}
        <div
          className={`${welcomeStyles.rightCenterButtonWrapper} ${styles.leftCenterButtonWrapper}`}
        >
          <span
            className={`${welcomeStyles.rightCenterNextText} ${styles.leftCenterPrevText}`}
          >
            PREV
          </span>
          <img
            src="/cross-icon.svg"
            alt="Cross icon"
            className={`${welcomeStyles.rightCenterCrossIcon} ${styles.leftCenterCrossIcon}`}
          />
          <img
            src="/octagon-frame.svg"
            alt="Octagon frame"
            className={`${welcomeStyles.rightCenterButtonFrame} ${styles.leftCenterButtonFrame}`}
          />
          <img
            src="/octagon-frame.svg"
            alt="Octagon frame inner"
            className={`${welcomeStyles.rightCenterButtonFrameInner} ${styles.leftCenterButtonFrameInner}`}
          />
          <button
            className={`${welcomeStyles.navButton} ${welcomeStyles.rightCenterButton} ${styles.leftCenterButton}`}
            onClick={handlePrev}
          >
            <NavButtonLeft />
          </button>
        </div>

        {/* Right center - NEXT button */}
        <div className={welcomeStyles.rightCenterButtonWrapper}>
          <span className={welcomeStyles.rightCenterNextText}>NEXT</span>
          <img
            src="/cross-icon.svg"
            alt="Cross icon"
            className={welcomeStyles.rightCenterCrossIcon}
          />
          <img
            src="/octagon-frame.svg"
            alt="Octagon frame"
            className={welcomeStyles.rightCenterButtonFrame}
          />
          <img
            src="/octagon-frame.svg"
            alt="Octagon frame inner"
            className={welcomeStyles.rightCenterButtonFrameInner}
          />
          <button
            className={`${welcomeStyles.navButton} ${welcomeStyles.rightCenterButton}`}
            onClick={handleNextSection}
          >
            <NavButtonRight />
          </button>
        </div>

        <div className={styles.container}>
          <div className={styles.resultContent}>
            <p className={styles.resultText}>
              Based on your answers, you have unlimited potential!
            </p>
            <button className={styles.restartButton} onClick={handleRestart}>
              Start Again
            </button>
          </div>
        </div>

        {/* Bottom center - Title and Text */}
        <div className={`${welcomeStyles.welcomeCenter} ${styles.bottomCenter}`}>
          <div className={welcomeStyles.welcomeLogo}>
            <div className={welcomeStyles.welcomeLogoLine}>FIND</div>
            <div
              className={`${welcomeStyles.welcomeLogoLine} ${welcomeStyles.welcomeLogoLineSerif}`}
            >
              YOUR GIFT
            </div>
          </div>
          <div className={welcomeStyles.welcomeText}>
            <span className={welcomeStyles.welcomeLabel}>
              quiz experience
            </span>
          </div>
        </div>

        {/* Bottom footer */}
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
            <p className={welcomeStyles.footerText}>Sprite Zero Sugar® | © MARVEL</p>
          </div>
        </div>
      </section>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section className={styles.quizSection} id="quiz">
      {/* Top left logo */}
      <div className={welcomeStyles.topLogo}>
        <img
          src="/hall-logo.svg"
          alt="The Hall of Zero Limits"
          className={welcomeStyles.logoImage}
        />
      </div>

      {/* Top right - Menu button */}
      <button className={welcomeStyles.rightTopButton}>
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

      {/* Left center - PREV button */}
      <div
        className={`${welcomeStyles.rightCenterButtonWrapper} ${styles.leftCenterButtonWrapper}`}
      >
        <span
          className={`${welcomeStyles.rightCenterNextText} ${styles.leftCenterPrevText}`}
        >
          PREV
        </span>
        <img
          src="/cross-icon.svg"
          alt="Cross icon"
          className={`${welcomeStyles.rightCenterCrossIcon} ${styles.leftCenterCrossIcon}`}
        />
        <img
          src="/octagon-frame.svg"
          alt="Octagon frame"
          className={`${welcomeStyles.rightCenterButtonFrame} ${styles.leftCenterButtonFrame}`}
        />
        <img
          src="/octagon-frame.svg"
          alt="Octagon frame inner"
          className={`${welcomeStyles.rightCenterButtonFrameInner} ${styles.leftCenterButtonFrameInner}`}
        />
        <button
          className={`${welcomeStyles.navButton} ${welcomeStyles.rightCenterButton} ${styles.leftCenterButton}`}
          onClick={handlePrev}
        >
          <NavButtonLeft />
        </button>
        </div>

      {/* Right center - NEXT button */}
      <div className={welcomeStyles.rightCenterButtonWrapper}>
        <span className={welcomeStyles.rightCenterNextText}>NEXT</span>
        <img
          src="/cross-icon.svg"
          alt="Cross icon"
          className={welcomeStyles.rightCenterCrossIcon}
        />
        <img
          src="/octagon-frame.svg"
          alt="Octagon frame"
          className={welcomeStyles.rightCenterButtonFrame}
        />
        <img
          src="/octagon-frame.svg"
          alt="Octagon frame inner"
          className={welcomeStyles.rightCenterButtonFrameInner}
        />
        <button
          className={`${welcomeStyles.navButton} ${welcomeStyles.rightCenterButton}`}
          onClick={handleNextSection}
        >
          <NavButtonRight />
        </button>
      </div>

      <div className={styles.container}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className={styles.questionContainer}>
          <h3 className={styles.questionNumber}>
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <p className={styles.questionText}>{currentQ.question}</p>
          <div className={styles.optionsGrid}>
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className={`${styles.optionCard} ${
                  answers[currentQuestion] === option ? styles.selected : ""
                }`}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className={styles.navigation}>
            <button
              className={styles.navButton}
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              className={styles.navButton}
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bottom center - Title and Text */}
      <div className={`${welcomeStyles.welcomeCenter} ${styles.bottomCenter}`}>
        <div className={welcomeStyles.welcomeLogo}>
          <div className={welcomeStyles.welcomeLogoLine}>FIND</div>
          <div
            className={`${welcomeStyles.welcomeLogoLine} ${welcomeStyles.welcomeLogoLineSerif}`}
          >
            YOUR GIFT
          </div>
        </div>
        <div className={welcomeStyles.welcomeText}>
          <span className={welcomeStyles.welcomeLabel}>
            quiz experience
          </span>
        </div>
      </div>

      {/* Bottom footer */}
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
          <p className={welcomeStyles.footerText}>Sprite Zero Sugar® | © MARVEL</p>
        </div>
      </div>
    </section>
  );
}

export default Quiz;

