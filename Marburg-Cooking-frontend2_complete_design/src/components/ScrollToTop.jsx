import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    let start = window.scrollY;
    let progress = 0;
    const duration = 350; // Animation 0,35 Sekunden

    function easeOutQuad(t) {
      return t * (2 - t);
    }

    function animateScroll(timestamp) {
      if (!progress) progress = timestamp;

      const elapsed = timestamp - progress;
      const percent = Math.min(elapsed / duration, 1);

      const eased = easeOutQuad(percent);
      const newY = start * (1 - eased);

      window.scrollTo(0, newY);

      if (percent < 1) requestAnimationFrame(animateScroll);
    }

    requestAnimationFrame(animateScroll);
  }, [pathname]);

  return null;
}
