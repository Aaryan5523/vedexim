import { useEffect, useRef } from "react";
import "./Collections.css";

const collections = [
  {
    number: "01",
    title: "Marble",
    subtitle: "Timeless elegance",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "02",
    title: "Stone",
    subtitle: "Natural expression",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "03",
    title: "Concrete",
    subtitle: "Modern character",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "04",
    title: "Wood",
    subtitle: "Warm textures",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
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
          section.classList.add("is-visible");
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

          <h2>
            Designed for
            <br />
            <em>distinctive spaces.</em>
          </h2>
        </div>

        <p className="collections-intro">
          Explore surfaces created to bring depth,
          texture and character to contemporary
          architecture.
        </p>

      </div>


      {/* COLLECTION GRID */}

      <div className="collections-grid">

        {collections.map((collection) => (
          <a
            href="#products"
            className="collection-card"
            key={collection.number}
          >

            <div className="collection-image">

              <img
                src={collection.image}
                alt={`${collection.title} ceramic collection`}
              />

              <div className="collection-overlay"></div>

              <span className="collection-number">
                {collection.number}
              </span>

              <span className="collection-arrow">
                ↗
              </span>

            </div>


            <div className="collection-info">

              <div>
                <h3>{collection.title}</h3>

                <p>{collection.subtitle}</p>
              </div>

              <span>
                EXPLORE
              </span>

            </div>

          </a>
        ))}

      </div>

    </section>
  );
}

export default Collections;