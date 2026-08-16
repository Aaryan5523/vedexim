import { useEffect, useRef, useState } from "react";

/**
 * SplitHeading
 *
 * Renders a heading whose characters rise up letter-by-letter
 * the moment the heading or its parent section enters the viewport.
 *
 * Props:
 *   tag          – HTML element to render ("h1" | "h2" | "h3" | …)  default "h2"
 *   lines        – array of { text, italic? } objects per line
 *   visibleClass – optional CSS class on parent section (e.g. "is-visible", "products-visible")
 *   baseDelay    – ms before first char animates              default 0
 *   charDelay    – ms between each character                  default 35
 *   lineGap      – extra ms delay added per new line          default 60
 *   className    – extra class(es) on the wrapper element
 */
export default function SplitHeading({
  tag: Tag = "h2",
  lines = [],
  visibleClass,
  baseDelay = 0,
  charDelay = 35,
  lineGap = 60,
  className = "",
}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 1. Direct IntersectionObserver on the heading element
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);

    // 2. Also listen for parent section visibleClass if specified
    if (visibleClass) {
      const section =
        el.closest("section") || el.closest("[data-section]") || el.parentElement;

      if (section && section.classList.contains(visibleClass)) {
        setActive(true);
        observer.disconnect();
      } else if (section) {
        const mo = new MutationObserver(() => {
          if (section.classList.contains(visibleClass)) {
            setActive(true);
            mo.disconnect();
            observer.disconnect();
          }
        });
        mo.observe(section, { attributes: true, attributeFilter: ["class"] });

        return () => {
          observer.disconnect();
          mo.disconnect();
        };
      }
    }

    return () => observer.disconnect();
  }, [visibleClass]);

  let globalIndex = 0;

  return (
    <Tag ref={ref} className={`split-heading ${className}`}>
      {lines.map((line, li) => {
        const chars = [...line.text];
        const lineStartIndex = globalIndex;
        globalIndex += chars.length;

        const lineContent = chars.map((char, ci) => {
          const delay =
            baseDelay + (lineStartIndex + ci) * charDelay + li * lineGap;
          return (
            <span
              key={ci}
              className={`hero-char${active ? " hero-char--active" : ""}`}
              style={active ? { animationDelay: `${delay}ms` } : {}}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        });

        return (
          <span
            key={li}
            className={`hero-h1-line${line.italic ? " hero-h1-italic" : ""}`}
          >
            {lineContent}
            {li < lines.length - 1 && <br />}
          </span>
        );
      })}
    </Tag>
  );
}
