import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "CERAMICS · SURFACES · SANITARYWARE",
    titleLine1: "Crafted",
    titleLine2: "for living.",
    description:
      "Premium ceramic surfaces and timeless forms, created with precision and designed for contemporary spaces.",
    buttonText: "Explore Collection",
    buttonLink: "/collections",
  },
  {
    image:
      "https://archello.s3.eu-central-1.amazonaws.com/images/2024/11/28/ceramiche-refin-s.p.a.-etherea-ceramic-wall-tiles-archello.1732787201.209.jpg",
    eyebrow: "MARBLE · STONE · PORCELAIN",
    titleLine1: "Timeless",
    titleLine2: "by design.",
    description:
      "Refined textures and natural depth inspired by architectural elegance, crafted to elevate living spaces.",
    buttonText: "View Products",
    buttonLink: "/products",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "PRECISION · TEXTURE · FORM",
    titleLine1: "Surfaces",
    titleLine2: "with character.",
    description:
      "Uncompromising quality paired with modern minimalism, shaping atmospheres that endure.",
    buttonText: "Our Process",
    buttonLink: "/process",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "CONTEMPORARY · MINIMAL · REFINED",
    titleLine1: "Defined",
    titleLine2: "by elegance.",
    description:
      "Transforming residential and commercial environments into enduring works of architectural art.",
    buttonText: "Discover More",
    buttonLink: "/about",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "GLOBAL EXPORTS · INDIA TO WORLD",
    titleLine1: "Created",
    titleLine2: "for perfection.",
    description:
      "Exporting world-class ceramic craftsmanship and surfaces engineered for the finest spaces worldwide.",
    buttonText: "Get in Touch",
    buttonLink: "/contact",
  },
];

function SplitText({ text, baseDelay = 0 }) {
  return (
    <>
      {[...text].map((char, index) => (
        <span
          key={index}
          className="hero-char"
          style={{
            animationDelay: `${baseDelay + index * 35}ms`,
          }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const heroRef = useRef(null);
  const progressRef = useRef(0);
  const rafRef = useRef(null);

  /* =========================================
     AUTO SLIDER
  ========================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (previous) => (previous + 1) % heroSlides.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  /* =========================================
     LENIS SCROLL
  ========================================= */

  useEffect(() => {
    const updateFromScroll = (scrollValue) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const hero = heroRef.current;

        if (!hero) return;

        /*
         * Use the actual document position instead of relying
         * on the browser scroll event. This works with Lenis.
         */

        const heroTop =
          hero.getBoundingClientRect().top +
          scrollValue;

        const distance = Math.max(
          hero.offsetHeight - window.innerHeight,
          window.innerHeight
        );

        const travelled = Math.max(
          0,
          scrollValue - heroTop
        );

        const nextProgress = Math.min(
          Math.max(travelled / distance, 0),
          1
        );

        /*
         * Avoid unnecessary React renders.
         */

        if (
          Math.abs(
            nextProgress - progressRef.current
          ) > 0.001
        ) {
          progressRef.current = nextProgress;
          setProgress(nextProgress);
        }
      });
    };

    const handleLenisScroll = (event) => {
      updateFromScroll(event.scroll);
    };

    /*
     * Lenis is created by SmoothScroll.
     * If it is already available, subscribe immediately.
     * Otherwise wait briefly until SmoothScroll mounts.
     */

    let subscribed = false;
    let retryTimer = null;

    const subscribe = () => {
      if (
        subscribed ||
        !window.lenis
      ) {
        return;
      }

      window.lenis.on(
        "scroll",
        handleLenisScroll
      );

      subscribed = true;

      updateFromScroll(
        window.lenis.scroll || 0
      );
    };

    subscribe();

    if (!subscribed) {
      retryTimer = setInterval(() => {
        subscribe();

        if (subscribed) {
          clearInterval(retryTimer);
          retryTimer = null;
        }
      }, 50);
    }

    /*
     * Native fallback.
     * This also makes the animation work if Lenis
     * is temporarily unavailable.
     */

    const nativeScroll = () => {
      if (window.lenis) return;

      updateFromScroll(
        window.scrollY || 0
      );
    };

    window.addEventListener(
      "scroll",
      nativeScroll,
      { passive: true }
    );

    const resize = () => {
      updateFromScroll(
        window.lenis?.scroll ||
        window.scrollY ||
        0
      );
    };

    window.addEventListener(
      "resize",
      resize
    );

    resize();

    return () => {
      if (retryTimer) {
        clearInterval(retryTimer);
      }

      if (
        subscribed &&
        window.lenis
      ) {
        window.lenis.off(
          "scroll",
          handleLenisScroll
        );
      }

      window.removeEventListener(
        "scroll",
        nativeScroll
      );

      window.removeEventListener(
        "resize",
        resize
      );

      if (rafRef.current) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    };
  }, []);

  const slide = heroSlides[currentSlide];

  /* =========================================
     PREMIUM EASING
  ========================================= */

  const eased =
    progress * progress * (3 - 2 * progress);

  /*
   * Background depth.
   */

  const backgroundX = eased * -4;
  const backgroundScale = 1 + eased * 0.035;

  /*
   * Content exits toward the LEFT.
   */

  const contentX = eased * -110;
  const contentOpacity = Math.max(
    0,
    1 - eased * 1.15
  );

  /*
   * Curtain enters from RIGHT -> LEFT.
   */

  const curtainX = 100 - eased * 100;

  /*
   * Footer exits subtly.
   */

  const footerY = eased * 24;
  const footerOpacity = Math.max(
    0,
    1 - eased * 1.2
  );

  return (
    <section
      ref={heroRef}
      className="hero"
      id="home"
    >
      <div className="hero-stage">

        {/* =========================================
            BACKGROUND
        ========================================= */}

        <div
          className="hero-background"
          style={{
            transform: `
              translate3d(${backgroundX}%, 0, 0)
              scale(${backgroundScale})
            `,
          }}
        >
          {heroSlides.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={`VED EXIM Ceramic Surface ${index + 1}`}
              className={
                index === currentSlide
                  ? "active"
                  : ""
              }
              loading={
                index === 0
                  ? "eager"
                  : "lazy"
              }
            />
          ))}
        </div>

        {/* OVERLAY */}

        <div className="hero-overlay" />

        {/* =========================================
            CONTENT
        ========================================= */}

        <div
          className="hero-content"
          key={currentSlide}
          style={{
            transform: `
              translate3d(
                ${contentX}px,
                -50%,
                0
              )
            `,
            opacity: contentOpacity,
          }}
        >
          <p className="hero-eyebrow">
            {slide.eyebrow}
          </p>

          <h1 className="hero-title">
            <span>
              <SplitText
                text={slide.titleLine1}
                baseDelay={100}
              />
            </span>

            <br />

            <span className="hero-italic">
              <SplitText
                text={slide.titleLine2}
                baseDelay={300}
              />
            </span>
          </h1>

          <p className="hero-description">
            {slide.description}
          </p>

          {slide.buttonLink.startsWith("#") ? (
            <a
              href={slide.buttonLink}
              className="hero-button"
            >
              {slide.buttonText}
              <span>↗</span>
            </a>
          ) : (
            <Link
              to={slide.buttonLink}
              className="hero-button"
            >
              {slide.buttonText}
              <span>↗</span>
            </Link>
          )}
        </div>

        {/* =========================================
            FOOTER
        ========================================= */}

        <div
          className="hero-footer"
          style={{
            opacity: footerOpacity,
            transform: `
              translate3d(0, ${footerY}px, 0)
            `,
          }}
        >
          <span>VED EXIM</span>

          <div className="hero-scroll">
            <span>
              0{currentSlide + 1} / 0
              {heroSlides.length}
            </span>

            <div className="scroll-line" />
          </div>

          <span>EST. 1998</span>
        </div>

        {/* =========================================
            HORIZONTAL CURTAIN
        ========================================= */}

        <div
          className="hero-curtain"
          style={{
            transform: `
              translate3d(
                ${curtainX}%,
                0,
                0
              )
            `,
          }}
          aria-hidden="true"
        >
          <div className="hero-curtain-line" />

          <span>
            VED EXIM · SURFACES
          </span>
        </div>

      </div>
    </section>
  );
}

export default Hero;
