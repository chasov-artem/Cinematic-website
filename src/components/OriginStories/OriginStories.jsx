import { useState } from "react";
import StoryCard from "../StoryCard/StoryCard";
import styles from "./OriginStories.module.css";

function OriginStories() {
  const [playingId, setPlayingId] = useState(null);

  const stories = [
    {
      id: 1,
      name: "Story 1",
      description: "Origin story description",
      image: "/placeholder.jpg",
      audioSrc: "/audio1.mp3",
    },
    {
      id: 2,
      name: "Story 2",
      description: "Origin story description",
      image: "/placeholder.jpg",
      audioSrc: "/audio2.mp3",
    },
  ];

  const handlePlay = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  return (
    <section className={styles.originStoriesSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Origin Stories</h2>
        <div className={styles.cardsGrid}>
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              image={story.image}
              name={story.name}
              description={story.description}
              audioSrc={story.audioSrc}
              isPlaying={playingId === story.id}
              onPlay={() => handlePlay(story.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OriginStories;

