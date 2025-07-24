// components/Sidebar.tsx
import type { IconType } from 'react-icons';
import { FaUserAlt, FaShieldAlt } from "react-icons/fa";
import { HiOutlineKey } from "react-icons/hi2";
import { FiFileText, FiPhone } from "react-icons/fi";
import { NavLink, useNavigate } from 'react-router-dom';
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
  { id: 'logout', label: 'Logout', icon: BiLogOut , route: '/' },
];





const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {

const navigate = useNavigate()
const handleLogout = async () => {
    try {
      await logout();
      // Optional: clear user state here if you have context or global state
      navigate('/'); // redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
      // Optional: show error notification
    }
  };


  return (
    <aside className="flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen shadow-sm">
      <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200 bg-white">
        <TbLayoutDashboard size={30} className='text-blue-700 mr-1' />
        <NavLink className="text-xl font-bold text-gray-900" to={'/admin'}>Tableau de Bord</NavLink>
      </div>

      <nav className="flex-1 p-4 space-y-1 bg-white ">
        {navItems.map(({ id, label, icon: Icon, route }) => {
          const isActive = activeTab === id;

          // For Logout item, override click behavior:
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
              className={` flex items-center w-full gap-3 px-4 py-2 rounded-lg transition 
                ${isActive
                  ? 'bg-blue-100 text-blue-600 shadow-sm'
                  : 'text-gray-900 hover:bg-gray-100 hover:text-blue-600'}
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
