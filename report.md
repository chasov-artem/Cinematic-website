# Project Report: Zero Limits - Immersive Cinematic UI

## Live Deployment

**Live URL:** [https://cinematic-website-chi.vercel.app/](https://cinematic-website-chi.vercel.app/)

---

## Video Walkthrough

**Google Drive Link:** https://drive.google.com/file/d/1gEpBzFMe1ErxV0E_D_6tRlPA1NltyEUf/view?usp=sharing

---

## Project Overview

Цей проект є реалізацією кінематографічного веб-досвіду для "The Hall of Zero Limits" - співпраці між Sprite Zero Sugar та Marvel's Black Panther: Wakanda Forever. Основна мета - відтворити scroll-driven інтерактивний інтерфейс з плавними анімаціями та імерсивним досвідом.

---

## Technical Stack

- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Animation Libraries:**
  - GSAP 3.14.2 з ScrollTrigger для scroll-driven анімацій
  - Lenis 1.3.17 для smooth scrolling
- **3D Graphics:**
  - React Three Fiber 9.5.0
  - Three.js 0.182.0
  - @react-three/drei 10.7.7
- **Styling:** CSS Modules
- **Icons:** React Icons 5.5.0

---

## Key Technical Decisions

### 1. Заміна 3D моделі

**Проблема:** Оригінальний сайт використовує складну 3D анімацію, яку не потрібно було реплікувати.

**Рішення:** Створено абстрактну Three.js сцену з:

- Обертаючою сферою з MeshDistortMaterial (зелений колір #99ff88)
- 200 частинками з плавними рухами
- Scroll-driven обертанням сфери
- Паралакс ефектами для глибини

**Чому:** Це підтримує імерсивну атмосферу оригіналу, але з меншою складністю та кращою продуктивністю.

### 2. Scroll-driven Animations

**Підхід:** Використання GSAP ScrollTrigger з інтеграцією Lenis smooth scroll.

**Особливості:**

- Pinning секцій для створення "full-screen" ефекту
- Паралакс ефекти через RAF (requestAnimationFrame) для плавності
- Word-by-word text reveal анімації
- Послідовні fade/move/scale transitions

**Чому:** ScrollTrigger надає потужний контроль над анімаціями на основі скролу, а Lenis забезпечує плавний, кінематографічний скрол.

### 3. Component Architecture

**Структура:**

- Модульні компоненти для кожної секції
- Shared компоненти (NavButtonLeft, NavButtonRight, ThreeSphereIcon)
- Context API для глобального стану (MenuContext)
- Утиліти для перевикористання (parallaxEffects, sectionScrollAnimations)

**Чому:** Модульність спрощує підтримку та дозволяє легко додавати нові секції.

### 4. State Management

**Підхід:** React Context для меню та відстеження прогресу секцій.

**Функціонал:**

- Відстеження переглянутих секцій
- Відкриття/закриття меню
- Маркування секцій як завершених

**Чому:** Легкий state management без необхідності Redux для цього проекту.

---

## Project Structure

```
src/
├── components/          # React компоненти
│   ├── HeroSection/
│   ├── WelcomeSection/
│   ├── OriginStories/
│   ├── InspirationGarden/
│   ├── SpriteZero/
│   ├── Library/
│   ├── Quiz/
│   ├── Footer/
│   ├── GlobalScene/     # Three.js фонова сцена
│   └── MenuModal/
├── contexts/            # React Context
│   └── MenuContext.jsx
├── hooks/               # Custom hooks
│   └── useScrollAnimation.js
├── utils/               # Утиліти
│   ├── lenisSetup.js
│   ├── parallaxEffects.js
│   └── sectionScrollAnimations.js
└── styles/              # Глобальні стилі
    ├── globals.css
    └── variables.css
```

---

## Key Features Implemented

### 1. Scroll-driven Sections

- 8 повноекранних секцій з pinning
- Плавні переходи між секціями
- Паралакс ефекти для глибини

### 2. Interactive Modals

- QuoteModal для цитат персонажів
- VideoModal для відео історій
- QuizModal для інтерактивної вікторини
- MenuModal для навігації

### 3. Progress Tracking

- Відстеження переглянутих секцій
- Візуальні індикатори прогресу
- Автоматичне маркування завершених секцій

### 4. Smooth Animations

- Word-by-word text reveals
- Fade/move/scale transitions
- Parallax effects
- Button hover states

---

## Performance Optimizations

1. **Lazy Loading:** Зображення з `loading="lazy"`
2. **RAF для анімацій:** Використання requestAnimationFrame для плавності
3. **Cleanup:** Правильне очищення ScrollTrigger та event listeners
4. **CSS Modules:** Scoped стилі для кращої продуктивності
5. **Three.js оптимізація:** Обмежена кількість частинок та оптимізовані матеріали

---

## Challenges & Solutions

### Challenge 1: Синхронізація Lenis з ScrollTrigger

**Рішення:** Інтеграція через `lenis.on("scroll", ScrollTrigger.update)` та RAF loop.

### Challenge 2: Паралакс ефекти без jank

**Рішення:** Використання RAF з дебаунсингом для оновлень transform.

### Challenge 3: Word-by-word text animation

**Рішення:** Розбиття тексту на слова з data-атрибутами та GSAP stagger.

### Challenge 4: Memory leaks з ScrollTrigger

**Рішення:** Правильне cleanup в useEffect з kill() для всіх тригерів.

---

## Browser Compatibility

Проект протестовано та працює на:

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## Future Improvements

Якби було більше часу, я б додав:

1. **Шрифти:** Підключення кастомних шрифтів через @font-face або Google Fonts
2. **Accessibility:** Покращення keyboard navigation та screen reader support
3. **Mobile Optimization:** Додаткові оптимізації для мобільних пристроїв
4. **Loading States:** Skeleton screens для кращого UX
5. **Error Handling:** Обробка помилок завантаження відео/зображень
6. **Analytics:** Відстеження взаємодій користувачів

---

## Deployment

Проект задеплоєно на **Vercel** з автоматичним CI/CD через GitHub.

**Deployment URL:** [https://cinematic-website-chi.vercel.app/](https://cinematic-website-chi.vercel.app/)

---

## Conclusion

Проект успішно реалізує основні вимоги ТЗ:

- ✅ Scroll-driven анімації
- ✅ Layout та типографіка близькі до оригіналу
- ✅ Плавна продуктивність
- ✅ Імерсивна атмосфера
- ✅ Креативна заміна 3D моделі

Код написано з урахуванням best practices, модульності та підтримуваності.
