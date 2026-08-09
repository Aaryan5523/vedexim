import { useEffect, useRef } from "react";
import "./Products.css";

const products = [
  {
    number: "01",
    name: "Marble Collection",
    category: "Premium Porcelain",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "02",
    name: "Stone Collection",
    category: "Natural Surface",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "03",
    name: "Urban Collection",
    category: "Contemporary Tiles",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85",
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

          <h2>
            Selected
            <br />
            <em>surfaces.</em>
          </h2>
        </div>

        <p className="products-intro">
          A considered selection of surfaces designed
          to bring elegance, durability and character
          to modern spaces.
        </p>

      </div>


      {/* PRODUCTS */}

      <div className="products-list">

        {products.map((product) => (
          <article
            className="product-card"
            key={product.number}
          >

            <div className="product-image">

              <img
                src={product.image}
                alt={product.name}
              />

              <span className="product-number">
                {product.number}
              </span>

              <button
                type="button"
                className="product-view"
              >
                ↗
              </button>

            </div>


            <div className="product-info">

              <div>
                <h3>{product.name}</h3>

                <p>{product.category}</p>
              </div>

              <span className="product-index">
                {product.number}
              </span>

            </div>

          </article>
        ))}

      </div>


      {/* VIEW ALL */}

      <div className="products-footer">

        <a href="#contact">
          View Complete Collection
          <span>↗</span>
        </a>

      </div>

    </section>
  );
}

export default Products;