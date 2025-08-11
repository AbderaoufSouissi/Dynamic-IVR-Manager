import type { IconType } from 'react-icons';
import { FaUserAlt, FaShieldAlt } from "react-icons/fa";
import { HiOutlineKey } from "react-icons/hi2";
import { FiFileText, FiPhone } from "react-icons/fi";
import { NavLink, useLocation } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LogoutModal from '../modal/LogoutModal';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  mobileOpen: boolean; // NEW
  setMobileOpen: (open: boolean) => void; // NEW
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

export default function Sidebar({ activeTab, onTabChange,mobileOpen,setMobileOpen }: SidebarProps) {
  const { hasPermission } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();

  const canAccess = (requiredPermission?: string | string[]) => {
    if (!requiredPermission) return true;
    if (Array.isArray(requiredPermission)) {
      return requiredPermission.some(perm => hasPermission(perm));
    }
    return hasPermission(requiredPermission);
  };

  const isRouteActive = (route: string | undefined) => {
    if (!route) return false;
    return location.pathname === route || location.pathname.startsWith(route);
  };

  const renderNavItems = () =>
    navItems
      .filter(({ requiredPermission }) => canAccess(requiredPermission))
      .map(({ id, label, icon: Icon, route }) => {
        const isActive = isRouteActive(route) || activeTab === id;
        const onClick =
          id === 'logout'
            ? (e: React.MouseEvent) => {
              e.preventDefault();
              setShowLogoutModal(true);
              onTabChange(id);
              setMobileOpen(false);
            }
            : () => {
              onTabChange(id);
              setMobileOpen(false);
            };

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
            <span
              className={`
                text-sm font-medium transition-all duration-200 z-10
                ${id === 'logout'
                  ? 'group-hover:text-red-600'
                  : isActive
                    ? 'text-white font-semibold'
                    : 'group-hover:text-blue-600'
                }
              `}
            >
              {label}
            </span>
          </NavLink>
        );
      });

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white p-4 sm:flex shadow-lg min-h-screen">
        <div className="mb-6 flex items-center gap-2">
          <img src="/logo.svg" alt="" />
          <NavLink to={'/admin'}>
            <h1 className="text font-bold text-gray-800">Dynamic IVR Manager</h1>
          </NavLink>
        </div>
        <nav className="flex-1 space-y-2">{renderNavItems()}</nav>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Dim background with fade */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
          ></div>

          {/* Sidebar content sliding in */}
          <div
            className="relative bg-white w-64 p-4 shadow-lg z-50 flex flex-col transform transition-transform duration-300 translate-x-0"
          >
            <div className="flex items-center justify-between mb-6">
              <NavLink to="/admin" onClick={() => setMobileOpen(false)}>
                <img src="/logo.svg" alt="logo" className="h-6" />
              </NavLink>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded hover:bg-slate-200 transition"
              >
                <HiX size={26} />
              </button>
            </div>
            <nav className="space-y-2">{renderNavItems()}</nav>
          </div>
        </div>
      )}

      {showLogoutModal && <LogoutModal onClose={() => setShowLogoutModal(false)} />}
    </>
  );
}
