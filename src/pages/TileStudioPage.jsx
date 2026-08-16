import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./TileStudioPage.css";

const products = [
  { id: "01", name: "Mistero Nero", category: "FLOOR TILES", series: "MARBLE", surface: "POLISHED", size: "600 X 1200 MM", image: "/images/products/marble/marble-01.png" },
  { id: "02", name: "Marvel Verde", category: "FLOOR TILES", series: "MARBLE", surface: "POLISHED", size: "600 X 1200 MM", image: "/images/products/stone/stone-01.png" },
  { id: "03", name: "Marcacol Hg", category: "FLOOR TILES", series: "MARBLE", surface: "HIGH GLOSS", size: "600 X 1200 MM", image: "/images/products/terrazzo/terrazzo-01.png" },
  { id: "04", name: "Urban Stone", category: "FLOOR TILES", series: "STONE", surface: "MATT", size: "600 X 1200 MM", image: "/images/products/concrete/concrete-01.png" },
  { id: "05", name: "Limestone Grey", category: "WALL TILES", series: "STONE", surface: "MATT", size: "300 X 600 MM", image: "/images/products/stone/stone-01.png" },
  { id: "06", name: "Architect Grey", category: "GVT", series: "CONCRETE", surface: "MATT", size: "600 X 1200 MM", image: "/images/products/concrete/concrete-01.png" },
  { id: "07", name: "Calacatta White", category: "FLOOR TILES", series: "MARBLE", surface: "HIGH GLOSS", size: "800 X 1600 MM", image: "/images/products/marble/marble-01.png" },
  { id: "08", name: "Terrazzo Classic", category: "FLOOR TILES", series: "TERRAZZO", surface: "MATT", size: "600 X 1200 MM", image: "/images/products/terrazzo/terrazzo-01.png" },
  { id: "09", name: "Bianco Vein", category: "WALL TILES", series: "MARBLE", surface: "GLOSSY", size: "300 X 600 MM", image: "/images/products/marble/marble-01.png" },
  { id: "10", name: "Graphite Slate", category: "FLOOR TILES", series: "STONE", surface: "MATT", size: "600 X 1200 MM", image: "/images/products/stone/stone-01.png" },
];

const rooms = ["LIVING ROOM", "KITCHEN", "BATHROOM", "BEDROOM", "OUTDOOR"];
const styles = ["MARBLE", "STONE", "TERRAZZO", "CONCRETE"];
const finishes = ["ANY FINISH", "MATT", "POLISHED", "HIGH GLOSS", "GLOSSY"];

const previewByStyle = {
  MARBLE: "/images/products/marble/marble-01.png",
  STONE: "/images/products/stone/stone-01.png",
  TERRAZZO: "/images/products/terrazzo/terrazzo-01.png",
  CONCRETE: "/images/products/concrete/concrete-01.png",
};

function TileStudioPage() {
  const [room, setRoom] = useState("LIVING ROOM");
  const [style, setStyle] = useState("MARBLE");
  const [finish, setFinish] = useState("ANY FINISH");

  const recommendations = useMemo(() => {
    const matches = products.filter((product) => {
      const styleMatch = product.series === style;
      const finishMatch = finish === "ANY FINISH" || product.surface === finish;
      return styleMatch && finishMatch;
    });

    return matches.length ? matches.slice(0, 4) : [];
  }, [style, finish]);

  return (
    <main className="tile-studio-page">
      <section className="tile-studio-hero">
        <div className="tile-studio-hero-copy">
          <p className="tile-studio-label">VED EXIM · TILE STUDIO</p>
          <h1>Find your <em>perfect surface.</em></h1>
          <p>
            Select your space, material language and finish. Tile Studio
            will narrow the collection to surfaces that fit your brief.
          </p>
        </div>
        <span className="tile-studio-hero-index">01 / 01</span>
      </section>

      <section className="tile-studio-workspace">
        <div className="tile-studio-preview">
          <div className="tile-studio-preview-image">
            <img src={previewByStyle[style]} alt={`${style} ceramic surface preview`} />
            <div className="tile-studio-preview-overlay" />
            <div className="tile-studio-preview-caption">
              <span>{room}</span>
              <strong>{style}</strong>
              <small>{finish}</small>
            </div>
          </div>
        </div>

        <div className="tile-studio-controls">
          <div className="tile-studio-step">
            <span>01</span>
            <div>
              <p>CHOOSE YOUR SPACE</p>
              <h2>Where will it live?</h2>
            </div>
          </div>
          <div className="tile-studio-options">
            {rooms.map((item) => (
              <button key={item} type="button" className={room === item ? "active" : ""} onClick={() => setRoom(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="tile-studio-step">
            <span>02</span>
            <div>
              <p>CHOOSE YOUR MATERIAL</p>
              <h2>What character?</h2>
            </div>
          </div>
          <div className="tile-studio-options">
            {styles.map((item) => (
              <button key={item} type="button" className={style === item ? "active" : ""} onClick={() => setStyle(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="tile-studio-step">
            <span>03</span>
            <div>
              <p>CHOOSE YOUR FINISH</p>
              <h2>How should it feel?</h2>
            </div>
          </div>
          <div className="tile-studio-options">
            {finishes.map((item) => (
              <button key={item} type="button" className={finish === item ? "active" : ""} onClick={() => setFinish(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="tile-studio-results">
        <div className="tile-studio-results-head">
          <div>
            <p className="tile-studio-label">YOUR MATCH</p>
            <h2>Recommended <em>surfaces.</em></h2>
          </div>
          <span>{recommendations.length} PRODUCTS</span>
        </div>

        {recommendations.length ? (
          <div className="tile-studio-product-grid">
            {recommendations.map((product) => (
              <article className="tile-studio-product" key={product.id}>
                <div className="tile-studio-product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="tile-studio-product-info">
                  <span>{product.category} · {product.size}</span>
                  <h3>{product.name}</h3>
                  <p>{product.series} · {product.surface}</p>
                  <Link to={`/products?series=${encodeURIComponent(product.series)}&surface=${encodeURIComponent(product.surface)}`}>
                    VIEW PRODUCT ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="tile-studio-empty">
            <h3>No exact finish match.</h3>
            <p>Try another finish or view the complete collection.</p>
            <Link to="/products">VIEW ALL PRODUCTS ↗</Link>
          </div>
        )}
      </section>

      <section className="tile-studio-cta">
        <p className="tile-studio-label">READY TO CREATE?</p>
        <h2>Found your <em>surface?</em></h2>
        <p>Send us your requirements and our team can help with availability, specifications and project quantities.</p>
        <div className="tile-studio-cta-actions">
          <Link to="/contact" className="tile-studio-primary">REQUEST A QUOTE ↗</Link>
          <a href="https://wa.me/919909026328?text=Hello%20VED%20EXIM%2C%20I%20would%20like%20help%20selecting%20ceramic%20surfaces." target="_blank" rel="noopener noreferrer" className="tile-studio-secondary">WHATSAPP US ↗</a>
        </div>
      </section>
    </main>
  );
}

export default TileStudioPage;
