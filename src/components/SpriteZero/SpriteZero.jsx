import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsHexagon } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { useMenu } from "../../contexts/MenuContext";
import NavButtonRight from "../WelcomeSection/NavButtonRight";
import NavButtonLeft from "../WelcomeSection/NavButtonLeft";
import VideoModal from "../OriginStories/VideoModal";
import welcomeStyles from "../WelcomeSection/WelcomeSection.module.css";
import styles from "./SpriteZero.module.css";
import { addSectionScrollAnimations } from "../../utils/sectionScrollAnimations";

gsap.registerPlugin(ScrollTrigger);

function SpriteZero() {
  const { openMenu, markSectionCompleted } = useMenu();
  const sectionRef = useRef(null);
  const topLogoRef = useRef(null);
  const topButtonRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const watchButtonRef = useRef(null);
  const bottomCenterRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [watchedVideo, setWatchedVideo] = useState(false);

  const videoStory = {
    id: 1,
    firstName: "SPRITE",
    lastName: "ZERO SUGAR",
    role: "A NEW PATH FORGED.",
    quote: "A MOST REFRESHING DISCOVERY.",
    image: "/tvc.webp",
    videoSrc:
      "https://wakanda-forever-master.dogstudio-dev.co/zerolimits/assets/videos/tvc.webm",
  };

  const handleWatchClick = () => {
    window.__modalOpenTime = Date.now();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (videoStory) {
      setWatchedVideo(true);
      markSectionCompleted("sprite-zero", true);
    }
    setIsModalOpen(false);
  };

  const handlePrev = () => {
    const inspirationGardenSection =
      document.getElementById("inspiration-garden");
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

  useEffect(() => {
    return addSectionScrollAnimations(sectionRef, {
      topLogoRef,
      topButtonRef,
      leftButtonRef,
      rightButtonRef,
      watchButtonsRef: watchButtonRef,
      bottomCenterRef,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.spriteZeroSection}
      id="sprite-zero"
    >
      {/* Top left logo */}
      <div ref={topLogoRef} className={welcomeStyles.topLogo}>
        <img
          src="/hall-logo.svg"
          alt="The Hall of Zero Limits"
          className={welcomeStyles.logoImage}
        />
      </div>

      {/* Top right - Menu button */}
      <button
        ref={topButtonRef}
        className={welcomeStyles.rightTopButton}
        onClick={openMenu}
      >
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
        ref={leftButtonRef}
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
      <div
        ref={rightButtonRef}
        className={welcomeStyles.rightCenterButtonWrapper}
      >
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

      {/* Center - WATCH button */}
      <div className={styles.videoContentContainer}>
        {/* WATCH button */}
        <div ref={watchButtonRef} className={styles.watchButtonsContainer}>
          <div className={styles.watchButtonWrapper}>
            <button
              className={`${styles.watchButton}${
                watchedVideo ? ` ${styles.watchButtonActive}` : ""
              }`}
              data-active={watchedVideo}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWatchClick();
              }}
            >
              {/* Background layer for active state */}
              {watchedVideo && (
                <div className={styles.watchButtonBackground}></div>
              )}
              <img
                src="/marker-label.svg"
                alt="Marker label"
                className={styles.markerLabel}
                loading="lazy"
              />
              <div className={styles.watchButtonContent}>
                {watchedVideo ? (
                  <AiOutlineCheck
                    className={styles.watchCheckIcon}
                    style={{ display: "block" }}
                  />
                ) : (
                  <svg
                    className={styles.watchEyeIcon}
                    width="35"
                    height="32"
                    viewBox="0 0 35 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.78567 15.5386L7.55478 15.0951L6.8964 15.4378L7.46143 15.9192L7.78567 15.5386ZM17.5296 10.4658L17.7945 10.0418L17.5522 9.89037L17.2987 10.0223L17.5296 10.4658ZM25.6495 15.5386L26.0248 15.869L26.4141 15.4267L25.9144 15.1145L25.6495 15.5386ZM8.01656 15.9821L17.7605 10.9093L17.2987 10.0223L7.55478 15.0951L8.01656 15.9821ZM17.2647 10.8899L25.3846 15.9626L25.9144 15.1145L17.7945 10.0418L17.2647 10.8899ZM25.6495 15.5386C25.2742 15.2082 25.2743 15.2081 25.2743 15.2081C25.2743 15.2081 25.2742 15.2081 25.2742 15.2082C25.2741 15.2083 25.274 15.2084 25.2738 15.2087C25.2733 15.2092 25.2726 15.21 25.2715 15.2112C25.2695 15.2135 25.2663 15.2172 25.2619 15.2221C25.2532 15.2319 25.2399 15.2467 25.2223 15.2662C25.1871 15.3054 25.1346 15.3633 25.0663 15.4374C24.9296 15.5856 24.73 15.7981 24.4801 16.0536C23.9797 16.5651 23.2805 17.2458 22.4833 17.9249C21.6842 18.6056 20.7974 19.2756 19.9216 19.773C19.0358 20.2761 18.2131 20.5725 17.5296 20.5725V21.5725C18.4701 21.5725 19.4743 21.1771 20.4155 20.6426C21.3667 20.1024 22.3068 19.3889 23.1318 18.6861C23.9586 17.9818 24.6803 17.2789 25.1949 16.7529C25.4525 16.4895 25.6589 16.2698 25.8014 16.1153C25.8726 16.0381 25.9279 15.9771 25.9657 15.9352C25.9845 15.9142 25.999 15.898 26.009 15.8868C26.0139 15.8812 26.0177 15.8769 26.0204 15.874C26.0217 15.8725 26.0227 15.8713 26.0235 15.8705C26.0238 15.87 26.0241 15.8697 26.0244 15.8695C26.0245 15.8693 26.0246 15.8692 26.0246 15.8691C26.0247 15.869 26.0248 15.869 25.6495 15.5386ZM17.5296 20.5725C16.8358 20.5725 15.906 20.2695 14.8557 19.7582C13.8202 19.2541 12.7259 18.577 11.7212 17.8923C10.7183 17.2088 9.81428 16.5243 9.16048 16.0102C8.83384 15.7533 8.57027 15.5395 8.38876 15.3902C8.29802 15.3156 8.22782 15.2571 8.18055 15.2175C8.15691 15.1977 8.13901 15.1826 8.12714 15.1725C8.1212 15.1675 8.11677 15.1638 8.11389 15.1613C8.11245 15.1601 8.1114 15.1592 8.11073 15.1586C8.1104 15.1584 8.11016 15.1582 8.11003 15.1581C8.10996 15.158 8.10993 15.158 8.1099 15.1579C8.10989 15.1579 8.10992 15.158 7.78567 15.5386C7.46143 15.9192 7.4615 15.9192 7.46159 15.9193C7.46166 15.9194 7.46178 15.9195 7.46191 15.9196C7.46217 15.9198 7.46253 15.9201 7.46298 15.9205C7.46389 15.9213 7.4652 15.9224 7.46689 15.9238C7.47028 15.9267 7.47522 15.9309 7.48167 15.9363C7.49458 15.9472 7.51355 15.9632 7.53828 15.984C7.58775 16.0254 7.66029 16.0858 7.75351 16.1625C7.93994 16.3158 8.20924 16.5343 8.54234 16.7963C9.20803 17.3198 10.131 18.0187 11.1581 18.7187C12.1834 19.4175 13.322 20.1238 14.418 20.6574C15.4992 21.1837 16.5994 21.5725 17.5296 21.5725V20.5725Z"
                      fill="currentColor"
                    />
                    <path
                      d="M13.1919 15.6844L12.9558 15.2436L12.4213 15.53L12.8043 16.0002L13.1919 15.6844ZM17.2171 13.5276L17.4875 13.107L17.2401 12.948L16.9809 13.0869L17.2171 13.5276ZM20.5713 15.6844L21.0132 15.9183L21.2282 15.5123L20.8417 15.2638L20.5713 15.6844ZM13.4281 16.1251L17.4532 13.9683L16.9809 13.0869L12.9558 15.2436L13.4281 16.1251ZM16.9466 13.9482L20.3009 16.1049L20.8417 15.2638L17.4875 13.107L16.9466 13.9482ZM20.5713 15.6844C20.1294 15.4504 20.1295 15.4502 20.1296 15.4501C20.1296 15.4501 20.1297 15.45 20.1297 15.4499C20.1298 15.4498 20.1298 15.4497 20.1299 15.4496C20.1299 15.4495 20.1299 15.4495 20.1298 15.4496C20.1297 15.45 20.1292 15.4508 20.1285 15.4522C20.127 15.455 20.1243 15.4598 20.1204 15.4667C20.1128 15.4804 20.1005 15.502 20.0837 15.5303C20.0501 15.5869 19.9986 15.6702 19.93 15.7712C19.7923 15.974 19.5891 16.2435 19.3273 16.5113C18.7949 17.0559 18.0776 17.5372 17.2171 17.5372V18.5372C18.4649 18.5372 19.4247 17.8421 20.0424 17.2103C20.3556 16.8899 20.5956 16.5711 20.7574 16.3328C20.8386 16.2132 20.9009 16.1127 20.9436 16.0407C20.965 16.0046 20.9816 15.9756 20.9932 15.9549C20.999 15.9445 21.0036 15.9362 21.0069 15.93C21.0086 15.927 21.0099 15.9244 21.011 15.9225C21.0115 15.9215 21.012 15.9207 21.0123 15.92C21.0125 15.9196 21.0127 15.9193 21.0128 15.9191C21.0129 15.9189 21.013 15.9187 21.013 15.9187C21.0131 15.9185 21.0132 15.9183 20.5713 15.6844ZM17.2171 17.5372C16.3353 17.5372 15.4411 17.0365 14.7243 16.4688C14.3746 16.1919 14.0857 15.9139 13.8843 15.705C13.7839 15.6008 13.7061 15.5147 13.654 15.4554C13.628 15.4258 13.6085 15.4031 13.596 15.3882C13.5897 15.3808 13.5852 15.3753 13.5824 15.372C13.581 15.3703 13.5801 15.3692 13.5796 15.3686C13.5794 15.3683 13.5793 15.3682 13.5793 15.3682C13.5793 15.3682 13.5793 15.3682 13.5793 15.3683C13.5794 15.3683 13.5794 15.3684 13.5794 15.3684C13.5795 15.3685 13.5796 15.3686 13.1919 15.6844C12.8043 16.0002 12.8044 16.0003 12.8045 16.0004C12.8045 16.0004 12.8046 16.0006 12.8047 16.0007C12.8049 16.0009 12.8051 16.0011 12.8053 16.0014C12.8058 16.002 12.8063 16.0027 12.807 16.0035C12.8084 16.0052 12.8103 16.0075 12.8126 16.0102C12.8172 16.0158 12.8237 16.0236 12.832 16.0334C12.8485 16.053 12.8723 16.0807 12.9028 16.1155C12.9638 16.1849 13.0522 16.2826 13.1644 16.399C13.3883 16.6313 13.7103 16.9415 14.1034 17.2528C14.8721 17.8615 15.9904 18.5372 17.2171 18.5372V17.5372Z"
                      fill="currentColor"
                    />
                    <circle
                      cx="17.2931"
                      cy="15.9869"
                      r="0.819932"
                      stroke="currentColor"
                    />
                    <path
                      d="M5.81692 11.0674C6.80453 12.8134 7.79601 13.7644 8.68668 15.167"
                      stroke="currentColor"
                    />
                    <path
                      d="M28.731 20.9072C27.7434 19.1612 26.7519 18.2102 25.8612 16.8076"
                      stroke="currentColor"
                    />
                    <path
                      d="M8.85598 9.42773C9.58582 11.2962 10.4323 12.3783 11.1149 13.8932"
                      stroke="currentColor"
                    />
                    <path
                      d="M25.6919 22.5469C24.9621 20.6784 24.1156 19.5963 23.433 18.0814"
                      stroke="currentColor"
                    />
                    <path
                      d="M11.7232 7.78809C12.453 9.65657 13.2995 10.7387 13.9821 12.2535"
                      stroke="currentColor"
                    />
                    <path
                      d="M22.8247 24.7451C22.0949 22.8766 21.2484 21.7945 20.5658 20.2797"
                      stroke="currentColor"
                    />
                    <path
                      d="M14.9341 6.06348C15.5559 7.92764 16.2946 9.00037 16.8798 10.5102"
                      stroke="currentColor"
                    />
                    <path
                      d="M19.6138 25.9111C18.992 24.047 18.2533 22.9742 17.6681 21.4644"
                      stroke="currentColor"
                    />
                    <path
                      d="M19.6763 6C19.133 7.88854 19.1344 9.191 18.7617 10.7669"
                      stroke="currentColor"
                    />
                    <path
                      d="M14.8716 25.9746C15.4149 24.0861 15.4135 22.7836 15.7862 21.2077"
                      stroke="currentColor"
                    />
                    <path
                      d="M23.2544 8.04004C22.1619 9.67348 21.7666 10.9145 20.9318 12.3021"
                      stroke="currentColor"
                    />
                    <path
                      d="M11.2935 23.9346C12.386 22.3011 12.7813 21.0601 13.6161 19.6725"
                      stroke="currentColor"
                    />
                    <path
                      d="M25.8013 9.42773C24.7088 11.0612 24.3135 12.3022 23.4787 13.6898"
                      stroke="currentColor"
                    />
                    <path
                      d="M8.74661 22.5469C9.83911 20.9134 10.2344 19.6724 11.0692 18.2848"
                      stroke="currentColor"
                    />
                    <path
                      d="M28.6997 11.0518C27.3386 12.4692 26.7325 13.622 25.6681 14.8424"
                      stroke="currentColor"
                    />
                    <path
                      d="M5.85598 20.9229C7.2171 19.5054 7.82319 18.3526 8.88762 17.1322"
                      stroke="currentColor"
                    />
                  </svg>
                )}
                <span className={styles.watchText}>WATCH</span>
              </div>
            </button>
            <button
              className={styles.playIconWrapper}
              onClick={(e) => {
                e.stopPropagation();
                handleWatchClick();
              }}
            >
              <BsHexagon className={styles.playIconHexagon} />
              <img
                src="/play-icon.svg"
                alt="Play icon"
                className={styles.playIcon}
                loading="lazy"
              />
            </button>
            <div className={styles.playIconLine}></div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        story={videoStory}
      />

      {/* Bottom center - Title and Text */}
      <div
        ref={bottomCenterRef}
        className={`${welcomeStyles.welcomeCenter} ${styles.bottomCenter}`}
      >
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
        <img
          src="/cross-icon.svg"
          alt="Cross icon"
          className={welcomeStyles.welcomeCrossIcon}
          loading="lazy"
        />
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
          <p className={welcomeStyles.footerText}>
            Sprite Zero Sugar® | © MARVEL
          </p>
        </div>
      </div>
    </section>
  );
}

export default SpriteZero;
