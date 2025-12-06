import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/LoginRegister";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/footer";
import { Toaster } from "./components/ui/toaster";
import Dashboard from "./pages/Dashboard";
import ContactForm from "./pages/ContactForm";
import GuestRoute from "./components/ui/GuestRoute";
import ProtectedRoute from "./components/ui/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={
          <GuestRoute>
            <Register />
          </GuestRoute>}
        />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/contact" element={
          <ProtectedRoute>
            <ContactForm />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
