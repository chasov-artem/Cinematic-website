import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import styles from "./QuoteModal.module.css";

function QuoteModal({ isOpen, onClose, quote }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !quote) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
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
            <span className={styles.closeWord}>QUOTE</span>
            <span className={styles.closeLineLeft}></span>
            <span className={styles.closeLineRight}></span>
          </span>
        </button>

        {/* Decorative SVG frame with content */}
        <svg
          className={styles.decorativeFrame}
          width="443"
          height="603"
          viewBox="0 0 443 603"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.14"
            d="M1 592V63.4517C1 60.8178 2.03912 58.2903 3.89169 56.4181L55.7923 3.96637C57.6706 2.06812 60.2301 1 62.9006 1H432C437.523 1 442 5.47715 442 11V34.9942V540.924C442 543.689 440.855 546.331 438.837 548.221L384.318 599.298C382.465 601.034 380.02 602 377.481 602H38.4939H11C5.47715 602 1 597.523 1 592Z"
            stroke="white"
          />
          <foreignObject x="0" y="0" width="443" height="603">
            <div className={styles.quoteContainer}>
              {/* Quote */}
              <div className={styles.quoteSection}>
                <img
                  src="/quote-icon.svg"
                  alt="Quote icon"
                  className={styles.quoteIconTop}
                />
                <div
                  className={styles.quoteText}
                  style={{
                    fontFamily: "var(--font-gill-sans)",
                  }}
                >
                  "{quote.quote}"
                </div>
                <img
                  src="/quote-icon.svg"
                  alt="Quote icon"
                  className={styles.quoteIconBottom}
                />
              </div>

              {/* Character name */}
              <div className={styles.characterName}>{quote.character}</div>

              {/* Character code */}
              {quote.code && (
                <div className={styles.characterCodeWrapper}>
                  <div className={styles.characterCode}>
                    {quote.id === 2 || quote.id === 3
                      ? quote.character
                      : quote.code}
                  </div>
                  {/* Decorative star */}
                  <svg
                    className={styles.decorativeStar}
                    width="12"
                    height="12"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 7L6.59808 5.5V2.5L4 1L1.40192 2.5V5.5L4 7Z"
                      stroke="white"
                      strokeOpacity="1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              {/* Description */}
              <div className={styles.description}>{quote.description}</div>
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}

export default QuoteModal;
