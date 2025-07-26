import { useEffect, useState } from "react";
import { getUsers } from "../service/UserService";
import { getRoles } from "../service/RoleService";
import { FaUser } from "react-icons/fa6";
import { SiSpringsecurity } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const AdminOverview = () => {
  const [activeUserCount, setActiveUserCount] = useState<number>(0);
  const [inactiveUserCount, setInactiveUserCount] = useState<number>(0);
  const [roleCount, setRoleCount] = useState<number>(0);
  const navigate = useNavigate()

  const recentAudits = [
    {
      user: "Alex Johnson",
      action: "created a new user",
      date: "2024-01-15 10:30 AM",
    },
    {
      user: "Sarah Lee",
      action: "updated a role",
      date: "2024-01-14 03:45 PM",
    },
    {
      user: "David Chen",
      action: "granted a permission",
      date: "2024-01-13 09:12 AM",
    },
    {
      user: "Emily White",
      action: "deleted a user",
      date: "2024-01-12 05:20 PM",
    },
    {
      user: "Michael Brown",
      action: "created a new role",
      date: "2024-01-11 11:55 AM",
    },
  ];

  const fetchNbActiveUsers = async () => {
    try {
      const data = await getUsers({ active: true });
      setActiveUserCount(data.totalElements);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchNbInactiveUsers = async () => {
    try {
      const data = await getUsers({ active: false });
      setInactiveUserCount(data.totalElements);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNbRoles = async () => {
    try {
      const data = await getRoles();
      setRoleCount(data.totalElements);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNbActiveUsers();
    fetchNbInactiveUsers();

    fetchNbRoles();
  }, []);

  return (
    <main className="flex-1 text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Tableau de Bord
          </h2>
          <p className="text-slate-600">
            Vue d'ensemble de votre système d'administration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Users Card */}
          <div onClick={()=> navigate("/admin/users")} className="rounded-xl cursor-pointer shadow border border-gray-200 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:bg-white/80">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="p-4 mt-4 rounded-2xl">
                <FaUser className="text-blue-600" size={32} />
              </div>
              <div className="flex-1 justify-center">
                <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                  Utilisateurs
                </p>
                <div className="flex flex-col sm:flex-row justify-between mt-2">
                  <div>
                    <p className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
                      {activeUserCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {activeUserCount > 1 ? "Comptes actifs" : "Compte actif"}
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
                      {inactiveUserCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {inactiveUserCount > 1
                        ? "Comptes inactifs"
                        : "Compte inactif"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Roles Card */}
          <div onClick={()=> navigate("/admin/roles")} className="rounded-xl cursor-pointer shadow border border-gray-200 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:bg-white/80">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="p-4 mt-4 ">
                <SiSpringsecurity className="text-blue-600" size={32} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                  Rôles
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
                  {roleCount.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-1">Rôles configurés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Actions */}
        <div className="rounded-xl shadow border border-gray-200 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:bg-white/80bg-white/70 backdrop-blur-sm">
          <div className="p-4 sm:p-6 border-b border-slate-200/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                Actions Récentes
              </h3>
              <p className="text-sm text-slate-600">
                Dernières activités du système
              </p>
            </div>
            <button onClick={()=> navigate("/admin/auditLogs")} className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors duration-200 self-start sm:self-auto">
              Voir plus de détails →
            </button>
          </div>

          <div className="divide-y divide-slate-200/50">
            {recentAudits.map((audit, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 hover:bg-slate-50/50 transition-colors duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 sm:mt-0"></div>
                    <p className="font-medium text-slate-900">
                      <span className="font-semibold text-blue-600">
                        {audit.user}
                      </span>{" "}
                      <span className="text-slate-700">{audit.action}</span>
                    </p>
                  </div>
                  <p className="text-sm text-slate-500 font-medium ml-5 sm:ml-0">
                    {audit.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminOverview;