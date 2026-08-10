import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./OurProcessPage.css";

const processSteps = [
  {
    number: "01",
    title: "Raw Materials",
    subtitle: "THE FOUNDATION",
    description:
      "The ceramic journey begins with carefully selected mineral raw materials. Clay, feldspar, quartz, kaolin and other ceramic ingredients are prepared according to the required body and technical characteristics.",
    detail:
      "Material selection influences strength, colour, surface behaviour and final performance.",
    image:
      "https://www.marbizsurfaces.com/public/images/blog/17691677500_Tile-manufacturing-plant-in-Morbi.jpg",
  },

  {
    number: "02",
    title: "Batching & Grinding",
    subtitle: "PRECISION IN COMPOSITION",
    description:
      "The selected raw materials are proportioned and processed to create a consistent ceramic body. Grinding reduces the raw materials to a controlled particle size and produces a homogeneous mixture.",
    detail:
      "Consistent composition is essential for repeatable production and dimensional stability.",
    image:
      "https://www.platinumtiles.in/uploads/infrastructure/o_1bo1pcmav1jnraui19b5ok712lui.jpg",
  },

  {
    number: "03",
    title: "Spray Drying",
    subtitle: "FROM SLIP TO GRANULE",
    description:
      "The prepared ceramic slip is converted into granules with controlled moisture and particle distribution. These granules are designed to flow consistently into the pressing stage.",
    detail:
      "Controlled granulation helps create uniform pressing behaviour across the production line.",
    image:
      "https://www.marbizsurfaces.com/public/images/blog/17691677500_Tile-manufacturing-plant-in-Morbi.jpg",
  },

  {
    number: "04",
    title: "Pressing",
    subtitle: "FORMING THE TILE",
    description:
      "Ceramic granules are compacted under high pressure inside precision moulds. The pressing stage establishes the basic dimensions, density and geometry of the unfired tile.",
    detail:
      "Modern Morbi plants also use advanced pressing systems for large-format ceramic panels and slabs.",
    image:
      "https://storico.b-cdn.net/image/manufacturing-hub.webp",
  },

  {
    number: "05",
    title: "Drying",
    subtitle: "PREPARING FOR THE KILN",
    description:
      "After pressing, the unfired tile contains residual moisture. Controlled drying strengthens the green body and prepares it for decoration and high-temperature firing.",
    detail:
      "Careful drying reduces the risk of deformation and cracking during later thermal processing.",
    image:
      "https://www.thehawk.in/_next/image?q=75&url=https%3A%2F%2Fd2py10ayqu2jji.cloudfront.net%2Fd873dcff-2349-4af5-98c4-03aace2a1452-202601053628759-b54fd020-b014-4827-ad07-4b653d573e7f.jpeg&w=3840",
  },

  {
    number: "06",
    title: "Glazing & Digital Decoration",
    subtitle: "CREATING CHARACTER",
    description:
      "Surface treatments, engobes, glazes and digital decoration are applied to develop the final visual character. Modern digital printing technology can reproduce sophisticated marble, stone and other decorative patterns.",
    detail:
      "Morbi manufacturers use advanced digital decoration systems for detailed graphics and premium surface effects.",
    image:
      "https://m.economictimes.com/thumb/height-450%2Cwidth-600%2Cimgsize-115796%2Cmsid-130903398/employees-work-at-a-ceramic-tile-production-line-at-a-factory-in-morbi.jpg",
  },

  {
    number: "07",
    title: "Kiln Firing",
    subtitle: "TRANSFORMATION THROUGH HEAT",
    description:
      "The decorated tile enters a controlled high-temperature kiln. Thermal processing transforms the pressed body into a strong ceramic product while developing the required surface and technical properties.",
    detail:
      "Kiln temperature, atmosphere and firing cycle are carefully controlled for consistent results.",
    image:
      "https://awsimages.detik.net.id/community/media/visual/2026/03/06/dari-tanah-mentah-hingga-jadi-ubin-aktivitas-pabrik-keramik-di-gujarat-1772799482166_169.jpeg?q=90&w=700",
  },

  {
    number: "08",
    title: "Quality Inspection",
    subtitle: "EVERY DETAIL MATTERS",
    description:
      "Finished tiles are inspected for dimensions, surface appearance, shade, flatness, defects and overall consistency. Automated production and human inspection work together to maintain quality.",
    detail:
      "Inspection ensures that only products meeting the required specifications move forward.",
    image:
      "https://www.thehawk.in/_next/image?q=75&url=https%3A%2F%2Fd2py10ayqu2jji.cloudfront.net%2Fd873dcff-2349-4af5-98c4-03aace2a1452%2F202601053628759-b54fd020-b014-4827-ad07-4b653d573e7f.jpeg&w=3840",
  },

  {
    number: "09",
    title: "Sorting & Packing",
    subtitle: "READY FOR DELIVERY",
    description:
      "Approved tiles are sorted according to product, shade, size and batch before being securely packed. Packaging protects the finished surfaces during handling, storage and transportation.",
    detail:
      "Careful batch identification helps maintain consistency from production through delivery.",
    image:
      "https://storico.b-cdn.net/image/manufacturing-hub.webp",
  },

  {
    number: "10",
    title: "Dispatch & Logistics",
    subtitle: "FROM MORBI TO THE WORLD",
    description:
      "Once packed, finished products move into the logistics network for domestic distribution or export. Morbi's industrial ecosystem benefits from established road, rail and port connectivity.",
    detail:
      "Ports including Mundra, Kandla and Navlakhi support the region's broader export logistics.",
    image:
      "https://www.marbizsurfaces.com/public/images/blog/17691677500_Tile-manufacturing-plant-in-Morbi.jpg",
  },
];


function OurProcessPage() {
  const pageRef = useRef(null);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const timer = setTimeout(() => {
      page.classList.add("process-page-visible");
    }, 80);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.target.dataset.step
          ) {
            setActiveStep(
              Number(entry.target.dataset.step)
            );
          }
        });
      },
      {
        threshold: 0.55,
      }
    );

    const sections =
      document.querySelectorAll(
        ".process-step"
      );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);


  return (
    <main
      className="process-page"
      ref={pageRef}
    >

      {/* =========================================
          HERO
      ========================================= */}

      <section className="process-hero">

        <div className="process-hero-image">

          <img
            src={processSteps[0].image}
            alt="Morbi Gujarat ceramic manufacturing"
          />

          <div className="process-hero-overlay" />

        </div>


        <div className="process-hero-content">

          <p className="process-eyebrow">
            VED EXIM · OUR PROCESS
          </p>

          <h1>
            From earth
            <br />
            <em>to surface.</em>
          </h1>

          <p>
            A closer look at the journey behind
            contemporary ceramic surfaces —
            from raw material preparation in
            Morbi, Gujarat to the finished product.
          </p>

        </div>


        <div className="process-hero-meta">

          <span>
            MORBI · GUJARAT · INDIA
          </span>

          <span>
            10 STAGES
          </span>

          <span>
            SCROLL TO EXPLORE ↓
          </span>

        </div>

      </section>


      {/* =========================================
          MORBI INTRO
      ========================================= */}

      <section className="process-intro">

        <div className="process-section-label">
          <span>01</span>
          THE MORBI ECOSYSTEM
        </div>


        <div className="process-intro-grid">

          <h2>
            Where ceramic
            <br />
            <em>becomes an industry.</em>
          </h2>


          <div className="process-intro-copy">

            <p>
              Morbi, Gujarat has evolved into one
              of India's most important ceramic
              manufacturing clusters.
            </p>

            <p>
              The region brings together raw
              material suppliers, manufacturers,
              technology providers, designers,
              skilled workers, packaging and
              logistics into a highly connected
              production ecosystem.
            </p>

            <p>
              For VED EXIM, this ecosystem means
              access to a broad world of ceramic
              surfaces and manufacturing
              capabilities — from everyday tiles
              to sophisticated large-format
              surfaces.
            </p>

          </div>

        </div>


        <div className="process-stat-grid">

          <div>
            <strong>90%</strong>
            <span>
              OF INDIA'S CERAMIC TILE
              PRODUCTION — INDUSTRY ESTIMATE
            </span>
          </div>

          <div>
            <strong>1,800+</strong>
            <span>
              MANUFACTURING FACILITIES
              IN THE MORBI CLUSTER
            </span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>
              CONTINUOUS INDUSTRIAL
              PRODUCTION ENVIRONMENT
            </span>
          </div>

        </div>

      </section>


      {/* =========================================
          PROCESS TIMELINE
      ========================================= */}

      <section className="process-timeline">

        <div className="process-timeline-header">

          <div>

            <p className="process-eyebrow">
              THE JOURNEY
            </p>

            <h2>
              Ten stages.
              <br />
              <em>One surface.</em>
            </h2>

          </div>

          <p>
            Every finished ceramic surface is
            the result of a sequence of controlled
            processes. Explore each stage below.
          </p>

        </div>


        {/* PROGRESS */}

        <div className="process-progress">

          <div
            className="process-progress-line"
            style={{
              transform:
                `scaleX(${(activeStep + 1) / processSteps.length})`,
            }}
          />

          {processSteps.map((step, index) => (

            <button
              type="button"
              key={step.number}
              className={
                index === activeStep
                  ? "process-progress-dot active"
                  : "process-progress-dot"
              }
              onClick={() => {
                document
                  .querySelector(
                    `[data-step="${index}"]`
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
              }}
              aria-label={`Go to ${step.title}`}
            >
              {step.number}
            </button>

          ))}

        </div>


        {/* PROCESS STEPS */}

        <div className="process-steps">

          {processSteps.map((step, index) => (

            <article
              className="process-step"
              data-step={index}
              key={step.number}
            >

              <div className="process-step-image">

                <img
                  src={step.image}
                  alt={`${step.title} in ceramic manufacturing`}
                  loading={
                    index < 2
                      ? "eager"
                      : "lazy"
                  }
                />

                <div className="process-step-image-number">
                  {step.number}
                </div>

              </div>


              <div className="process-step-content">

                <p className="process-step-subtitle">
                  {step.subtitle}
                </p>

                <h3>
                  {step.title}
                </h3>

                <p className="process-step-description">
                  {step.description}
                </p>

                <div className="process-step-detail">

                  <span>
                    DETAIL
                  </span>

                  <p>
                    {step.detail}
                  </p>

                </div>

                <div className="process-step-bottom">

                  <span>
                    STAGE {step.number}
                  </span>

                  <span>
                    VED EXIM · MORBI
                  </span>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =========================================
          TECHNOLOGY
      ========================================= */}

      <section className="process-technology">

        <div className="process-technology-image">

          <img
            src="https://www.marbizsurfaces.com/public/images/blog/17691677500_Tile-manufacturing-plant-in-Morbi.jpg"
            alt="Modern ceramic production line in Morbi"
          />

        </div>


        <div className="process-technology-content">

          <p className="process-eyebrow">
            TECHNOLOGY & PRECISION
          </p>

          <h2>
            Craftsmanship,
            <br />
            <em>scaled by technology.</em>
          </h2>

          <p>
            Modern Morbi manufacturing combines
            industrial automation with highly
            controlled ceramic processes. Digital
            decoration, advanced pressing,
            automated handling and sophisticated
            glazing systems allow manufacturers
            to create increasingly detailed and
            large-format surfaces.
          </p>

          <p>
            The result is a production environment
            where consistency, design flexibility
            and scale can work together.
          </p>

        </div>

      </section>


      {/* =========================================
          QUALITY
      ========================================= */}

      <section className="process-quality">

        <div className="process-section-label">
          <span>03</span>
          QUALITY AT EVERY STAGE
        </div>


        <div className="process-quality-grid">

          <div>

            <h2>
              Detail is not
              <br />
              <em>the final step.</em>
            </h2>

          </div>


          <div className="process-quality-list">

            <div>
              <span>01</span>
              <strong>Material consistency</strong>
              <p>
                Controlled raw material composition
                supports repeatable production.
              </p>
            </div>

            <div>
              <span>02</span>
              <strong>Dimensional accuracy</strong>
              <p>
                Pressing, drying and firing are
                carefully controlled to maintain
                product consistency.
              </p>
            </div>

            <div>
              <span>03</span>
              <strong>Surface quality</strong>
              <p>
                Decoration, glaze and finishing
                stages define the visual character.
              </p>
            </div>

            <div>
              <span>04</span>
              <strong>Final inspection</strong>
              <p>
                Finished products are checked before
                sorting, packing and dispatch.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="process-cta">

        <p className="process-eyebrow">
          VED EXIM
        </p>

        <h2>
          Know the process.
          <br />
          <em>Choose with confidence.</em>
        </h2>

        <p>
          Explore our collections or speak with
          the VED EXIM team about your next project.
        </p>

        <div className="process-cta-links">

          <Link to="/collections">
            EXPLORE COLLECTIONS
            <span>↗</span>
          </Link>

          <Link to="/#contact">
            START AN ENQUIRY
            <span>↗</span>
          </Link>

        </div>

      </section>

    </main>
  );
}

export default OurProcessPage;