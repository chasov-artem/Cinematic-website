import AudioPlayer from "../AudioPlayer/AudioPlayer";
import styles from "./StoryCard.module.css";

function StoryCard({ image, name, description, audioSrc, onPlay, isPlaying }) {
  const handleToggle = () => {
    onPlay();
  };

  const handleEnded = () => {
    if (isPlaying) {
      onPlay();
    }
  };

  return (
    <div className={styles.storyCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <AudioPlayer
          src={audioSrc}
          isPlaying={isPlaying}
          onPlay={handleToggle}
          onPause={handleToggle}
          onEnded={handleEnded}
        />
      </div>
    </div>
  );
}

export default StoryCard;
