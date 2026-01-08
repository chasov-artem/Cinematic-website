import { useEffect, useRef } from "react";
import {
  fadeInOnScroll,
  parallaxEffect,
  scaleOnScroll,
  slideInOnScroll,
  createScrollAnimation,
  cleanupScrollAnimations,
} from "../utils/scrollAnimations";

/**
 * React hook для scroll-driven анімацій
 * @param {Object} config - Конфігурація анімації
 * @returns {React.RefObject} - Ref для елемента
 */
export const useScrollAnimation = (config = {}) => {
  const elementRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const {
      type = "fadeIn", // 'fadeIn' | 'parallax' | 'scale' | 'slideIn' | 'custom'
      options = {},
    } = config;

    let animation;

    switch (type) {
      case "fadeIn":
        animation = fadeInOnScroll(elementRef.current, options);
        break;
      case "parallax":
        animation = parallaxEffect(elementRef.current, options);
        break;
      case "scale":
        animation = scaleOnScroll(elementRef.current, options);
        break;
      case "slideIn":
        animation = slideInOnScroll(elementRef.current, options);
        break;
      case "custom":
        animation = createScrollAnimation(elementRef.current, options);
        break;
      default:
        animation = fadeInOnScroll(elementRef.current, options);
    }

    animationRef.current = animation;

    return () => {
      if (animationRef.current) {
        animationRef.current.kill?.();
      }
    };
  }, [config]);

  return elementRef;
};

/**
 * Hook для множинних scroll анімацій
 */
export const useMultipleScrollAnimations = (animations = []) => {
  const refs = animations.map(() => useRef(null));
  const animationsRef = useRef([]);

  useEffect(() => {
    animations.forEach((config, index) => {
      if (!refs[index].current) return;

      const {
        type = "fadeIn",
        options = {},
      } = config;

      let animation;

      switch (type) {
        case "fadeIn":
          animation = fadeInOnScroll(refs[index].current, options);
          break;
        case "parallax":
          animation = parallaxEffect(refs[index].current, options);
          break;
        case "scale":
          animation = scaleOnScroll(refs[index].current, options);
          break;
        case "slideIn":
          animation = slideInOnScroll(refs[index].current, options);
          break;
        case "custom":
          animation = createScrollAnimation(refs[index].current, options);
          break;
        default:
          animation = fadeInOnScroll(refs[index].current, options);
      }

      animationsRef.current.push(animation);
    });

    return () => {
      animationsRef.current.forEach((anim) => {
        if (anim) {
          anim.kill?.();
        }
      });
      animationsRef.current = [];
    };
  }, [animations]);

  return refs;
};
