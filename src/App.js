
import Navbar from "./components/landing/Navbar";
import HeroSection from "./components/landing/HeroSection";
import FeaturesSection from "./components/landing/FeaturesSection";
import HowItWorksSection from "./components/landing/HowItWorksSection";
import FAQSection from "./components/landing/FAQSection";
import Footer from "./components/landing/Footer";

const Index = () => {
  return (
    <>

      <main className="min-h-screen bg-background ">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FAQSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
