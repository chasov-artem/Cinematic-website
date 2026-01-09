import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Вимкнення зайвих warnings від React DevTools та інших інструментів
if (typeof window !== "undefined") {
  // Вимкнення overrideMethod warnings
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("overrideMethod") ||
        args[0].includes("installHook") ||
        args[0].includes("Warning:") ||
        args[0].includes("React DevTools") ||
        args[0].includes("Warning: ReactDOM.render"))
    ) {
      return;
    }
    originalError.apply(console, args);
  };

  // Вимкнення console.log в production (опціонально)
  if (import.meta.env.PROD) {
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
