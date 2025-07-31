import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sideBar/SideBar';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={""} onTabChange={() => {}} />

      <main className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};


export default AdminDashboard;
