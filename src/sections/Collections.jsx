import { useEffect, useRef } from "react";
import "./Collections.css";

const collections = [
  {
    number: "01",
    title: "Marble",
    description:
      "Refined surfaces inspired by the natural movement and depth of marble.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "02",
    title: "Stone",
    description:
      "Earth-inspired textures created for warm and sophisticated interiors.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "03",
    title: "Terrazzo",
    description:
      "Contemporary patterns that bring rhythm, texture and personality to spaces.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "04",
    title: "Concrete",
    description:
      "Minimal architectural surfaces for modern and understated environments.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
  },
];

function Collections() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("collections-visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="collections-section"
      id="collections"
      ref={sectionRef}
    >
      {/* HEADER */}

      <div className="collections-header">

        <div>
          <p className="collections-label">
            OUR COLLECTIONS
          </p>

          <h2 className="collections-title">
            Surfaces with
            <br />
            <em>character.</em>
          </h2>
        </div>

        <p className="collections-intro">
          Explore a curated selection of ceramic
          surfaces designed to bring material,
          texture and timeless character to
          contemporary spaces.
        </p>

      </div>


      {/* COLLECTION GRID */}

      <div className="collections-grid">

        {collections.map((collection, index) => (
          <a
            href="#contact"
            className={`collection-card collection-card-${index + 1}`}
            key={collection.number}
          >

            <div className="collection-image">

              <img
                src={collection.image}
                alt={`${collection.title} ceramic collection`}
                loading={index === 0 ? "eager" : "lazy"}
              />

              <div className="collection-overlay"></div>

            </div>


            <div className="collection-content">

              <div className="collection-top">

                <span className="collection-number">
                  {collection.number}
                </span>

                <span className="collection-arrow">
                  ↗
                </span>

              </div>

              <div className="collection-bottom">

                <h3>
                  {collection.title}
                </h3>

                <p>
                  {collection.description}
                </p>

              </div>

            </div>

          </a>
        ))}

      </div>


      {/* FOOTER LINE */}

      <div className="collections-footer">

        <span>
          VED EXIM
        </span>

        <span>
          EXPLORE THE MATERIAL
        </span>

        <span>
          04 COLLECTIONS
        </span>

      </div>

    </section>
  );
}

export default Collections;