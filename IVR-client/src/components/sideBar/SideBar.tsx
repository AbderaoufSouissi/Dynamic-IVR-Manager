// components/Sidebar.tsx
import type { IconType } from 'react-icons';
import { FaUserAlt, FaShieldAlt } from "react-icons/fa";
import { HiOutlineKey } from "react-icons/hi2";
import { FiFileText, FiPhone } from "react-icons/fi";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { TbLayoutDashboard } from 'react-icons/tb';
import { logout } from '../../service/AuthService';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: IconType;
  route?: string;
}

const navItems: NavItem[] = [
  { id: 'users', label: 'Utilisateurs', icon: FaUserAlt, route: '/admin/users' },
  { id: 'roles', label: 'Rôles', icon: FaShieldAlt, route: '/admin/roles' },
  { id: 'permissions', label: 'Permissions', icon: HiOutlineKey, route: '/admin/permissions' },
  { id: 'auditLogs', label: 'Audit', icon: FiFileText, route: '/admin/auditLogs' },
  { id: 'msisdn', label: 'MSISDN', icon: FiPhone, route: '/admin/msisdn' },
  { id: 'logout', label: 'Logout', icon: BiLogOut, route: '/' },
];

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Function to check if current route matches the nav item
  const isRouteActive = (route: string | undefined) => {
    if (!route) return false;
    return location.pathname === route || location.pathname.startsWith(route);
  };

  return (
    <aside className="flex flex-col w-64 bg-gradient-to-b from-slate-50 to-white border-r border-gray-200 min-h-screen shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <TbLayoutDashboard size={30} className='text-blue-700 mr-2' />
        <NavLink 
          className="text-xl font-bold text-gray-900 hover:text-blue-700 transition-colors" 
          to={'/admin'}
        >
          Tableau de Bord
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ id, label, icon: Icon, route }) => {
          // Determine if this item is active based on current route
          const isActive = isRouteActive(route) || activeTab === id;

          const onClick = id === 'logout'
            ? (e: React.MouseEvent) => {
                e.preventDefault();
                handleLogout();
                onTabChange(id);
              }
            : () => onTabChange(id);

          return (
            <NavLink
              key={id}
              to={id === 'logout' ? '#' : route || '#'}
              onClick={onClick}
              className={`
                group flex items-center w-full gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden
                ${id === 'logout' 
                  ? 'hover:bg-red-50 hover:text-red-600 text-gray-700'
                  : isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25 transform scale-[1.02]'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
                }
              `}
            >
              {/* Active indicator bar */}
              {isActive && id !== 'logout' && (
  <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 rounded-r-md"></div>
)}
              
              {/* Icon */}
              <Icon 
                size={20} 
                className={`
                  transition-all duration-200 z-10
                  ${id === 'logout'
                    ? 'group-hover:text-red-600'
                    : isActive 
                      ? 'text-white drop-shadow-sm' 
                      : 'group-hover:text-blue-600 group-hover:scale-110'
                  }
                `}
              />
              
              {/* Label */}
              <span className={`
                text-sm font-medium transition-all duration-200 z-10
                ${id === 'logout'
                  ? 'group-hover:text-red-600'
                  : isActive 
                    ? 'text-white font-semibold' 
                    : 'group-hover:text-blue-600'
                }
              `}>
                {label}
              </span>

              {/* Hover glow effect for non-active items */}
              {!isActive && id !== 'logout' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
              )}

              {/* Special styling for logout */}
              {id === 'logout' && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer with user info or branding */}
      <div className="p-4 border-t border-gray-200 bg-white/50">
        <div className="text-xs text-gray-600 text-center">
          Admin Panel v1.0
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;