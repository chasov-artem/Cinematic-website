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
        {/* Border frame */}
        <div className={styles.modalBorder}></div>

        {/* Green corner accents */}
        <div
          className={`${styles.cornerAccent} ${styles.cornerAccentTopLeft}`}
        ></div>
        <div
          className={`${styles.cornerAccent} ${styles.cornerAccentTopRight}`}
        ></div>
        <div
          className={`${styles.cornerAccent} ${styles.cornerAccentBottomLeft}`}
        ></div>
        <div
          className={`${styles.cornerAccent} ${styles.cornerAccentBottomRight}`}
        ></div>

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

        {/* Center content frame */}
        <div className={styles.contentFrame}>
          <div className={styles.quoteContainer}>
            {/* Quote */}
            <div className={styles.quoteSection}>
              <div className={styles.quoteDecorator}></div>
              <div className={styles.quoteText}>"{quote.quote}"</div>
              <div className={styles.quoteDecorator}></div>
            </div>

            {/* Character name */}
            <div className={styles.characterName}>{quote.character}</div>

            {/* Character code */}
            {quote.code && (
              <div className={styles.characterCode}>{quote.code}</div>
            )}

            {/* Description */}
            <div className={styles.description}>{quote.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteModal;

