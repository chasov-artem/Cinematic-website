import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Ініціалізує Lenis smooth scroll та інтегрує з GSAP ScrollTrigger
 * @param {Object} options - Опції для Lenis
 * @returns {Lenis} - Екземпляр Lenis
 */
export const initLenis = (options = {}) => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    ...options,
  });

  // Інтеграція з GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // Оновлення ScrollTrigger при скролі через RAF
  let rafId = null;
  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  rafId = requestAnimationFrame(raf);

  // Оновлення ScrollTrigger при зміні розміру вікна
  const handleResize = () => {
    ScrollTrigger.refresh();
  };

  window.addEventListener("resize", handleResize);

  // Зберігаємо оригінальну функцію destroy
  const originalDestroy = lenis.destroy.bind(lenis);

  // Перевизначаємо destroy для очищення
  lenis.destroy = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    window.removeEventListener("resize", handleResize);
    originalDestroy();
  };

  return lenis;
};
