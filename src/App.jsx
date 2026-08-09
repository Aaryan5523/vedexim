import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./sections/Footer";

import Home from "./pages/Home";
import CollectionsPage from "./pages/CollectionsPage";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/collections"
          element={<CollectionsPage />}
        />

      </Routes>

      <WhatsAppButton />

      <Footer />

    </BrowserRouter>
  );
}

export default App;