import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;

    /*
     * Send Lenis scroll position to the rest of the site.
     * Hero uses this event for its scroll animation.
     */
    const handleLenisScroll = (event) => {
      window.dispatchEvent(
        new CustomEvent("vedexim-lenis-scroll", {
          detail: {
            scroll: event.scroll,
            animatedScroll: event.animatedScroll,
            progress: event.progress,
            velocity: event.velocity,
            direction: event.direction,
          },
        })
      );
    };

    lenis.on("scroll", handleLenisScroll);

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    /*
     * Stop/start Lenis when mobile menu opens/closes.
     */
    const menuObserver = new MutationObserver(() => {
      if (document.body.classList.contains("menu-open")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    menuObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    /*
     * Smooth hash navigation.
     */
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      if (
        href &&
        href.startsWith("#") &&
        href.length > 1
      ) {
        const targetEl =
          document.querySelector(href);

        if (targetEl) {
          e.preventDefault();

          lenis.scrollTo(targetEl, {
            offset: -70,
            duration: 1.3,
          });
        }
      }
    };

    document.addEventListener(
      "click",
      handleAnchorClick
    );

    return () => {
      cancelAnimationFrame(rafId);

      lenis.off(
        "scroll",
        handleLenisScroll
      );

      menuObserver.disconnect();

      document.removeEventListener(
        "click",
        handleAnchorClick
      );

      lenis.destroy();

      window.lenis = null;
    };
  }, []);

  /*
   * Handle route changes.
   */
  useEffect(() => {
    if (!window.lenis) return;

    if (location.hash) {
      const targetEl =
        document.querySelector(location.hash);

      if (targetEl) {
        setTimeout(() => {
          window.lenis?.scrollTo(
            targetEl,
            {
              offset: -70,
              duration: 1.2,
            }
          );
        }, 80);

        return;
      }
    }

    window.lenis.scrollTo(0, {
      immediate: true,
    });
  }, [location.pathname, location.hash]);

  return null;
}