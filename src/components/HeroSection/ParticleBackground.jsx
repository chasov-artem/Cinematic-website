import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ParticleBackground.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Генеративна анімація з частинками для заміни 3D елемента
 * Створює кінематографічний ефект з абстрактними частинками
 */
function ParticleBackground({ sectionRef }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef?.current;
    
    if (!canvas || !section) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    // Налаштування розмірів canvas
    let dpr = window.devicePixelRatio || 1;
    const resizeCanvas = () => {
      // Отримуємо розміри секції
      const sectionRect = section.getBoundingClientRect();
      const width = sectionRect.width || window.innerWidth;
      const height = sectionRect.height || window.innerHeight;
      
      // Оновлюємо devicePixelRatio
      dpr = window.devicePixelRatio || 1;
      
      // Встановлюємо CSS розміри (логічні пікселі)
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      
      // Встановлюємо розміри canvas (фізичні пікселі для retina)
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // Масштабуємо context для retina дисплеїв
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Після зміни розмірів, перестворюємо частинки
      const isMobile = width < 768;
      const baseParticleCount = Math.floor((width * height) / 15000);
      const particleCount = isMobile
        ? Math.max(Math.min(baseParticleCount, 40), 20)
        : Math.max(Math.min(baseParticleCount, 100), 50);
      
      // Оновлюємо позиції існуючих частинок або перестворюємо їх
      if (particlesRef.current.length !== particleCount || 
          canvas.width !== width * dpr || 
          canvas.height !== height * dpr) {
        particlesRef.current = [];
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push(new Particle(width, height));
        }
      } else {
        // Оновлюємо розміри canvas та позиції частинок
        particlesRef.current.forEach((particle) => {
          particle.updateCanvasSize(width, height);
          // Якщо частинка вийшла за межі, переміщуємо її
          if (particle.x > width) particle.x = Math.random() * width;
          if (particle.y > height) particle.y = Math.random() * height;
        });
      }
      
    };
    
    // Використовуємо requestAnimationFrame для забезпечення, що DOM готовий
    requestAnimationFrame(() => {
      resizeCanvas();
      // Також перевіряємо після короткої затримки на випадок, якщо секція ще не має фінальних розмірів
      setTimeout(resizeCanvas, 100);
    });
    
    window.addEventListener("resize", resizeCanvas);

    // Налаштування ScrollTrigger для паралакс ефекту
    let scrollTriggerInstance = null;
    if (sectionRef.current) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: false,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
        },
      });
    }

    // Клас частинки
    class Particle {
      constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.reset();
      }

      reset() {
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.size = Math.random() * 2 + 1.5; // Збільшуємо розмір для кращої видимості (1.5-3.5)
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.4 + 0.4; // Збільшуємо базову прозорість (0.4-0.8)
        this.hue = 120 + Math.random() * 30; // Зелений відтінок (99ff88)
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }
      
      updateCanvasSize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
      }

      update(canvasWidth, canvasHeight) {
        // Рух частинки з паралакс ефектом
        this.x += this.speedX;
        this.y += this.speedY + scrollProgressRef.current * 0.3; // Паралакс ефект від скролу

        // Пульсація прозорості
        this.pulsePhase += this.pulseSpeed;
        this.opacity = 0.3 + Math.sin(this.pulsePhase) * 0.3; // Мінімум 0.3, максимум 0.6

        // Оновлюємо розміри canvas
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        // Перевірка меж canvas - відскок від країв
        if (this.x < 0 || this.x > this.canvasWidth) {
          this.speedX *= -1;
          this.x = Math.max(0, Math.min(this.canvasWidth, this.x));
        }
        if (this.y < 0 || this.y > this.canvasHeight) {
          this.speedY *= -1;
          this.y = Math.max(0, Math.min(this.canvasHeight, this.y));
        }
      }

      draw(ctx) {
        // Додаємо світіння
        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, ${this.opacity * 0.8})`;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`;
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Створюємо зв'язки між частинками
    class Connection {
      constructor(particle1, particle2) {
        this.p1 = particle1;
        this.p2 = particle2;
        this.maxDistance = 150;
      }

      draw(ctx) {
        const dx = this.p1.x - this.p2.x;
        const dy = this.p1.y - this.p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.maxDistance) {
          const opacity = (1 - distance / this.maxDistance) * 0.2;
          ctx.beginPath();
          ctx.moveTo(this.p1.x, this.p1.y);
          ctx.lineTo(this.p2.x, this.p2.y);
          ctx.strokeStyle = `rgba(153, 255, 136, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Функція створення частинок
    const createParticles = () => {
      const isMobile = window.innerWidth < 768;
      const baseParticleCount = Math.floor((canvas.width * canvas.height) / 15000);
      // Забезпечуємо мінімальну кількість частинок для видимості
      const particleCount = isMobile
        ? Math.max(Math.min(baseParticleCount, 40), 20) // Мінімум 20 на мобільних
        : Math.max(Math.min(baseParticleCount, 100), 50); // Мінімум 50 на десктопі

      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(canvas.width, canvas.height));
      }
      
    };
    
    // Створюємо частинки після встановлення розмірів canvas
    createParticles();

    // Функція анімації
    const animate = (currentTime = 0) => {
      // Отримуємо актуальні розміри для рендерингу (логічні пікселі)
      const canvasWidth = canvas.style.width ? parseFloat(canvas.style.width) : window.innerWidth;
      const canvasHeight = canvas.style.height ? parseFloat(canvas.style.height) : window.innerHeight;
      
      // Очищаємо canvas (використовуємо логічні розміри, оскільки context вже масштабований)
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      // Оновлюємо частинки
      particlesRef.current.forEach((particle) => {
        particle.update(canvasWidth, canvasHeight);
      });

      // Спочатку малюємо зв'язки
      for (let i = 0; i < particlesRef.current.length; i++) {
        // Перевіряємо зв'язки тільки з наступними 10 частинками для продуктивності
        const maxConnections = Math.min(i + 10, particlesRef.current.length);
        for (let j = i + 1; j < maxConnections; j++) {
          const connection = new Connection(
            particlesRef.current[i],
            particlesRef.current[j]
          );
          connection.draw(ctx);
        }
      }

      // Потім малюємо частинки поверх зв'язків
      particlesRef.current.forEach((particle) => {
        particle.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Запускаємо анімацію
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      // Очищаємо canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.particleCanvas}
      aria-hidden="true"
    />
  );
}

export default ParticleBackground;