import { useEffect, useState } from "react";
import "./WhatsAppButton.css";

function WhatsAppButton() {
  const phoneNumber = "916353992729";

  const message = encodeURIComponent(
    "Hello Ved Exim, I would like to know more about your ceramic products."
  );

  const whatsappUrl =
    `https://wa.me/${phoneNumber}?text=${message}`;

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkBackground = () => {
      const button = document.querySelector(
        ".whatsapp-button"
      );

      if (!button) return;

      const rect =
        button.getBoundingClientRect();

      /*
        Temporarily allow element underneath
        the WhatsApp button to be detected.
      */

      const oldPointerEvents =
        button.style.pointerEvents;

      button.style.pointerEvents = "none";

      const element = document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );

      button.style.pointerEvents =
        oldPointerEvents;

      if (!element) return;

      /*
        Find the actual section underneath.
      */

      let current = element;

      let backgroundColor =
        "rgb(243, 240, 234)";

      while (
        current &&
        current !== document.body
      ) {
        const style =
          window.getComputedStyle(current);

        const bg =
          style.backgroundColor;

        /*
          Ignore transparent backgrounds
          and continue checking the parent.
        */

        if (
          bg &&
          bg !== "transparent" &&
          bg !== "rgba(0, 0, 0, 0)"
        ) {
          backgroundColor = bg;
          break;
        }

        current = current.parentElement;
      }

      /*
        Convert RGB to brightness.
      */

      const rgb =
        backgroundColor.match(/\d+/g);

      if (!rgb || rgb.length < 3) {
        return;
      }

      const r = Number(rgb[0]);
      const g = Number(rgb[1]);
      const b = Number(rgb[2]);

      const brightness =
        (r * 299 +
          g * 587 +
          b * 114) /
        1000;

      /*
        DARK SCREEN
        → WHITE BUTTON

        LIGHT SCREEN
        → BLACK BUTTON
      */

      setIsDark(brightness < 140);
    };

    window.addEventListener(
      "scroll",
      checkBackground,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      checkBackground
    );

    /*
      Check after page loads.
    */

    checkBackground();

    /*
      Check again after images/content load.
    */

    const timer = setTimeout(
      checkBackground,
      500
    );

    return () => {
      window.removeEventListener(
        "scroll",
        checkBackground
      );

      window.removeEventListener(
        "resize",
        checkBackground
      );

      clearTimeout(timer);
    };
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-button ${
        isDark
          ? "dark-mode"
          : "light-mode"
      }`}
      aria-label="Chat with Ved Exim on WhatsApp"
    >

      {/* POPUP */}

      <span className="whatsapp-tooltip">
        Chat with Ved Exim
      </span>


      {/* WHATSAPP ICON */}

      <span className="whatsapp-icon">

        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
        >

          <path
            fill="currentColor"
            d="M19.11 17.31c-.29-.15-1.71-.84-1.97-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.21-.45-2.3-1.43-.85-.76-1.43-1.69-1.6-1.98-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.55-.88-2.13-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.49.07-.74.36-.25.29-.98.96-.98 2.34s1 2.71 1.14 2.9c.15.19 1.97 3.01 4.77 4.22.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.71-.7 1.95-1.38.24-.68.24-1.27.17-1.38-.07-.12-.26-.19-.55-.34z"
          />

          <path
            fill="currentColor"
            d="M16.02 3.2a12.75 12.75 0 0 0-10.9 19.38L3.5 28.8l6.36-1.59A12.76 12.76 0 1 0 16.02 3.2zm0 23.3c-1.98 0-3.92-.53-5.62-1.54l-.4-.24-3.77.94 1-3.67-.26-.41a10.74 10.74 0 1 1 9.05 4.92z"
          />

        </svg>

      </span>

    </a>
  );
}

export default WhatsAppButton;