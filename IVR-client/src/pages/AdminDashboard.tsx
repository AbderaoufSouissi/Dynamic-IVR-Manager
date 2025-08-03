// adjust path if needed
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/header/DashboardHeader";
import Sidebar from "../components/sideBar/SideBar";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header - Full width at top */}
      <DashboardHeader/>
      {/* Content area with sidebar and main content side by side */}
      <div className="flex flex-1">
        {/* Sidebar - Fixed on the left */}
        <Sidebar activeTab={""} onTabChange={() => { }} />

        {/* Main content area - Matches UsersPage styling */}
        <main className="flex-1 overflow-auto p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;