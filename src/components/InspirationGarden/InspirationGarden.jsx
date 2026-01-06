import styles from "./InspirationGarden.module.css";

function InspirationGarden() {
  const quotes = [
    {
      id: 1,
      text: "Inspiration quote 1",
      author: "Character Name",
    },
    {
      id: 2,
      text: "Inspiration quote 2",
      author: "Character Name",
    },
    {
      id: 3,
      text: "Inspiration quote 3",
      author: "Character Name",
    },
  ];

  return (
    <section className={styles.inspirationGardenSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Inspiration Garden</h2>
        <div className={styles.quotesGrid}>
          {quotes.map((quote) => (
            <div key={quote.id} className={styles.quoteCard}>
              <p className={styles.quoteText}>"{quote.text}"</p>
              <p className={styles.quoteAuthor}>— {quote.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InspirationGarden;

