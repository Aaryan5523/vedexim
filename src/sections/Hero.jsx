import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    buttonLink: "#collections",
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

/* ─── Split text into animated letter spans ─────────────────────────── */
function SplitText({ text, className, baseDelay = 0, tag: Tag = "span" }) {
  return (
    <Tag className={className}>
      {[...text].map((char, i) => (
        <span
          key={i}
          className="hero-char"
          style={{ animationDelay: `${baseDelay + i * 40}ms` }}
          aria-hidden={char === " " ? undefined : "true"}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="hero" id="home">

      {/* ── AUTO CHANGING PHOTO BACKGROUND ── */}
      <div className="hero-background">
        {heroSlides.map((item, index) => (
          <img
            key={index}
            src={item.image}
            alt={`VED EXIM Ceramic Surface ${index + 1}`}
            className={index === currentSlide ? "active" : ""}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* ── OVERLAY ── */}
      <div className="hero-overlay" />

      {/* ── HERO CONTENT (Syncs and re-animates with each photo change) ── */}
      <div className="hero-content" key={currentSlide}>

        {/* Eyebrow — slides in from left */}
        <p className="hero-eyebrow hero-anim-eyebrow">
          {slide.eyebrow}
        </p>

        {/* Heading — each letter pops up with stagger */}
        <h1
          className="hero-anim-h1"
          aria-label={`${slide.titleLine1} ${slide.titleLine2}`}
        >
          <span className="hero-h1-line">
            <SplitText text={slide.titleLine1} baseDelay={120} />
          </span>
          <br />
          <span className="hero-h1-line hero-h1-italic">
            <SplitText text={slide.titleLine2} baseDelay={380} />
          </span>
        </h1>

        {/* Description — fades up */}
        <p className="hero-description hero-anim-desc">
          {slide.description}
        </p>

        {/* Button — fades in */}
        {slide.buttonLink.startsWith("#") ? (
          <a href={slide.buttonLink} className="hero-button hero-anim-btn">
            {slide.buttonText}
            <span>↗</span>
          </a>
        ) : (
          <Link to={slide.buttonLink} className="hero-button hero-anim-btn">
            {slide.buttonText}
            <span>↗</span>
          </Link>
        )}

      </div>

      {/* ── HERO FOOTER ── */}
      <div className="hero-footer">
        <span>VED EXIM</span>

        <div className="hero-scroll">
          <span>0{currentSlide + 1} / 0{heroSlides.length}</span>
          <div className="scroll-line" />
        </div>

        <span>EST. 1998</span>
      </div>

    </section>
  );
}

export default Hero;
