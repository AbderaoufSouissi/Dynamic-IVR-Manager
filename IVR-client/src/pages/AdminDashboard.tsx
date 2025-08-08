// adjust path if needed
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/headers/DashboardHeader";
import Sidebar from "../components/sideBar/SideBar";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
    
      <DashboardHeader/>
      
      <div className="flex flex-1">
        <Sidebar activeTab={""} onTabChange={() => { }} />

        <main className="flex-1 overflow-auto p-2 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;