import { useEffect, useRef } from "react";
import "./Products.css";

const products = [
  {
    number: "01",
    name: "Calacatta",
    category: "MARBLE COLLECTION",
    description:
      "A refined marble-inspired surface with elegant veining and a timeless character.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "02",
    name: "Travertine",
    category: "STONE COLLECTION",
    description:
      "Warm natural tones and subtle texture designed for sophisticated interiors.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "03",
    name: "Onyx",
    category: "PREMIUM COLLECTION",
    description:
      "A dramatic surface inspired by the depth, movement and luminosity of natural stone.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "04",
    name: "Limestone",
    category: "STONE COLLECTION",
    description:
      "A quiet architectural finish created for modern and minimal spaces.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=85",
  },
];

function Products() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("products-visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="products-section"
      id="products"
      ref={sectionRef}
    >
      {/* HEADER */}

      <div className="products-header">

        <div>

          <p className="products-label">
            FEATURED PRODUCTS
          </p>

          <h2 className="products-title">
            Designed for
            <br />
            <em>beautiful spaces.</em>
          </h2>

        </div>

        <p className="products-intro">
          Discover selected surfaces from the VED EXIM
          collection, created to combine refined aesthetics,
          dependable quality and contemporary design.
        </p>

      </div>


      {/* PRODUCTS */}

      <div className="products-grid">

        {products.map((product, index) => (
          <a
            href="#contact"
            className="product-card"
            key={product.number}
          >

            <div className="product-image">

              <img
                src={product.image}
                alt={`${product.name} ceramic surface`}
                loading={index < 2 ? "eager" : "lazy"}
              />

              <div className="product-image-overlay"></div>

            </div>


            <div className="product-content">

              <div className="product-top">

                <span className="product-number">
                  {product.number}
                </span>

                <span className="product-category">
                  {product.category}
                </span>

              </div>


              <div className="product-bottom">

                <div>

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.description}
                  </p>

                </div>

                <span className="product-arrow">
                  ↗
                </span>

              </div>

            </div>

          </a>
        ))}

      </div>


      {/* FOOTER */}

      <div className="products-footer">

        <span>
          VED EXIM
        </span>

        <span>
          CURATED SURFACES
        </span>

        <a href="#contact">
          VIEW ALL PRODUCTS ↗
        </a>

      </div>

    </section>
  );
}

export default Products;