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
            <h2 className="text-xl font-bold text-gray-900">Dynamic IVR Manager</h2>
          </div>

          <nav className="absolute left-1/2 transform -translate-x-1/2">
            <a
              className="text-gray-600 hover:text-blue-600 font-medium transition"
              href="#features"
            >
              Fonctionnalités
            </a>
          </nav>

          <div className="flex items-center justify-between">
            <a href="#" className="text-sm/6 font-semibold text-gray-900"></a>
            <NavLink
              className="hidden md:flex items-center justify-center rounded-lg h-10 px-5 text-blue-700 font-bold text-sm transition"
              to={"/login"}
            >
              <p className="-mx-3 text-blue-700 rounded-lg px-3 py-2.5 text-base/7 font-semibold hover:bg-gray-50 flex items-center">
                Log in <GoArrowRight className="ml-1 mt-1" />
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;