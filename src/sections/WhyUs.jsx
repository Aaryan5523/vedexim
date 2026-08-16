import { useEffect, useRef } from "react";
import "./WhyUs.css";
import SplitHeading from "../components/SplitHeading";

const strengths = [
  {
    number: "01",
    title: "Design",
    text: "Thoughtfully selected surfaces that bring refined aesthetics and contemporary character to every space.",
  },
  {
    number: "02",
    title: "Quality",
    text: "Reliable ceramic solutions selected with attention to finish, consistency and long-term performance.",
  },
  {
    number: "03",
    title: "Selection",
    text: "A curated range of marble, stone, terrazzo and architectural surfaces for diverse design requirements.",
  },
  {
    number: "04",
    title: "Service",
    text: "A responsive team focused on understanding your requirements and helping you choose with confidence.",
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
          section.classList.add("why-visible");
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

          <SplitHeading
            tag="h2"
            lines={[
              { text: "More than" },
              { text: "just surfaces.", italic: true },
            ]}
            className="why-title"
            visibleClass="why-visible"
            baseDelay={100}
            charDelay={40}
            lineGap={80}
          />

        </div>

        <p className="why-intro">
          We believe great surfaces are more than
          materials. They shape atmosphere, define
          character and become part of the way a
          space is experienced.
        </p>

      </div>


      {/* STRENGTHS */}

      <div className="why-grid">

        {strengths.map((strength) => (
          <div
            className="why-item"
            key={strength.number}
          >

            <div className="why-item-top">

              <span className="why-number">
                {strength.number}
              </span>

              <span className="why-line"></span>

            </div>

            <h3>
              {strength.title}
            </h3>

            <p>
              {strength.text}
            </p>

          </div>
        ))}

      </div>


      {/* BOTTOM STATEMENT */}

      <div className="why-statement">

        <span>
          VED EXIM
        </span>

        <p>
          Creating surfaces that make
          <em> spaces memorable.</em>
        </p>

        <span>
          EST. INDIA
        </span>

      </div>

    </section>
  );
}

export default WhyUs;