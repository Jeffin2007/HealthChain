// src/components/BackgroundEffect.jsx
import { useEffect } from "react";

/**
 * Global background effect: listens to mousemove and writes CSS vars --mx/--my
 * These values are the mouse delta from center (px). CSS consumes them for parallax.
 */
export default function BackgroundEffect() {
  useEffect(() => {
    let raf = null;

    function handleMove(e) {
      // Get viewport center
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      const x = e.clientX - cx; // negative left, positive right
      const y = e.clientY - cy; // negative up, positive down

      // throttle via rAF
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mx", `${x}px`);
        document.documentElement.style.setProperty("--my", `${y}px`);
      });
    }

    // touch support (use touch point)
    function handleTouch(e) {
      if (!e.touches || e.touches.length === 0) return;
      handleMove(e.touches[0]);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null; // no UI
}
