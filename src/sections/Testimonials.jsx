import { useEffect, useRef, useState } from "react";
import SplitHeading from "../components/SplitHeading";
import "./Testimonials.css";

const stats = [
  {
    target: 500,
    suffix: "+",
    decimals: 0,
    label: "Satisfied Clients",
    detail: "Global architects & builders",
  },
  {
    target: 25,
    suffix: "+",
    decimals: 0,
    label: "Countries Exported",
    detail: "Europe, Gulf, Americas & Asia",
  },
  {
    target: 1800,
    suffix: "+",
    decimals: 0,
    label: "Completed Projects",
    detail: "Residential, commercial & hospitality",
  },
  {
    target: 99.4,
    suffix: "%",
    decimals: 1,
    label: "Satisfaction Rate",
    detail: "Based on repeat client orders",
  },
];

const testimonials = [
  {
    number: "01",
    client: "Alexander Wright",
    role: "Lead Principal Architect",
    firm: "Wright & Co. Architecture",
    location: "London, United Kingdom",
    project: "Luxury Penthouse Villa",
    rating: 5,
    quote:
      "The surface consistency, natural veining and exceptional edge finish of VED EXIM porcelain exceeded every expectation on our high-end residential commission. Flawless precision.",
  },
  {
    number: "02",
    client: "Elena Rostova",
    role: "Director of Procurement",
    firm: "Zenith Interior Group",
    location: "Dubai, United Arab Emirates",
    project: "5-Star Resort & Spa",
    rating: 5,
    quote:
      "Dependable export logistics, impeccably packed large-format tiles, and world-class surface polish. VED EXIM has become our go-to partner for prestige hospitality builds.",
  },
  {
    number: "03",
    client: "Carlos Mendonça",
    role: "Chief Commercial Designer",
    firm: "Mendonça Atelier",
    location: "São Paulo, Brazil",
    project: "Corporate Atrium & Lobby",
    rating: 5,
    quote:
      "From digital catalog selection to container dispatch, their attention to surface grade, slip resistance and architectural aesthetics is unmatched in the industry.",
  },
  {
    number: "04",
    client: "Rajesh Singhania",
    role: "Managing Director",
    firm: "Skyline Infrastructure Ltd",
    location: "Mumbai, India",
    project: "High-Rise Residential Township",
    rating: 5,
    quote:
      "Over 80,000 sq. meters of tiles delivered with 100% batch uniformity and zero transit breakage. Their commitment to quality and schedule is exemplary.",
  },
];

/* ── Smooth Count Up Animation Component ── */
function CountUpNumber({
  target,
  suffix = "",
  decimals = 0,
  duration = 2200,
  active,
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = target * easeOut;

      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setValue(target);
      }
    };

    requestAnimationFrame(update);
  }, [active, target, duration]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.floor(value).toLocaleString();

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

function Testimonials() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          section.classList.add("testimonials-visible");
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
      className="testimonials-section"
      id="clients"
      ref={sectionRef}
    >
      {/* HEADER */}
      <div className="testimonials-header">
        <div>
          <p className="testimonials-label">CLIENT VOICES · GLOBAL TRUST</p>

          <SplitHeading
            tag="h2"
            lines={[
              { text: "Trusted by" },
              { text: "leading creators.", italic: true },
            ]}
            className="testimonials-title"
            visibleClass="testimonials-visible"
            baseDelay={100}
            charDelay={38}
            lineGap={80}
          />
        </div>

        <p className="testimonials-intro">
          From visionary architects to international builders across 25+
          countries, explore why leading designers trust VED EXIM ceramic
          surfaces for their most ambitious architectural projects.
        </p>
      </div>

      {/* STATS STRIP WITH COUNT-UP ANIMATION */}
      <div className="testimonials-stats-grid">
        {stats.map((stat, i) => (
          <div className="testimonials-stat-card" key={i}>
            <span className="stat-number">
              <CountUpNumber
                target={stat.target}
                suffix={stat.suffix}
                decimals={stat.decimals}
                active={isVisible}
              />
            </span>
            <strong className="stat-label">{stat.label}</strong>
            <span className="stat-detail">{stat.detail}</span>
          </div>
        ))}
      </div>

      {/* TESTIMONIALS GRID */}
      <div className="testimonials-grid">
        {testimonials.map((item) => (
          <article className="testimonial-card" key={item.number}>
            <div className="testimonial-top">
              <span className="testimonial-number">{item.number}</span>

              <div className="testimonial-stars" aria-label="5 out of 5 stars">
                {"★★★★★"}
              </div>
            </div>

            <blockquote className="testimonial-quote">
              "{item.quote}"
            </blockquote>

            <div className="testimonial-footer">
              <div className="testimonial-author">
                <h3>{item.client}</h3>
                <p className="testimonial-role">
                  {item.role} · <span>{item.firm}</span>
                </p>
              </div>

              <div className="testimonial-meta">
                <span className="testimonial-location">
                  📍 {item.location}
                </span>
                <span className="testimonial-project">
                  {item.project}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* FOOTER BAR */}
      <div className="testimonials-bottom-bar">
        <span>VED EXIM · GLOBAL EXCELLENCE</span>

        <span className="testimonials-badge">
          CERTIFIED 100% EXPORT GRADE QUALITY
        </span>

        <a href="#contact" className="testimonials-cta-link">
          START YOUR PROJECT ↗
        </a>
      </div>
    </section>
  );
}

export default Testimonials;
