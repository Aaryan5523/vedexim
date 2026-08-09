import { useEffect, useRef } from "react";
import "./Process.css";

const processSteps = [
  {
    number: "01",
    title: "Selection",
    text: "Every collection begins with carefully selected materials, refined textures and considered finishes.",
  },
  {
    number: "02",
    title: "Precision",
    text: "Quality control and attention to detail ensure consistency across every surface and collection.",
  },
  {
    number: "03",
    title: "Refinement",
    text: "Modern techniques transform carefully selected materials into sophisticated ceramic surfaces.",
  },
  {
    number: "04",
    title: "Delivery",
    text: "Reliable service brings the finished collection from our selection to your project.",
  },
];

function Process() {
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
      className="process-section"
      id="process"
      ref={sectionRef}
    >
      {/* HEADER */}

      <div className="process-header">

        <div>
          <p className="process-label">
            OUR PROCESS
          </p>

          <h2>
            From material
            <br />
            <em>to masterpiece.</em>
          </h2>
        </div>

        <p className="process-intro">
          A considered process where material,
          craftsmanship and quality come together
          to create surfaces made for modern spaces.
        </p>

      </div>


      {/* PROCESS STEPS */}

      <div className="process-grid">

        {processSteps.map((step) => (
          <article
            className="process-card"
            key={step.number}
          >
            <div className="process-card-top">

              <span className="process-number">
                {step.number}
              </span>

              <span className="process-line"></span>

            </div>

            <div className="process-card-content">

              <h3>
                {step.title}
              </h3>

              <p>
                {step.text}
              </p>

            </div>

            <span className="process-arrow">
              ↗
            </span>
          </article>
        ))}

      </div>


      {/* BOTTOM STATEMENT */}

      <div className="process-statement">

        <span>
          VED EXIM
        </span>

        <h3>
          Quality in
          <br />
          <em>every detail.</em>
        </h3>

        <span>
          CERAMICS / SURFACES
        </span>

      </div>

    </section>
  );
}

export default Process;