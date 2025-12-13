import { Routes, Route } from "react-router-dom"; // <-- Import Routes
import Navbar from "./components/PageChrome/Navbar";
import Footer from "./components/PageChrome/Footer";
import Dashboard from "./Pages/Dashboard/Dashboard";
import QuizGenerator from "./Pages/Frontend/QuizGenerator";
import TimeTable from "./Pages/Frontend/TimeTable";
import HeroSection from "./Pages/Frontend/Home/HeroSection";
import FeaturesSection from "./Pages/Frontend/Home/FeaturesSection";
import HowItWorksSection from "./Pages/Frontend/Home/HowItWorksSection";
import FAQSection from "./Pages/Frontend/Home/FAQSection";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

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
      <Route path="/auth" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/quiz" element={<QuizGenerator />} />
      <Route path="/timetable" element={<TimeTable />} />

    </Routes>
  );
};

export default App;
