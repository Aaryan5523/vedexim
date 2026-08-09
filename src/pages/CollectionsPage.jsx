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
    image:
      "/products/marble/marble-01.png",
  },
  {
    number: "02",
    name: "Stone",
    subtitle: "NATURAL CHARACTER",
    description:
      "Earth-inspired ceramic surfaces created to bring warmth, texture and a sense of permanence to contemporary interiors.",
    image:
      "/products/stone/stone-01.png",
  },
  {
    number: "03",
    name: "Terrazzo",
    subtitle: "CONTEMPORARY RHYTHM",
    description:
      "Distinctive terrazzo-inspired patterns that add visual rhythm, texture and personality to modern spaces.",
    image:
      "/products/terrazzo/terrazzo-01.png",
  },
  {
    number: "04",
    name: "Concrete",
    subtitle: "ARCHITECTURAL MINIMALISM",
    description:
      "Quiet concrete-inspired surfaces designed for understated, modern and architectural environments.",
    image:
      "/products/concrete/concrete-01.png",
  },
];

function CollectionsPage() {
  const pageRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const timer = setTimeout(() => {
      page.classList.add("collections-page-visible");
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main
      className="collections-page"
      ref={pageRef}
    >

      {/* =========================================
          PAGE HERO
      ========================================= */}

      <section className="collections-page-hero">

        <div className="collections-page-hero-content">

          <p className="collections-page-label">
            VED EXIM · COLLECTIONS
          </p>

          <h1>
            Surfaces
            <br />
            <em>with character.</em>
          </h1>

          <p className="collections-page-description">
            A curated world of ceramic surfaces created
            to bring material depth, refined detail and
            timeless character to contemporary spaces.
          </p>

        </div>

        <div className="collections-page-hero-meta">
          <span>
            04 COLLECTIONS
          </span>

          <span>
            SCROLL TO EXPLORE ↓
          </span>
        </div>

      </section>


      {/* =========================================
          COLLECTIONS
      ========================================= */}

      <section className="collections-page-list">

        <div className="collections-page-intro">

          <p>
            EXPLORE THE COLLECTION
          </p>

          <span>
            Each collection has its own material language,
            designed to work beautifully across residential,
            hospitality and commercial environments.
          </span>

        </div>


        <div className="collections-page-grid">

          {collections.map((collection, index) => (
            <article
              className={`collection-page-card collection-page-card-${index + 1}`}
              key={collection.number}
            >

              {/* IMAGE */}

              <button
                type="button"
                className="collection-image-button"
                onClick={() => setSelectedImage(collection)}
                aria-label={`View ${collection.name} collection image`}
              >

                <div className="collection-page-image">

                  <img
                    src={collection.image}
                    alt={`${collection.name} ceramic collection`}
                    loading={index === 0 ? "eager" : "lazy"}
                  />

                  <div className="collection-page-image-overlay"></div>

                </div>

              </button>


              {/* CONTENT */}

              <div className="collection-page-content">

                <div className="collection-page-top">

                  <span className="collection-page-number">
                    {collection.number}
                  </span>

                  <span className="collection-page-subtitle">
                    {collection.subtitle}
                  </span>

                </div>


                <div className="collection-page-bottom">

                  <div>

                    <h2>
                      {collection.name}
                    </h2>

                    <p>
                      {collection.description}
                    </p>

                  </div>

                  <Link
                    to="/#contact"
                    className="collection-page-arrow"
                  >
                    ↗
                  </Link>

                </div>

              </div>

            </article>
          ))}

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="collections-page-cta">

        <p className="collections-page-label">
          FIND YOUR SURFACE
        </p>

        <h2>
          Have a project
          <br />
          <em>in mind?</em>
        </h2>

        <p>
          Tell us what you're creating and we'll help
          you discover the right VED EXIM collection.
        </p>

        <Link
          to="/#contact"
          className="collections-page-cta-button"
        >
          START A CONVERSATION
          <span>↗</span>
        </Link>

      </section>


      {/* =========================================
          IMAGE LIGHTBOX
      ========================================= */}

      {selectedImage && (
        <div
          className="collection-lightbox"
          onClick={() => setSelectedImage(null)}
        >

          <button
            type="button"
            className="collection-lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            ×
          </button>


          <div
            className="collection-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >

            <img
              src={selectedImage.image}
              alt={`${selectedImage.name} ceramic collection`}
            />

            <div className="collection-lightbox-caption">

              <span>
                {selectedImage.number}
              </span>

              <strong>
                {selectedImage.name}
              </strong>

              <span>
                {selectedImage.subtitle}
              </span>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

export default CollectionsPage;