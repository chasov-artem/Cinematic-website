import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Реєструємо ScrollTrigger плагін
gsap.registerPlugin(ScrollTrigger);

/**
 * Створює scroll-driven анімацію для елемента
 * @param {HTMLElement|string} element - Елемент або селектор
 * @param {Object} options - Опції анімації
 * @returns {gsap.core.Timeline} - GSAP timeline
 */
export const createScrollAnimation = (element, options = {}) => {
  const {
    start = "top 80%",
    end = "top 20%",
    toggleActions = "play none none reverse",
    animation = {},
    markers = false,
  } = options;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      end,
      toggleActions,
      markers, // Для дебагу
    },
  });

  // Застосовуємо анімацію
  if (Object.keys(animation).length > 0) {
    timeline.to(element, animation);
  }

  return timeline;
};

/**
 * Створює fade-in анімацію при скролі
 */
export const fadeInOnScroll = (element, options = {}) => {
  const {
    start = "top 85%",
    duration = 1,
    ease = "power2.out",
    opacity = 1,
    y = 0,
  } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: y || 50,
    },
    {
      opacity,
      y: 0,
      duration,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
};

/**
 * Створює parallax ефект
 */
export const parallaxEffect = (element, options = {}) => {
  const {
    speed = 0.5,
    start = "top bottom",
    end = "bottom top",
  } = options;

  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
    },
  });
};

/**
 * Створює scale анімацію при скролі
 */
export const scaleOnScroll = (element, options = {}) => {
  const {
    start = "top 80%",
    scale = 1,
    duration = 1,
    ease = "power2.out",
  } = options;

  return gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale,
      opacity: 1,
      duration,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
};

/**
 * Створює анімацію появи зліва/справа
 */
export const slideInOnScroll = (element, options = {}) => {
  const {
    direction = "left", // 'left' | 'right' | 'top' | 'bottom'
    start = "top 85%",
    duration = 1,
    ease = "power2.out",
    distance = 100,
  } = options;

  const directions = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    top: { x: 0, y: -distance },
    bottom: { x: 0, y: distance },
  };

  const { x, y } = directions[direction] || directions.left;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x,
      y,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse",
      },
    }
  );
};

/**
 * Очищає всі ScrollTrigger анімації
 */
export const cleanupScrollAnimations = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

/**
 * Оновлює ScrollTrigger (викликати після зміни розміру вікна)
 */
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};
