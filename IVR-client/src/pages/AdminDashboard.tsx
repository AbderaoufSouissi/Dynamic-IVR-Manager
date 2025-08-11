// adjust path if needed
import { Outlet, useNavigate } from "react-router-dom";
import DashboardHeader from "../components/headers/DashboardHeader";
import Sidebar from "../components/sideBar/SideBar";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";




    
const AdminDashboard = () => {



  const { hasPermission } = useAuth()

const [activeTab, setActiveTab] = useState("");

const navigate = useNavigate()

const hasAdminPanelAccess =
    hasPermission("read:users") ||
    hasPermission("read:permissions") ||
    hasPermission("read:roles");

  const hasMsisdnAccess =
    hasPermission("verify:msisdn") ||
    hasPermission("reset:msisdn") ||
    hasPermission("blacklist:msisdn") ||
    hasPermission("whitelist:msisdn");


useEffect(() => {
    if (hasAdminPanelAccess) {
      setActiveTab("admin");
    
    } else if (hasMsisdnAccess) {
      setActiveTab("msisdn");
      navigate("/admin/msisdn");
    }
  }, [hasAdminPanelAccess, hasMsisdnAccess, navigate]);
  return (
    <div className="flex flex-col min-h-screen">

      
      
    
      <DashboardHeader/>
      
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} onTabChange={() => { }} />

        <main className="flex-1 overflow-auto p-2 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;