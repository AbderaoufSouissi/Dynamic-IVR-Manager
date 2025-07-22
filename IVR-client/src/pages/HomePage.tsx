import { HiOutlineUserAdd } from "react-icons/hi";
import { TbLayoutDashboard } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import { MdOutlineSecurity } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { FaFileAlt, FaKey } from "react-icons/fa";
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
