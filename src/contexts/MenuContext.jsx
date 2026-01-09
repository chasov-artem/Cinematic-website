import { createContext, useContext, useState, useCallback } from "react";

const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Відстежуємо переглянутий контент для кожної секції
  const [completedSections, setCompletedSections] = useState({
    hero: true, // HeroSection завжди вважається відвіданою
    welcome: false,
    "origin-stories": false,
    "inspiration-garden": false,
    "sprite-zero": false,
    library: false,
    quiz: false,
    footer: false,
  });

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  // Функція для оновлення стану переглянутого контенту
  const markSectionCompleted = useCallback((sectionId, isCompleted) => {
    setCompletedSections((prev) => ({
      ...prev,
      [sectionId]: isCompleted,
    }));
  }, []);

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen,
        openMenu,
        closeMenu,
        completedSections,
        markSectionCompleted,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within MenuProvider");
  }
  return context;
};
