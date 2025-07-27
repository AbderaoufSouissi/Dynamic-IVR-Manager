import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import HeroSection from "../components/sections/HeroSection";

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
