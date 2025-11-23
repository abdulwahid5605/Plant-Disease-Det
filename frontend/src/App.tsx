import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/LoginRegister";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/footer";
import { Toaster } from "./components/ui/toaster";
import Dashboard from "./pages/Dashboard";
import ContactForm from "./pages/ContactForm";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
