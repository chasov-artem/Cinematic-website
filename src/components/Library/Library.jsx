import { useState } from "react";
import StoryCard from "../StoryCard/StoryCard";
import NavButtonRight from "../WelcomeSection/NavButtonRight";
import NavButtonLeft from "../WelcomeSection/NavButtonLeft";
import welcomeStyles from "../WelcomeSection/WelcomeSection.module.css";
import styles from "./Library.module.css";

function Library() {
  const [playingId, setPlayingId] = useState(null);

  const libraryItems = [
    {
      id: 1,
      name: "Library Item 1",
      description: "Library item description",
      image: "/placeholder.jpg",
      audioSrc: "/audio1.mp3",
    },
    {
      id: 2,
      name: "Library Item 2",
      description: "Library item description",
      image: "/placeholder.jpg",
      audioSrc: "/audio2.mp3",
    },
    {
      id: 3,
      name: "Library Item 3",
      description: "Library item description",
      image: "/placeholder.jpg",
      audioSrc: "/audio3.mp3",
    },
  ];

  const handlePlay = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const handlePrev = () => {
    const spriteZeroSection = document.getElementById("sprite-zero");
    if (spriteZeroSection) {
      spriteZeroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNext = () => {
    const quizSection = document.getElementById("quiz");
    if (quizSection) {
      quizSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.librarySection} id="library">
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
          onClick={handleNext}
        >
          <NavButtonRight />
        </button>
      </div>

      <div className={styles.container}>
        <div className={styles.cardsGrid}>
          {libraryItems.map((item) => (
            <StoryCard
              key={item.id}
              image={item.image}
              name={item.name}
              description={item.description}
              audioSrc={item.audioSrc}
              isPlaying={playingId === item.id}
              onPlay={() => handlePlay(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Bottom center - Title and Text */}
      <div className={`${welcomeStyles.welcomeCenter} ${styles.bottomCenter}`}>
        <div className={welcomeStyles.welcomeLogo}>
          <div className={welcomeStyles.welcomeLogoLine}>THE</div>
          <div
            className={`${welcomeStyles.welcomeLogoLine} ${welcomeStyles.welcomeLogoLineSerif}`}
          >
            LIBRARY
          </div>
        </div>
        <div className={welcomeStyles.welcomeText}>
          <span className={welcomeStyles.welcomeLabel}>
            more help finding your gift
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

export default Library;

