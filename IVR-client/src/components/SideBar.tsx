// components/Sidebar.tsx
import type { IconType } from 'react-icons';
import { FaUserAlt, FaShieldAlt } from "react-icons/fa";
import { HiOutlineKey } from "react-icons/hi2";
import { FiFileText, FiPhone } from "react-icons/fi";
import { NavLink } from 'react-router-dom';

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
];

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen shadow-sm">
      <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-bold text-gray-800">Tableau de Bord</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1 bg-white">
        {navItems.map(({ id, label, icon: Icon, route }) => {
          const isActive = activeTab === id;
          return (
            <NavLink
              key={id}
              to={route || '#'}
              onClick={() => onTabChange(id)}
              className={`flex items-center w-full gap-3 px-4 py-2 rounded-lg transition 
                ${isActive
                  ? 'bg-blue-100 text-blue-600 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}
              `}
            >
              <Icon size={20} className={isActive ? 'text-blue-600' : ''} />
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
