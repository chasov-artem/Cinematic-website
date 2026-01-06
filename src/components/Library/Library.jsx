import { useState } from "react";
import StoryCard from "../StoryCard/StoryCard";
import styles from "./Library.module.css";

function Library() {
  const [playingId, setPlayingId] = useState(null);

  const libraryItems = [
    {
      id: 1,
      name: "Library Item 1",
      description: "Library item description",
      image: "/placeholder.jpg",
      audioSrc: "/audio1.mp3",
    },
    {
      id: 2,
      name: "Library Item 2",
      description: "Library item description",
      image: "/placeholder.jpg",
      audioSrc: "/audio2.mp3",
    },
    {
      id: 3,
      name: "Library Item 3",
      description: "Library item description",
      image: "/placeholder.jpg",
      audioSrc: "/audio3.mp3",
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
    <section className={styles.librarySection}>
      <div className={styles.container}>
        <h2 className={styles.title}>The Library</h2>
        <div className={styles.cardsGrid}>
          {libraryItems.map((item) => (
            <StoryCard
              key={item.id}
              image={item.image}
              name={item.name}
              description={item.description}
              audioSrc={item.audioSrc}
              isPlaying={playingId === item.id}
              onPlay={() => handlePlay(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Library;

