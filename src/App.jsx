import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/globals.css";
import { MenuProvider } from "./contexts/MenuContext";
import GlobalScene from "./components/GlobalScene/GlobalScene";
import HeroSection from "./components/HeroSection/HeroSection";
import WelcomeSection from "./components/WelcomeSection/WelcomeSection";
import OriginStories from "./components/OriginStories/OriginStories";
import Library from "./components/Library/Library";
import InspirationGarden from "./components/InspirationGarden/InspirationGarden";
import SpriteZero from "./components/SpriteZero/SpriteZero";
import Quiz from "./components/Quiz/Quiz";
import Footer from "./components/Footer/Footer";
import MenuModal from "./components/MenuModal/MenuModal";
import { useMenu } from "./contexts/MenuContext";
import { initLenis } from "./utils/lenisSetup";

function AppContent() {
  const { isMenuOpen, closeMenu } = useMenu();
  const lenisRef = useRef(null);

  // Ініціалізація Lenis smooth scroll
  useEffect(() => {
    lenisRef.current = initLenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
    });

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

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
      {/* Global Three.js Scene Background */}
      <GlobalScene />

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

      {/* Menu Modal */}
      <MenuModal isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  );
}

function App() {
  return (
    <MenuProvider>
      <AppContent />
    </MenuProvider>
  );
}

export default App;
