// pages/AdminDashboard.tsx or wherever you need it
import { useState } from 'react';
import Sidebar from '../components/SideBar';
import UsersTable from '../components/UsersTable';
import content from "../data/content.json"


const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return<> <p>Gestion des utilisateurs</p> <UsersTable users={content.users} /> </>;
      case 'roles':
        return <p>Gestion des rôles ici.</p>;
      case 'permissions':
        return <p>Gestion des permissions ici.</p>;
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
