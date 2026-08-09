import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Collections from "./sections/Collections";
import Products from "./sections/Products";
import WhyUs from "./sections/WhyUs";
import Process from "./sections/Process";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <About />

        <Collections />

        <Products />

        <WhyUs />

        <Process />

        <Contact />

        <Footer />

        <WhatsAppButton />
      </main>
    </>
  );
}

export default App;