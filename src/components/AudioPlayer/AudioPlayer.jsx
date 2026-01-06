import { useRef, useEffect } from "react";
import styles from "./AudioPlayer.module.css";

function AudioPlayer({ src, isPlaying, onPlay, onPause, onEnded }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Ігноруємо AbortError - виникає коли play() переривається pause()
            if (error.name !== "AbortError" && error.name !== "NotAllowedError") {
              // Тиха обробка інших помилок
            }
          });
        }
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying]);

  const handleClick = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  return (
    <div className={styles.audioPlayer}>
      <button
        className={styles.playButton}
        onClick={handleClick}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <span className={styles.icon}>⏸</span>
        ) : (
          <span className={styles.icon}>▶</span>
        )}
      </button>
      <audio
        ref={audioRef}
        src={src}
        onEnded={onEnded}
        preload="none"
        onError={() => {
          // Тиха обробка помилок - файл може бути відсутній на етапі розробки
        }}
      />
    </div>
  );
}

export default AudioPlayer;
