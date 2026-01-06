import "./styles/globals.css";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <div className="app">
      {/* Hero Section */}
      <HeroSection />

      {/* Tutorial Section */}
      <section className="tutorial-section">
        <h2>Tutorial</h2>
      </section>

      {/* Origin Stories Section */}
      <section className="stories-section">
        <h2>Origin Stories</h2>
      </section>

      {/* Library Section */}
      <section className="library-section">
        <h2>The Library</h2>
      </section>

      {/* Product Showcase Section */}
      <section className="product-section">
        <h2>Product Showcase</h2>
      </section>

      {/* Quiz Section */}
      <section className="quiz-section">
        <h2>Quiz</h2>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default App;
