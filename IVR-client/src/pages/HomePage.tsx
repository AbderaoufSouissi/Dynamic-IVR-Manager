import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col scroll-smooth">
  
      <Header/>
      <HeroSection />
      <Footer />
    </div>
  );
};

export default HomePage;
