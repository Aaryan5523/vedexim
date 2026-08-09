import { useEffect, useRef } from "react";
import "./WhyUs.css";

const reasons = [
  {
    number: "01",
    title: "Quality",
    text: "Carefully selected ceramic surfaces with a focus on durability, finish and consistency.",
  },
  {
    number: "02",
    title: "Design",
    text: "Contemporary collections created to complement modern architecture and interiors.",
  },
  {
    number: "03",
    title: "Precision",
    text: "Attention to detail across every surface, texture, tone and finish.",
  },
  {
    number: "04",
    title: "Reliability",
    text: "A dependable approach built around professional service and long-term relationships.",
  },
];

function WhyUs() {
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
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="why-section"
      id="why-us"
      ref={sectionRef}
    >

      {/* HEADER */}

      <div className="why-header">

        <div>
          <p className="why-label">
            WHY VED EXIM
          </p>

          <h2>
            Built on quality.
            <br />
            <em>Defined by detail.</em>
          </h2>
        </div>

        <p className="why-intro">
          We believe exceptional spaces begin with
          exceptional surfaces. Every collection is
          selected with purpose, precision and a
          commitment to lasting quality.
        </p>

      </div>


      {/* REASONS */}

      <div className="why-grid">

        {reasons.map((reason) => (
          <article
            className="why-card"
            key={reason.number}
          >

            <span className="why-number">
              {reason.number}
            </span>

            <div className="why-card-content">

              <h3>
                {reason.title}
              </h3>

              <p>
                {reason.text}
              </p>

            </div>

            <span className="why-arrow">
              ↗
            </span>

          </article>
        ))}

      </div>


      {/* BOTTOM STATEMENT */}

      <div className="why-statement">

        <span>
          VED EXIM
        </span>

        <p>
          Every surface is selected
          <br />
          <em>with purpose.</em>
        </p>

        <span>
          CERAMICS / 2026
        </span>

      </div>

    </section>
  );
}

export default WhyUs;