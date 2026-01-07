import styles from "./WelcomeSection.module.css";

function NavButtonLeft({ isDisabled }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        className={styles.buttonRoundBg} 
        d="M29.9134 52.2074C28.6883 52.7149 27.3117 52.7149 26.0866 52.2074L12.2357 46.4702C11.0106 45.9628 10.0372 44.9894 9.52976 43.7642L3.79256 29.9134C3.28509 28.6883 3.28509 27.3117 3.79256 26.0866L9.52977 12.2357C10.0372 11.0106 11.0106 10.0372 12.2357 9.52977L26.0866 3.79257C27.3117 3.2851 28.6883 3.2851 29.9134 3.79257L43.7643 9.52977C44.9894 10.0372 45.9628 11.0106 46.4702 12.2358L52.2074 26.0866C52.7149 27.3117 52.7149 28.6883 52.2074 29.9134L46.4702 43.7643C45.9628 44.9894 44.9894 45.9628 43.7643 46.4702L29.9134 52.2074Z" 
        fill="#08110A" 
        fillOpacity={isDisabled ? "0.2" : "0.6"}
      />
      <path 
        className={styles.buttonRoundStroke} 
        d="M29.7216 54.7455L45.6938 48.1296C46.7964 47.6729 47.6724 46.7969 48.1291 45.6942L54.745 29.7221C55.2017 28.6194 55.2017 27.3805 54.745 26.2779L48.1291 10.3058C47.6724 9.20314 46.7964 8.32711 45.6937 7.87038L29.7216 1.2545C28.619 0.79778 27.3801 0.797781 26.2774 1.2545L10.3053 7.87039C9.20265 8.32711 8.32662 9.20314 7.86989 10.3058L1.25401 26.2779C0.797288 27.3806 0.79729 28.6195 1.25401 29.7221L7.8699 45.6942C8.32662 46.7969 9.20265 47.6729 10.3053 48.1296L26.2774 54.7455C27.3801 55.2022 28.619 55.2022 29.7216 54.7455Z" 
        stroke="#ffffff" 
        strokeOpacity={isDisabled ? "0.2" : "1"}
        strokeLinejoin="round"
      />
      <g 
        className={styles.navButtonArrow}
        transform="translate(19, 21.5) scale(-1, 1) translate(-18, 0)"
        opacity={isDisabled ? "0.3" : "1"}
      >
        <path d="M5 2.26904C6.32172 3.2154 10.0474 6.27714 9.99954 6.55548C9.82715 7.5575 6.03439 10.2296 5 10.7306" stroke="#99ff88" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.5008 1.5C13.087 2.62923 17.0002 6.27996 17.0002 6.51812C17.0002 7.15217 12.2416 10.9022 11.0002 11.5" stroke="#99ff88" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 6.88464L1 6.88464" stroke="#99ff88" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default NavButtonLeft;
