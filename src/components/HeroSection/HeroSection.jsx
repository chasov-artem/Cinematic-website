import styles from "./HeroSection.module.css";

function HeroSection() {
  const handleEnterClick = () => {
    const welcomeSection = document.getElementById("welcome");
    if (welcomeSection) {
      welcomeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.heroSection}>
      {/* Top right button */}
      <button className={styles.accessibleButton}>
        Accessible version &gt;&gt;
      </button>

      {/* Main content center */}
      <div className={styles.heroContent}>
        {/* Logos */}
        <div className={styles.logosContainer}>
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

        {/* Main title */}
        <h1 className={styles.heroTitle}>
          <span className={styles.titleLine}>THE</span>
          <span className={styles.titleLineLarge}>HALL</span>
          <span className={styles.titleLine}>OF</span>
          <span className={styles.titleLineLarge}>ZERO LIMITS</span>
        </h1>

        {/* Tagline */}
        <p className={styles.tagline}>
          EXPLORE NEW PATHS.
          <br />
          FIND YOUR GIFT.
        </p>

        {/* Enter button */}
        <button className={styles.enterButton} onClick={handleEnterClick}>
          ENTER &gt;&gt;
        </button>
      </div>

      {/* Bottom right footer */}
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
    </section>
  );
}

export default HeroSection;
