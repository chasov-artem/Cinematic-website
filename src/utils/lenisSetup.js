import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  lenis.on("scroll", ScrollTrigger.update);

  let rafId = null;
  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  rafId = requestAnimationFrame(raf);

  const handleResize = () => {
    ScrollTrigger.refresh();
  };

  window.addEventListener("resize", handleResize);

  const originalDestroy = lenis.destroy.bind(lenis);

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
