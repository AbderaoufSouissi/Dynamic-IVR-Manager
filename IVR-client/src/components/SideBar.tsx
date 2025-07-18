// components/Sidebar.tsx
import type { IconType } from 'react-icons';
import { FaUserAlt, FaShieldAlt } from "react-icons/fa";
import { HiOutlineKey } from "react-icons/hi2";
import { FiFileText } from "react-icons/fi";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: IconType;
}

const navItems: NavItem[] = [
  { id: 'users', label: 'Utilisateurs', icon: FaUserAlt },
  { id: 'roles', label: 'Rôles', icon: FaShieldAlt },
  { id: 'permissions', label: 'Permissions', icon: HiOutlineKey },
  { id: 'auditLogs', label: 'Audit', icon: FiFileText },
];

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen shadow-sm">
      <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-bold text-gray-800">Tableau de Bord</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1 bg-white">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center w-full gap-3 px-4 py-2 rounded-lg transition 
                ${
                  isActive
                    ? 'bg-blue-100 text-blue-600 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }
              `}
            >
              <Icon size={20} className={`${isActive ? 'text-blue-600' : ''}`} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
