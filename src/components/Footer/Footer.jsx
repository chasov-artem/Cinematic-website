import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.branding}>
            <p className={styles.spriteLogo}>Sprite Zero Sugar®</p>
            <span className={styles.separator}>|</span>
            <p className={styles.marvelCopyright}>© MARVEL</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
