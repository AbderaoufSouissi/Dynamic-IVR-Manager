// components/Sidebar.tsx
import type { IconType } from 'react-icons';
import { FaUserAlt, FaShieldAlt } from "react-icons/fa";
import { HiOutlineKey } from "react-icons/hi2";
import { FiFileText, FiPhone } from "react-icons/fi";
import { NavLink, useLocation } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { useState } from 'react';
import LogoutModal from '../modal/LogoutModal';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: IconType;
  route?: string;
   requiredPermission?: string | string[];
}

const navItems: NavItem[] = [
  { id: 'users', label: 'Utilisateurs', icon: FaUserAlt, route: '/admin/users', requiredPermission: 'read:users' },
  { id: 'roles', label: 'Rôles', icon: FaShieldAlt, route: '/admin/roles', requiredPermission: 'read:roles' },
  { id: 'permissions', label: 'Permissions', icon: HiOutlineKey, route: '/admin/permissions', requiredPermission: 'read:permissions' },
  { id: 'auditLogs', label: 'Audit', icon: FiFileText, route: '/admin/auditLogs', requiredPermission: 'read:audits' },
  { id: 'msisdn', label: 'MSISDN', icon: FiPhone, route: '/admin/msisdn', requiredPermission: ['verify:msisdn', 'blacklist:msisdn', 'whitelist:msisdn', 'reset:msisdn'] },
  { id: 'logout', label: 'Se Déconnecter', icon: BiLogOut, route: '/logout' },
];

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const { hasPermission } = useAuth(); 

   const canAccess = (requiredPermission?: string | string[]) => {
    if (!requiredPermission) return true; // no permission required, show by default

    if (Array.isArray(requiredPermission)) {
      return requiredPermission.some(perm => hasPermission(perm));
    }
    return hasPermission(requiredPermission);
  };

  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 👈 Track modal visibility



  // Function to check if current route matches the nav item
  const isRouteActive = (route: string | undefined) => {
    if (!route) return false;
    return location.pathname === route || location.pathname.startsWith(route);
  };

  return (
    <>
    <aside className="flex flex-col w-[15%] bg-white border-r border-gray-200 min-h-screen shadow-lg">
  

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
         {navItems
            .filter(({ requiredPermission }) => canAccess(requiredPermission))
            .map(({ id, label, icon: Icon, route }) => {
              const isActive = isRouteActive(route) || activeTab === id;

              const onClick = id === 'logout'
                ? (e: React.MouseEvent) => {
                    e.preventDefault();
                    setShowLogoutModal(true);
                    onTabChange(id);
                  }
                : () => onTabChange(id);

              return (
                <NavLink
                  key={id}
                  to={id === 'logout' ? '#' : route || '#'}
                  onClick={onClick}
                  className={`
                    group flex items-center w-full gap-3 px-4 py-2 rounded-xl transition-all duration-200 relative overflow-hidden
                    ${id === 'logout' 
                      ? 'hover:bg-red-50 hover:text-red-600 text-gray-700'
                      : isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25 transform scale-[1.02]'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
                    }
                  `}
                >
                  {isActive && id !== 'logout' && (
                    <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 rounded-r-md"></div>
                  )}
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
                  {!isActive && id !== 'logout' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
                  )}
                  {id === 'logout' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
                  )}
                </NavLink>
              );
            })}
      </nav>


    </aside>
    {showLogoutModal && (
        <LogoutModal  onClose={() => setShowLogoutModal(false)}/>
  )
  }
  </>
  );
};

export default Sidebar;