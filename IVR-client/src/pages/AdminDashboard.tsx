import { Outlet, useNavigate } from "react-router-dom";
import DashboardHeader from "../components/headers/DashboardHeader";
import Sidebar from "../components/sideBar/SideBar";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false); // NEW
  const navigate = useNavigate();

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
    <div className="flex min-h-screen w-full bg-slate-50">
      <Sidebar
        activeTab={activeTab}
        onTabChange={() => {}}
        mobileOpen={mobileOpen}       
        setMobileOpen={setMobileOpen} 
      />

      <div className="flex flex-1 flex-col">
        {/* Pass toggle to header */}
        <DashboardHeader setMobileOpen={setMobileOpen} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
