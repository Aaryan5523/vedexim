import { useEffect, useRef } from "react";
import "./About.css";

function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      className="about-section"
      id="about"
      ref={sectionRef}
    >

      <div className="about-image">

        <div className="about-image-inner">

          <img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85"
            alt="Luxury ceramic interior"
          />

        </div>

        <span className="about-image-label">
          VED EXIM / 01
        </span>

      </div>


      <div className="about-content">

        <p className="section-label">
          ABOUT VED EXIM
        </p>

        <h2>
          Surfaces
          <br />
          <em>with character.</em>
        </h2>

        <p className="about-text">
          VED EXIM brings together refined ceramic surfaces,
          contemporary design and dependable quality to create
          spaces that feel timeless.
        </p>

        <p className="about-text">
          From carefully selected ceramic tiles to sophisticated
          surface solutions, every collection is chosen with
          attention to detail, durability and modern aesthetics.
        </p>


        <div className="about-stats">

          <div>
            <strong>01</strong>
            <span>Quality</span>
          </div>

          <div>
            <strong>02</strong>
            <span>Precision</span>
          </div>

          <div>
            <strong>03</strong>
            <span>Design</span>
          </div>

        </div>


        <a
          href="#collections"
          className="about-link"
        >
          Discover VED EXIM
          <span>↗</span>
        </a>

      </div>

    </section>
  );
}

export default About;