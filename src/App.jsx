import "./styles/globals.css";
import HeroSection from "./components/HeroSection/HeroSection";
import Tutorial from "./components/Tutorial/Tutorial";
import OriginStories from "./components/OriginStories/OriginStories";
import Library from "./components/Library/Library";

function App() {
  return (
    <div className="app">
      {/* Hero Section */}
      <HeroSection />

      {/* Tutorial Section */}
      <Tutorial />

      {/* Origin Stories Section */}
      <OriginStories />

      {/* Library Section */}
      <Library />

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
