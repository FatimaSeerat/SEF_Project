import { Routes, Route } from "react-router-dom"; // <-- Import Routes
import Navbar from "./components/landing/Navbar";
import HeroSection from "./components/landing/HeroSection";
import FeaturesSection from "./components/landing/FeaturesSection";
import HowItWorksSection from "./components/landing/HowItWorksSection";
import FAQSection from "./components/landing/FAQSection";
import Footer from "./components/landing/Footer";
import Auth from "./components/pages/Auth"; // <-- Auth page
import Dashboard from "./components/pages/Dashboard";
import QuizGenerator from "./components/pages/QuizGenerator";

const App = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path="/"
        element={
          <>
            <main className="min-h-screen bg-background">
              <Navbar />
              <HeroSection />
              <FeaturesSection />
              <HowItWorksSection />
              <FAQSection />
              <Footer />
            </main>
          </>
        }
      />

      {/* Register / Auth Page */}
      <Route path="/register" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/quiz" element={<QuizGenerator />} />

    </Routes>
  );
};

export default App;
