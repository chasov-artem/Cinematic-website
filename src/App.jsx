import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/globals.css";
import HeroSection from "./components/HeroSection/HeroSection";
import WelcomeSection from "./components/WelcomeSection/WelcomeSection";
import OriginStories from "./components/OriginStories/OriginStories";
import Library from "./components/Library/Library";
import InspirationGarden from "./components/InspirationGarden/InspirationGarden";
import SpriteZero from "./components/SpriteZero/SpriteZero";
import Quiz from "./components/Quiz/Quiz";
import Footer from "./components/Footer/Footer";

function App() {
  // Оновлюємо ScrollTrigger при зміні розміру вікна
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app">
      {/* Hero Section */}
      <HeroSection />

      {/* Welcome Section */}
      <WelcomeSection />

      {/* Origin Stories Section */}
      <OriginStories />

      {/* Inspiration Garden Section */}
      <InspirationGarden />

      {/* Sprite Zero Sugar Section */}
      <SpriteZero />

      {/* Library Section */}
      <Library />

      {/* Quiz Section */}
      <Quiz />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
