
import { TbLayoutDashboard } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TbLayoutDashboard size={40} className="text-blue-700" />
              <h2 className="text-xl font-bold text-gray-900">
                Tableau de Bord
              </h2>
            </div>

            <nav className="absolute left-1/2 transform -translate-x-1/2">
              <a
                className="text-gray-600 hover:text-blue-600 font-medium transition"
                href="#features"
              >
                Fonctionnalités
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <NavLink
                className="hidden md:flex items-center justify-center rounded-lg h-10 px-5 bg-blue-600 text-white font-bold text-sm shadow-lg hover:shadow-xl transition"
                to={"/login"}
              >
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header