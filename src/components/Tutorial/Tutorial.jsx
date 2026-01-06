import styles from "./Tutorial.module.css";

function Tutorial() {
  return (
    <section className={styles.tutorialSection}>
      <div className={styles.tutorialContent}>
        <h2 className={styles.tutorialTitle}>Tutorial</h2>
        <p className={styles.tutorialText}>
          Learn how to navigate and explore The Hall of Zero Limits
        </p>
      </div>
    </section>
  );
}

export default Tutorial;
