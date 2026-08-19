import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CollectionsPage.css";

const collections = [
  {
    number: "01",
    name: "Marble",
    subtitle: "TIMELESS ELEGANCE",
    description:
      "Elegant marble-inspired surfaces with natural movement, refined veining and a sophisticated architectural character.",
    image: "/images/products/marble/marble-01.png",
  },
  {
    number: "02",
    name: "Stone",
    subtitle: "NATURAL CHARACTER",
    description:
      "Earth-inspired ceramic surfaces created to bring warmth, texture and a sense of permanence to contemporary interiors.",
    image: "/images/products/stone/stone-01.png",
  },
  {
    number: "03",
    name: "Terrazzo",
    subtitle: "CONTEMPORARY RHYTHM",
    description:
      "Distinctive terrazzo-inspired patterns that add visual rhythm, texture and personality to modern spaces.",
    image: "/images/products/terrazzo/terrazzo-01.png",
  },
  {
    number: "04",
    name: "Concrete",
    subtitle: "ARCHITECTURAL MINIMALISM",
    description:
      "Quiet concrete-inspired surfaces designed for understated, modern and architectural environments.",
    image: "/images/products/concrete/concrete-01.png",
  },
];

function CollectionsPage() {
  const pageRef = useRef(null);
  const progressRef = useRef(0);
  const rafRef = useRef(null);

  const [progress, setProgress] = useState(0);

  /* =========================================
     PAGE ENTRANCE
  ========================================= */

  useEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const timer = setTimeout(() => {
      page.classList.add("collections-page-visible");
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  /* =========================================
     LENIS / SCROLL TRANSITION
  ========================================= */

  useEffect(() => {
    const calculateProgress = (scrollValue) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const page = pageRef.current;

        if (!page) return;

        /*
         * Collections page begins at its own document position.
         * This keeps the effect correct when arriving from another
         * React route as well as after a fresh reload.
         */

        const pageTop =
          page.getBoundingClientRect().top + scrollValue;

        const distance = Math.max(
          window.innerHeight * 0.9,
          500
        );

        const travelled = Math.max(
          0,
          scrollValue - pageTop
        );

        const nextProgress = Math.min(
          Math.max(travelled / distance, 0),
          1
        );

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
      calculateProgress(event.scroll);
    };

    let subscribed = false;
    let retryTimer = null;

    const subscribeToLenis = () => {
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

      calculateProgress(
        window.lenis.scroll || 0
      );
    };

    subscribeToLenis();

    /*
     * SmoothScroll mounts at the same time as the route.
     * Retry briefly in case Lenis has not been created yet.
     */

    if (!subscribed) {
      retryTimer = setInterval(() => {
        subscribeToLenis();

        if (subscribed) {
          clearInterval(retryTimer);
          retryTimer = null;
        }
      }, 50);
    }

    /*
     * Native fallback if Lenis is unavailable.
     */

    const handleNativeScroll = () => {
      if (!window.lenis) {
        calculateProgress(
          window.scrollY || 0
        );
      }
    };

    const handleResize = () => {
      calculateProgress(
        window.lenis?.scroll ||
        window.scrollY ||
        0
      );
    };

    window.addEventListener(
      "scroll",
      handleNativeScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    handleResize();

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
        handleNativeScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      if (rafRef.current) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    };
  }, []);

  /* =========================================
     PREMIUM EASING
  ========================================= */

  const eased =
    progress * progress *
    (3 - 2 * progress);

  const curtainX =
    100 - eased * 100;

  const heroImageX =
    eased * -2.5;

  const heroImageScale =
    1 + eased * 0.025;

  const heroContentX =
    eased * -45;

  const heroContentOpacity =
    Math.max(
      0,
      1 - eased * 1.15
    );

  return (
    <main
      className="collections-page"
      ref={pageRef}
    >

      {/* =========================================
          HERO — CERAMIC VIDEO
      ========================================= */}

      <section className="collections-page-hero">

        <video
          className="collections-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/products/products-hero-poster.jpg"
          style={{
            transform: `
              translate3d(${heroImageX}%, 0, 0)
              scale(${heroImageScale})
            `,
          }}
        >
          <source
            src="/videos/ceramic-hero-02.mp4"
            type="video/mp4"
          />

          Your browser does not support
          the video element.
        </video>

        <div
          className="collections-hero-video-overlay"
        />

        {/* HERO CONTENT */}

        <div
          className="collections-page-hero-content"
          style={{
            transform: `
              translate3d(
                ${heroContentX}px,
                -50%,
                0
              )
            `,
            opacity: heroContentOpacity,
          }}
        >

          <p className="collections-page-label">
            VED EXIM · COLLECTIONS
          </p>

          <h1>
            Surfaces
            <br />
            <em>with character.</em>
          </h1>

          <p className="collections-page-description">
            A curated world of ceramic surfaces
            created to bring material depth,
            refined detail and timeless character
            to contemporary spaces.
          </p>

          <a
            href="#collections"
            className="collections-hero-button"
          >
            EXPLORE COLLECTIONS

            <span>
              ↓
            </span>
          </a>

        </div>

        {/* HERO META */}

        <div
          className="collections-page-hero-meta"
          style={{
            opacity:
              Math.max(
                0,
                1 - eased * 1.2
              ),
          }}
        >

          <span>
            04 COLLECTIONS
          </span>

          <span>
            CERAMIC · SURFACES · DESIGN
          </span>

          <span>
            SCROLL TO EXPLORE ↓
          </span>

        </div>

        {/* =========================================
            HORIZONTAL CURTAIN
        ========================================= */}

        <div
          className="collections-horizontal-curtain"
          aria-hidden="true"
          style={{
            transform: `
              translate3d(
                ${curtainX}%,
                0,
                0
              )
            `,
          }}
        >

          <div
            className="collections-horizontal-curtain-line"
          />

          <span>
            VED EXIM · COLLECTIONS
          </span>

        </div>

      </section>


      {/* =========================================
          COLLECTIONS
      ========================================= */}

      <section
        id="collections"
        className="collections-page-list"
      >

        <div className="collections-page-intro">

          <p>
            EXPLORE THE COLLECTION
          </p>

          <span>
            Each collection has its own material
            language, designed to work beautifully
            across residential, hospitality and
            commercial environments.
          </span>

        </div>


        <div className="collections-page-grid">

          {collections.map(
            (collection, index) => (

              <article
                className={
                  `collection-page-card collection-page-card-${index + 1}`
                }
                key={collection.number}
              >

                <Link
                  to={`/products?series=${encodeURIComponent(
                    collection.name.toUpperCase()
                  )}`}
                  className="collection-image-button"
                  aria-label={
                    `View ${collection.name} products`
                  }
                >

                  <div
                    className="collection-page-image"
                  >

                    <img
                      src={collection.image}
                      alt={
                        `${collection.name} ceramic collection`
                      }
                      loading={
                        index === 0
                          ? "eager"
                          : "lazy"
                      }
                    />

                    <div
                      className=
                        "collection-page-image-overlay"
                    />

                  </div>

                </Link>


                <div
                  className=
                    "collection-page-content"
                >

                  <div
                    className=
                      "collection-page-top"
                  >

                    <span
                      className=
                        "collection-page-number"
                    >
                      {collection.number}
                    </span>

                    <span
                      className=
                        "collection-page-subtitle"
                    >
                      {collection.subtitle}
                    </span>

                  </div>


                  <div
                    className=
                      "collection-page-bottom"
                  >

                    <div>

                      <h2>
                        {collection.name}
                      </h2>

                      <p>
                        {collection.description}
                      </p>

                    </div>


                    <Link
                      to={`/products?series=${encodeURIComponent(
                        collection.name.toUpperCase()
                      )}`}
                      className=
                        "collection-page-arrow"
                      aria-label={
                        `View ${collection.name} products`
                      }
                    >
                      ↗
                    </Link>

                  </div>

                </div>

              </article>

            )
          )}

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section
        className="collections-page-cta"
      >

        <p className="collections-page-label">
          FIND YOUR SURFACE
        </p>

        <h2>
          Have a project
          <br />
          <em>in mind?</em>
        </h2>

        <p>
          Tell us what you're creating and
          we'll help you discover the right
          VED EXIM collection.
        </p>

        <Link
          to="/contact"
          className=
            "collections-page-cta-button"
        >
          START A CONVERSATION

          <span>
            ↗
          </span>
        </Link>

      </section>

    </main>
  );
}

export default CollectionsPage;