import { useLocation } from 'react-router-dom';
import UsersPage from './UsersPage';
import RolesPage from './RolesPage';
import PermissionsPage from './PermissionsPage';
import MsisdnPage from './MsisdnPage';
import Sidebar from '../components/SideBar';

const AdminDashboard = () => {
  const location = useLocation();

  // Map routes to tab IDs
  const pathToTabId: Record<string, string> = {
    '/admin/users': 'users',
    '/admin/roles': 'roles',
    '/admin/permissions': 'permissions',
    '/admin/auditLogs': 'auditLogs',
    '/admin/msisdn': 'msisdn',
  };

  // Get active tab from current path or fallback to 'users'
  const activeTab = pathToTabId[location.pathname] || 'users';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersPage />;
      case 'roles':
        return <RolesPage />;
      case 'permissions':
        return <PermissionsPage />;
      case 'auditLogs':
        return <p>Logs d’audit ici.</p>;
      case 'msisdn':
        return <MsisdnPage />;
      default:
        return <p>Contenu non disponible.</p>;
    }
  };

 

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} onTabChange={() => {}} />

      <main className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className="text-slate-600">{renderTabContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
