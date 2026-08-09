import Hero from "../sections/Hero";
import About from "../sections/About";
import Collections from "../sections/Collections";
import Products from "../sections/Products";
import WhyUs from "../sections/WhyUs";
import Process from "../sections/Process";
import Contact from "../sections/Contact";

function Home() {
  return (
    <main className="home-page">

      <Hero />

      <About />

      <Collections />

      <Products />

      <WhyUs />

      <Process />

      <Contact />

    </main>
  );
}

export default Home;