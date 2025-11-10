import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/LoginRegister";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/footer";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster /> 
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}