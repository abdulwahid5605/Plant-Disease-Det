import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/footer";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}