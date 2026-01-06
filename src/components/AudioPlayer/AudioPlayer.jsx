import { useRef, useEffect } from "react";
import styles from "./AudioPlayer.module.css";

function AudioPlayer({ src, isPlaying, onPlay, onPause, onEnded }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
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
        preload="metadata"
        onError={(e) => {
          console.error("Audio error:", e);
        }}
      />
    </div>
  );
}

export default AudioPlayer;
