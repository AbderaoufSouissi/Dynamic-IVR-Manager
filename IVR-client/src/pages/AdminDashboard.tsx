
import { useState } from 'react';
import Sidebar from '../components/SideBar';
import UsersPage from './UsersPage';
import RolesPage from './RolesPage';
import PermissionsPage from './PermissionsPage';


const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersPage/>;
      case 'roles':
        return <RolesPage/>;
      case 'permissions':
        return <PermissionsPage/>;
      case 'auditLogs':
        return <p>Logs d’audit ici.</p>;
      default:
        return <p>Contenu non disponible.</p>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className="text-slate-600">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
