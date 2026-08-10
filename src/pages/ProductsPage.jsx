import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductsPage.css";

const products = [
  {
    id: "01",
    name: "Calacatta Marble",
    category: "MARBLE",
    finish: "Polished",
    size: "1200 × 2400 mm",
    image: "/images/products/marble/marble-01.png",
  },
  {
    id: "02",
    name: "Travertine Stone",
    category: "STONE",
    finish: "Matt",
    size: "600 × 1200 mm",
    image: "/images/products/stone/stone-01.png",
  },
  {
    id: "03",
    name: "Terrazzo Classic",
    category: "TERRAZZO",
    finish: "Matt",
    size: "600 × 1200 mm",
    image: "/images/products/terrazzo/terrazzo-01.png",
  },
  {
    id: "04",
    name: "Architectural Concrete",
    category: "CONCRETE",
    finish: "Matt",
    size: "600 × 1200 mm",
    image: "/images/products/concrete/concrete-01.png",
  },
];

const categories = [
  "ALL",
  "MARBLE",
  "STONE",
  "TERRAZZO",
  "CONCRETE",
];

function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts =
    activeCategory === "ALL"
      ? products
      : products.filter(
          (product) =>
            product.category === activeCategory
        );

  useEffect(() => {
    document.body.style.overflow = selectedProduct
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <>
      <main className="products-page">

        {/* HERO */}

        <section className="products-page-hero">

          <div className="products-page-hero-content">

            <p className="products-page-label">
              VED EXIM · PRODUCTS
            </p>

            <h1>
              Surfaces
              <br />
              <em>for every space.</em>
            </h1>

            <p>
              Explore our curated selection of
              ceramic surfaces, created for
              contemporary architecture and
              considered interiors.
            </p>

          </div>

          <div className="products-page-hero-bottom">

            <span>
              {products.length} PRODUCTS
            </span>

            <span>
              EXPLORE COLLECTION ↓
            </span>

          </div>

        </section>


        {/* PRODUCTS */}

        <section className="products-page-list">

          {/* HEADER */}

          <div className="products-page-header">

            <div>

              <p className="products-page-label">
                PRODUCT CATALOGUE
              </p>

              <h2>
                Find your
                <br />
                <em>surface.</em>
              </h2>

            </div>

            <p>
              Browse our surface selection by
              material family and discover finishes
              suited to residential, hospitality and
              commercial spaces.
            </p>

          </div>


          {/* FILTERS */}

          <div className="products-filters">

            {categories.map((category) => (

              <button
                type="button"
                key={category}
                className={
                  activeCategory === category
                    ? "product-filter active"
                    : "product-filter"
                }
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>

            ))}

          </div>


          {/* GRID */}

          <div className="products-page-grid">

            {filteredProducts.map(
              (product, index) => (

                <article
                  className="product-page-card"
                  key={product.id}
                >

                  {/* IMAGE */}

                  <button
                    type="button"
                    className="product-image-button"
                    onClick={() =>
                      setSelectedProduct(product)
                    }
                    aria-label={`View ${product.name}`}
                  >

                    <div className="product-page-image">

                      <img
                        src={product.image}
                        alt={product.name}
                        loading={
                          index === 0
                            ? "eager"
                            : "lazy"
                        }
                      />

                      <div className="product-page-overlay" />

                    </div>

                  </button>


                  {/* CONTENT */}

                  <div className="product-page-content">

                    <div className="product-page-top">

                      <span>
                        {product.id}
                      </span>

                      <span>
                        {product.category}
                      </span>

                    </div>


                    <div className="product-page-bottom">

                      <div>

                        <h3>
                          {product.name}
                        </h3>

                        <p>
                          {product.finish}
                          {" · "}
                          {product.size}
                        </p>

                      </div>


                      <Link
                        to="/#contact"
                        className="product-enquire"
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


        {/* CTA */}

        <section className="products-page-cta">

          <p className="products-page-label">
            NEED HELP SELECTING?
          </p>

          <h2>
            Let's find the
            <br />
            <em>right surface.</em>
          </h2>

          <p>
            Tell us about your project and our team
            can help you explore the right material,
            finish and format.
          </p>

          <Link
            to="/#contact"
            className="products-cta-button"
          >
            START AN ENQUIRY
            <span>↗</span>
          </Link>

        </section>

      </main>


      {/* PRODUCT LIGHTBOX */}

      {selectedProduct && (

        <div
          className="product-lightbox"
          onClick={() =>
            setSelectedProduct(null)
          }
        >

          <button
            type="button"
            className="product-lightbox-close"
            onClick={() =>
              setSelectedProduct(null)
            }
            aria-label="Close product"
          >
            ×
          </button>


          <div
            className="product-lightbox-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <div className="product-lightbox-info">

              <span>
                {selectedProduct.id}
              </span>

              <strong>
                {selectedProduct.name}
              </strong>

              <span>
                {selectedProduct.category}
                {" · "}
                {selectedProduct.finish}
              </span>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default ProductsPage;