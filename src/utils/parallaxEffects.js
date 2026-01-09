import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const createParallaxEffect = (element, options = {}) => {
  const {
    speed = 0.5,
    direction = "y",
    start = "top bottom",
    end = "bottom top",
    scrub = true,
    onUpdate,
  } = options;

  const el = typeof element === "string" ? document.querySelector(element) : element;
  if (!el) {
    return () => {};
  }

  let rafId = null;
  let currentProgress = 0;

  const updateTransform = () => {
    if (!el) return;

    const progress = currentProgress;
    const translateValue = progress * 100 * speed;

    if (direction === "x") {
      gsap.set(el, { x: translateValue, force3D: true });
    } else if (direction === "y") {
      gsap.set(el, { y: translateValue, force3D: true });
    } else {
      gsap.set(el, {
        x: translateValue * 0.5,
        y: translateValue,
        force3D: true,
      });
    }

    if (onUpdate) {
      onUpdate(progress, translateValue);
    }
  };

  const scrollTrigger = ScrollTrigger.create({
    trigger: el,
    start,
    end,
    scrub: scrub ? 1 : false,
    onUpdate: (self) => {
      currentProgress = self.progress;
      
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateTransform();
          rafId = null;
        });
      }
    },
  });

  updateTransform();

  return () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    scrollTrigger.kill();
    gsap.set(el, { clearProps: "all" });
  };
};

export const createMultiParallaxEffect = (elements, options = {}) => {
  const {
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  } = options;

  const cleanups = elements.map(({ element, speed = 0.5, direction = "y" }) => {
    return createParallaxEffect(element, {
      speed,
      direction,
      start,
      end,
      scrub,
    });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
};

export const createRotationParallax = (element, options = {}) => {
  const {
    rotationSpeed = 10,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  } = options;

  const el = typeof element === "string" ? document.querySelector(element) : element;
  if (!el) return () => {};

  let rafId = null;
  let currentProgress = 0;

  const updateRotation = () => {
    if (!el) return;
    const rotation = currentProgress * rotationSpeed;
    gsap.set(el, { rotation, force3D: true });
  };

  const scrollTrigger = ScrollTrigger.create({
    trigger: el,
    start,
    end,
    scrub: scrub ? 1 : false,
    onUpdate: (self) => {
      currentProgress = self.progress;
      
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateRotation();
          rafId = null;
        });
      }
    },
  });

  updateRotation();

  return () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    scrollTrigger.kill();
    gsap.set(el, { clearProps: "all" });
  };
};

export const createScaleParallax = (element, options = {}) => {
  const {
    minScale = 0.8,
    maxScale = 1.2,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  } = options;

  const el = typeof element === "string" ? document.querySelector(element) : element;
  if (!el) return () => {};

  let rafId = null;
  let currentProgress = 0;

  const updateScale = () => {
    if (!el) return;
    const scale = minScale + (maxScale - minScale) * currentProgress;
    gsap.set(el, { scale, force3D: true });
  };

  const scrollTrigger = ScrollTrigger.create({
    trigger: el,
    start,
    end,
    scrub: scrub ? 1 : false,
    onUpdate: (self) => {
      currentProgress = self.progress;
      
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateScale();
          rafId = null;
        });
      }
    },
  });

  updateScale();

  return () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    scrollTrigger.kill();
    gsap.set(el, { clearProps: "all" });
  };
};

export const createOpacityParallax = (element, options = {}) => {
  const {
    minOpacity = 0,
    maxOpacity = 1,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  } = options;

  const el = typeof element === "string" ? document.querySelector(element) : element;
  if (!el) return () => {};

  let rafId = null;
  let currentProgress = 0;

  const updateOpacity = () => {
    if (!el) return;
    const opacity = minOpacity + (maxOpacity - minOpacity) * currentProgress;
    gsap.set(el, { opacity, force3D: true });
  };

  const scrollTrigger = ScrollTrigger.create({
    trigger: el,
    start,
    end,
    scrub: scrub ? 1 : false,
    onUpdate: (self) => {
      currentProgress = self.progress;
      
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateOpacity();
          rafId = null;
        });
      }
    },
  });

  updateOpacity();

  return () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    scrollTrigger.kill();
    gsap.set(el, { clearProps: "all" });
  };
};
