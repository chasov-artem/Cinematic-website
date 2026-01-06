import { useRef, useState } from "react";
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

  return (
    <section className={styles.spriteZeroSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sprite Zero Sugar</h2>
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
        <p className={styles.description}>
          Discover the refreshing taste of Sprite Zero Sugar
        </p>
      </div>
    </section>
  );
}

export default SpriteZero;
