import { TbLayoutDashboard } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

const Header = () => {
  return (
    <header className="flex-shrink-0 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TbLayoutDashboard size={40} className="text-blue-700" />
            <h2 className="text-xl font-medium text-gray-900">
              Dynamic IVR Manager
            </h2>
          </div>
          <div>
            <nav className="absolute inset-0 flex items-center justify-center">
              <a
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 px-3 py-1 rounded-md hover:bg-gray-50"
                href="#features"
              >
                Fonctionnalités
              </a>
            </nav>
          </div>

          <div className="flex items-center justify-between">
    
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
