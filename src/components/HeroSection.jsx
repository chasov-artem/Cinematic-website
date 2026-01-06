import styles from './HeroSection.module.css'

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>The Hall of Zero Limits</h1>
      </div>
    </section>
  )
}

export default HeroSection
