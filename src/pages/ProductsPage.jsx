import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useSearchParams,
} from "react-router-dom";
import "./ProductsPage.css";


/* =====================================================
   PRODUCT DATA
===================================================== */

const products = [
  {
    id: "01",
    category: "FLOOR TILES",
    size: "600 X 1200 MM",
    series: "MARBLE",
    surface: "POLISHED",
    name: "Mistero Nero",
    image: "/images/products/marble/marble-01.png",
  },

  {
    id: "02",
    category: "FLOOR TILES",
    size: "600 X 1200 MM",
    series: "MARBLE",
    surface: "POLISHED",
    name: "Marvel Verde",
    image: "/images/products/stone/stone-01.png",
  },

  {
    id: "03",
    category: "FLOOR TILES",
    size: "600 X 1200 MM",
    series: "MARBLE",
    surface: "HIGH GLOSS",
    name: "Marcacol Hg",
    image: "/images/products/terrazzo/terrazzo-01.png",
  },

  {
    id: "04",
    category: "FLOOR TILES",
    size: "600 X 1200 MM",
    series: "STONE",
    surface: "MATT",
    name: "Urban Stone",
    image: "/images/products/concrete/concrete-01.png",
  },

  {
    id: "05",
    category: "WALL TILES",
    size: "300 X 600 MM",
    series: "STONE",
    surface: "MATT",
    name: "Limestone Grey",
    image: "/images/products/stone/stone-01.png",
  },

  {
    id: "13",
    category: "WALL TILES",
    size: "300 X 450 MM",
    series: "STONE",
    surface: "MATT",
    name: "Limestone Classic",
    image: "/images/products/stone/stone-01.png",
  },

  {
    id: "14",
    category: "WALL TILES",
    size: "300 X 300 MM",
    series: "STONE",
    surface: "MATT",
    name: "Stone Square",
    image: "/images/products/stone/stone-01.png",
  },

  {
    id: "06",
    category: "GVT",
    size: "600 X 1200 MM",
    series: "CONCRETE",
    surface: "MATT",
    name: "Architect Grey",
    image: "/images/products/concrete/concrete-01.png",
  },

  {
    id: "07",
    category: "FLOOR TILES",
    size: "800 X 1600 MM",
    series: "MARBLE",
    surface: "HIGH GLOSS",
    name: "Calacatta White",
    image: "/images/products/marble/marble-01.png",
  },

  {
    id: "08",
    category: "FLOOR TILES",
    size: "600 X 1200 MM",
    series: "TERRAZZO",
    surface: "MATT",
    name: "Terrazzo Classic",
    image: "/images/products/terrazzo/terrazzo-01.png",
  },

  {
    id: "09",
    category: "WALL TILES",
    size: "300 X 600 MM",
    series: "MARBLE",
    surface: "GLOSSY",
    name: "Bianco Vein",
    image: "/images/products/marble/marble-01.png",
  },

  {
    id: "10",
    category: "FLOOR TILES",
    size: "600 X 1200 MM",
    series: "STONE",
    surface: "MATT",
    name: "Graphite Slate",
    image: "/images/products/stone/stone-01.png",
  },

  {
    id: "11",
    category: "FLOOR TILES",
    size: "800 X 1600 MM",
    series: "MARBLE",
    surface: "HIGH GLOSS",
    name: "Arabescato",
    image: "/images/products/marble/marble-01.png",
  },

  {
    id: "12",
    category: "FLOOR TILES",
    size: "600 X 1200 MM",
    series: "CONCRETE",
    surface: "MATT",
    name: "Raw Concrete",
    image: "/images/products/concrete/concrete-01.png",
  },
];


/* =====================================================
   FILTER OPTIONS
===================================================== */

const categories = [
  "ALL",
  "WALL TILES",
  "FLOOR TILES",
  "PARKING TILES",
  "SANITARYWARE",
];

const sizes = [
  "ALL",
  "300 X 300 MM",
  "300 X 450 MM",
  "300 X 600 MM",
  "600 X 600 MM",
  "600 X 1200 MM",
  "800 X 1600 MM",
];

const surfaces = [
  "ALL",
  "POLISHED",
  "HIGH GLOSS",
  "GLOSSY",
  "MATT",
];


/* =====================================================
   PRODUCTS PAGE
===================================================== */

function ProductsPage() {
  const [searchParams] = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category")?.toUpperCase() || "ALL";

  const sizeFromUrl =
    searchParams.get("size")?.toUpperCase() || "ALL";

  const seriesFromUrl =
    searchParams.get("series")?.toUpperCase() || "ALL";

  const [category, setCategory] =
    useState(categoryFromUrl);

  const [size, setSize] =
    useState(sizeFromUrl);

  const [series, setSeries] =
    useState(seriesFromUrl);

  const [surface, setSurface] =
    useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedProduct, setSelectedProduct] =
    useState(null);


  /* ===================================================
     SETTINGS
  =================================================== */

  const productsPerPage = 6;


  /* ===================================================
     SERIES OPTIONS
  =================================================== */

  const seriesOptions = useMemo(() => {
    return [
      "ALL",

      ...Array.from(
        new Set(
          products.map(
            (product) => product.series
          )
        )
      ),
    ];
  }, []);


  /* ===================================================
     SYNC CATEGORY + SIZE + SERIES WITH URL
  =================================================== */

  useEffect(() => {
    const requestedCategory =
      searchParams.get("category")?.toUpperCase() || "ALL";

    const requestedSize =
      searchParams.get("size")?.toUpperCase() || "ALL";

    const requestedSeries =
      searchParams.get("series")?.toUpperCase() || "ALL";

    setCategory(requestedCategory);
    setSize(requestedSize);

    if (
      requestedSeries === "ALL" ||
      seriesOptions.includes(requestedSeries)
    ) {
      setSeries(requestedSeries);
    } else {
      setSeries("ALL");
    }

    setCurrentPage(1);
  }, [
    searchParams,
    seriesOptions,
  ]);


  /* ===================================================
     FILTER PRODUCTS
  =================================================== */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        category === "ALL" ||
        product.category === category;

      const sizeMatch =
        size === "ALL" ||
        product.size === size;

      const seriesMatch =
        series === "ALL" ||
        product.series === series;

      const surfaceMatch =
        surface === "ALL" ||
        product.surface === surface;

      return (
        categoryMatch &&
        sizeMatch &&
        seriesMatch &&
        surfaceMatch
      );
    });
  }, [
    category,
    size,
    series,
    surface,
  ]);


  /* ===================================================
     PAGINATION
  =================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
      productsPerPage
    )
  );

  const visibleProducts =
    filteredProducts.slice(
      (currentPage - 1) *
        productsPerPage,

      currentPage *
        productsPerPage
    );


  /* ===================================================
     RESET PAGE WHEN FILTER CHANGES
  =================================================== */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    category,
    size,
    series,
    surface,
  ]);


  /* ===================================================
     KEEP PAGE VALID
  =================================================== */

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);


  /* ===================================================
     LOCK BODY WHEN LIGHTBOX IS OPEN
  =================================================== */

  useEffect(() => {
    document.body.style.overflow =
      selectedProduct
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);


  /* ===================================================
     ESCAPE KEY
  =================================================== */

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


  /* ===================================================
     PAGE NAVIGATION
  =================================================== */

  const goToPage = (page) => {
    const safePage = Math.min(
      Math.max(page, 1),
      totalPages
    );

    setCurrentPage(safePage);

    const catalogue =
      document.getElementById(
        "product-catalogue"
      );

    if (catalogue) {
      catalogue.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };


  /* ===================================================
     CLEAR FILTERS
  =================================================== */

  const clearFilters = () => {
    setCategory("ALL");
    setSize("ALL");
    setSeries("ALL");
    setSurface("ALL");
    setCurrentPage(1);

    window.history.replaceState(
      {},
      "",
      window.location.pathname
    );
  };


  /* ===================================================
     RENDER
  =================================================== */

  return (
    <main className="products-catalogue-page">


      {/* =================================================
          PRODUCT VIDEO HERO
      ================================================= */}

      <section className="products-video-hero">

        <video
          className="products-video-background"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/products/products-hero-poster.jpg"
        >
          <source
            src="/videos/ceramic-hero.mp4"
            type="video/mp4"
          />

          Your browser does not support
          the video element.
        </video>


        <div
          className="products-video-overlay"
        />


        <div className="products-video-content">

          <p className="products-video-label">
            VED EXIM · SURFACES
          </p>


          <h1>
            Crafted for
            <br />
            <em>beautiful spaces.</em>
          </h1>


          <p className="products-video-description">
            Discover premium ceramic surfaces,
            refined finishes and timeless designs
            created for contemporary architecture.
          </p>


          <a
            href="#product-catalogue"
            className="products-video-button"
          >
            EXPLORE PRODUCTS

            <span>
              ↓
            </span>
          </a>

        </div>


        <div className="products-video-bottom">

          <span>
            CERAMIC · SURFACES · DESIGN
          </span>

          <span>
            SCROLL TO EXPLORE
          </span>

        </div>

      </section>


      {/* =================================================
          PRODUCT CATALOGUE
      ================================================= */}

      <section
        id="product-catalogue"
        className="products-catalogue-section"
      >


        {/* =================================================
            FILTER SECTION
        ================================================= */}

        <div className="products-catalogue-filters">


          {/* CATEGORY */}

          <div className="catalogue-filter">

            <label>
              Search By Category
            </label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value
                )
              }
            >
              {categories.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "ALL"
                      ? "All Categories"
                      : item}
                  </option>
                )
              )}
            </select>

          </div>


          {/* SIZE */}

          <div className="catalogue-filter">

            <label>
              Search By Size
            </label>

            <select
              value={size}
              onChange={(event) =>
                setSize(
                  event.target.value
                )
              }
            >
              {sizes.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "ALL"
                      ? "All Sizes"
                      : item}
                  </option>
                )
              )}
            </select>

          </div>


          {/* SERIES */}

          <div className="catalogue-filter">

            <label>
              Search By Series
            </label>

            <select
              value={series}
              onChange={(event) =>
                setSeries(
                  event.target.value
                )
              }
            >
              {seriesOptions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "ALL"
                      ? "All Series"
                      : item}
                  </option>
                )
              )}
            </select>

          </div>


          {/* SURFACE */}

          <div className="catalogue-filter">

            <label>
              Search By Surface
            </label>

            <select
              value={surface}
              onChange={(event) =>
                setSurface(
                  event.target.value
                )
              }
            >
              {surfaces.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "ALL"
                      ? "Select Any One"
                      : item}
                  </option>
                )
              )}
            </select>

          </div>

        </div>


        {/* =================================================
            RESULT BAR
        ================================================= */}

        <section className="products-catalogue-result">

          <span>
            {filteredProducts.length} PRODUCTS
          </span>


          <button
            type="button"
            onClick={clearFilters}
          >
            CLEAR FILTERS
          </button>

        </section>


        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        <section
          key={`products-page-${currentPage}`}
          className="products-catalogue-grid"
        >

          {visibleProducts.length > 0 ? (

            visibleProducts.map(
              (product) => (

                <article
                  className="catalogue-product-card"
                  key={product.id}
                >


                  {/* IMAGE */}

                  <button
                    type="button"
                    className="catalogue-product-image-button"
                    onClick={() =>
                      setSelectedProduct(
                        product
                      )
                    }
                    aria-label={
                      `Open ${product.name}`
                    }
                  >

                    <div
                      className="catalogue-product-image"
                    >

                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />


                      <div
                        className="catalogue-image-overlay"
                      />


                      <span
                        className="catalogue-zoom"
                      >
                        OPEN IMAGE ↗
                      </span>

                    </div>

                  </button>


                  {/* PRODUCT INFORMATION */}

                  <div
                    className="catalogue-product-info"
                  >

                    <p>
                      {product.category}
                      {" - "}
                      {product.size}
                    </p>


                    <h2>
                      {product.name}
                    </h2>


                    <div
                      className="catalogue-product-meta"
                    >

                      <span>
                        {product.series}
                      </span>


                      <span>
                        {product.surface}
                      </span>

                    </div>

                  </div>

                </article>

              )
            )

          ) : (

            /* =================================================
               NO PRODUCTS
            ================================================= */

            <div className="catalogue-empty">

              <h2>
                No products found.
              </h2>

              <p>
                Try changing your filters.
              </p>


              <button
                type="button"
                onClick={clearFilters}
              >
                RESET FILTERS
              </button>

            </div>

          )}

        </section>


        {/* =================================================
            PAGINATION
        ================================================= */}

        {filteredProducts.length > 0 && (

          <section
            className="products-pagination"
          >


            {/* PREVIOUS */}

            <button
              type="button"
              className="pagination-arrow"
              onClick={() =>
                goToPage(
                  currentPage - 1
                )
              }
              disabled={
                currentPage === 1
              }
              aria-label="Previous page"
            >
              ←
            </button>


            {/* PAGE NUMBERS */}

            <div
              className="pagination-pages"
            >

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) =>
                  index + 1
              ).map(
                (page) => (

                  <button
                    type="button"
                    key={page}
                    className={
                      currentPage === page
                        ? "pagination-page active"
                        : "pagination-page"
                    }
                    onClick={() =>
                      goToPage(page)
                    }
                  >
                    {String(page)
                      .padStart(2, "0")}
                  </button>

                )
              )}

            </div>


            {/* NEXT */}

            <button
              type="button"
              className="pagination-arrow"
              onClick={() =>
                goToPage(
                  currentPage + 1
                )
              }
              disabled={
                currentPage === totalPages
              }
              aria-label="Next page"
            >
              →
            </button>

          </section>

        )}

      </section>


      {/* =================================================
          IMAGE LIGHTBOX
      ================================================= */}

      {selectedProduct && (

        <div
          className="catalogue-lightbox"
          onClick={() =>
            setSelectedProduct(null)
          }
        >


          {/* CLOSE BUTTON */}

          <button
            type="button"
            className="catalogue-lightbox-close"
            onClick={() =>
              setSelectedProduct(null)
            }
            aria-label="Close image"
          >
            ×
          </button>


          {/* LIGHTBOX CONTENT */}

          <div
            className="catalogue-lightbox-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              src={selectedProduct.image}
              alt={
                selectedProduct.name
              }
            />


            <div
              className="catalogue-lightbox-caption"
            >

              <span>
                {selectedProduct.category}
                {" · "}
                {selectedProduct.size}
              </span>


              <strong>
                {selectedProduct.name}
              </strong>


              <span>
                {selectedProduct.series}
                {" · "}
                {selectedProduct.surface}
              </span>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}


export default ProductsPage;