import { useRef, useState } from "react";
import NavButtonRight from "../WelcomeSection/NavButtonRight";
import NavButtonLeft from "../WelcomeSection/NavButtonLeft";
import welcomeStyles from "../WelcomeSection/WelcomeSection.module.css";
import styles from "./SpriteZero.module.css";

function SpriteZero() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              // Ігноруємо AbortError - виникає коли play() переривається pause()
              if (error.name !== "AbortError" && error.name !== "NotAllowedError") {
                // Тиха обробка інших помилок
              }
            });
        } else {
          setIsPlaying(true);
        }
      }
    }
  };

  const handlePrev = () => {
    const inspirationGardenSection = document.getElementById("inspiration-garden");
    if (inspirationGardenSection) {
      inspirationGardenSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNext = () => {
    const librarySection = document.getElementById("library");
    if (librarySection) {
      librarySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.spriteZeroSection} id="sprite-zero">
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
        <div className={styles.videoWrapper}>
          <video
            ref={videoRef}
            className={styles.video}
            loop
            muted
            playsInline
            onClick={handlePlayPause}
          >
            <source src="/sprite-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            className={styles.playButton}
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <span className={styles.icon}>⏸</span>
            ) : (
              <span className={styles.icon}>▶</span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom center - Title and Text */}
      <div className={`${welcomeStyles.welcomeCenter} ${styles.bottomCenter}`}>
        <div className={welcomeStyles.welcomeLogo}>
          <div className={welcomeStyles.welcomeLogoLine}>SPRITE</div>
          <div
            className={`${welcomeStyles.welcomeLogoLine} ${welcomeStyles.welcomeLogoLineSerif}`}
          >
            ZERO SUGAR
          </div>
        </div>
        <div className={welcomeStyles.welcomeText}>
          <span className={welcomeStyles.welcomeLabel}>
            open your infinite potential
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

export default SpriteZero;
