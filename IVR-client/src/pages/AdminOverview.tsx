import { useEffect, useState } from "react";
import {getUsersByActive } from "../service/UserService";
import { getRoles } from "../service/RoleService";
import { FaUser } from "react-icons/fa6";
import { SiSpringsecurity } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import type { Audit } from "../types/types";
import { getAudits } from "../service/AuditService";
import { formatTimestamp } from "../api/Api";
import { useAuth } from "../hooks/useAuth";

const AdminOverview = () => {

  const { hasPermission } = useAuth();
  const [activeUserCount, setActiveUserCount] = useState<number>(0);
  const [inactiveUserCount, setInactiveUserCount] = useState<number>(0);
  const [roleCount, setRoleCount] = useState<number>(0);
  const [recentAudits, setRecentAudits] = useState<Audit[]>([])
  const navigate = useNavigate()

  

  const fetchNbActiveUsers = async () => {
    try {
      const data = await getUsersByActive({ active: 1 });
      setActiveUserCount(data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchNbInactiveUsers = async () => {
    try {
      const data = await getUsersByActive({ active: 0 });
      setInactiveUserCount(data);
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

  const fetchRecentAudits = async () => {
    try {
      const data = await getAudits({
        page: 0,
        size: 5,
        sortBy: "action_time_stamp", // <-- Must match your entity field
        sortDir: "desc"
      });
      setRecentAudits(data.content);
    } catch (err) {
      console.error(err);
    }
  };
  



  // Optional: nicer display for action types
  const actionTypeLabels: Record<string, string> = {
    CREATE_ROLE: "a créé un rôle",
    DELETE_ROLE: "a supprimé un rôle",
    UPDATE_ROLE: "a modifié un rôle",
    CREATE_USER: "a créé un utilisateur",
    DELETE_USER: "a supprimé un utilisateur",
    UPDATE_USER: "a modifié un utilisateur",
    CREATE_PERMISSION: "a créé une permission",
    DELETE_PERMISSION: "a supprimé une permission",
    UPDATE_PERMISSION: "a modifié une permission",
    FORGET_PASSWORD: "mot de passe oublié",
    RESET_PASSWORD: "mot de passe réinitialisé",
    BLACKLIST_MSISDN: "a blacklisté le numéro",
    WHITELIST_MSISDN: "a whitelisté le numéro",
    RESET_NB_CALLS: "a réinitialisé le nombre d'appels pour le numéro",
  };

  

  


  useEffect(() => {
    fetchNbActiveUsers();
    fetchNbInactiveUsers();
    fetchNbRoles();
    fetchRecentAudits();
  }, []);


  return (
        <main className="flex-1 text-slate-800 min-h-screen bg-slate-50 max-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex flex-col h-screen">
        <header className="mb-3 sm:mb-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
            Vue d'ensemble de votre système
          </h2>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5 flex-shrink-0">
          {/* Users Card */}
          {hasPermission("read:users") && <div
            role="button"
            tabIndex={0}
            onClick={() => navigate("/admin/users")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/admin/users")}
            className="rounded-xl bg-white/80 backdrop-blur-sm cursor-pointer select-none shadow-md border border-gray-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 transition-all duration-300 hover:shadow-xl hover:bg-white"
            aria-label="Voir les utilisateurs"
          >
            <div className="flex-shrink-0 bg-blue-50 rounded-3xl p-2 flex items-center justify-center">
              <FaUser className="text-blue-600" size={28} />
            </div>

            <div className="flex-1 w-full flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left sm:justify-between gap-3 sm:gap-1 mt-3 sm:mt-0">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                  {activeUserCount.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeUserCount > 1 ? "Comptes actifs" : "Compte actif"}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                  {inactiveUserCount.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {inactiveUserCount > 1 ? "Comptes inactifs" : "Compte inactif"}
                </p>
              </div>
            </div>
          </div>}

          {/* Roles Card */}

          {
            hasPermission("read:roles")  &&    <div
            role="button"
            tabIndex={0}
            onClick={() => navigate("/admin/roles")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/admin/roles")}
            className="rounded-xl bg-white/80 backdrop-blur-sm cursor-pointer select-none shadow-md border border-gray-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 transition-all duration-300 hover:shadow-xl hover:bg-white"
            aria-label="Voir les rôles"
          >
            <div className="flex-shrink-0 bg-blue-50 rounded-3xl p-2 flex items-center justify-center">
              <SiSpringsecurity className="text-blue-600" size={28} />
            </div>

            <div className="flex-1 w-full flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left mt-3 sm:mt-0">
              <div>
                
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 leading-tight">
                  {roleCount.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Rôles configurés</p>
              </div>
            </div>
          </div>
          }
       
        </section>

        {/* Recent Actions */}
        {hasPermission("read:audits") &&    <section className="rounded-xl shadow border border-gray-200 p-3 sm:p-4 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:bg-white flex flex-col h-auto">
  <div className="border-b border-slate-200/50 pb-2 sm:pb-3 mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
    <div>
      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-0 leading-tight">
        Actions Récentes
      </h3>
      <p className="text-xs sm:text-sm text-slate-600">Dernières activités du système</p>
    </div>
    <button
      onClick={() => navigate("/admin/auditLogs")}
      className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-semibold hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors duration-200 self-start sm:self-auto whitespace-nowrap"
      aria-label="Voir plus de détails sur les actions récentes"
    >
      Voir plus de détails →
    </button>
  </div>

  <div className="divide-y divide-slate-200/50 overflow-y-auto">
    {recentAudits.length > 0 ? (
      recentAudits.map((audit, index) => (
        <div
          key={audit.auditId || index}
          className="p-2 sm:p-3 hover:bg-slate-50/50 transition-colors duration-200 rounded-md"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
            <div className="flex items-start sm:items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 sm:mt-0 shrink-0" />
              <p className="font-medium text-slate-900 leading-tight max-w-[70vw] sm:max-w-none break-words text-sm">
                {["RESET_PASSWORD", "FORGET_PASSWORD"].includes(audit.actionType) ? (
                  <>
                    <span className="font-semibold text-blue-600 mr-1">
                      Utilisateur #{audit.entityId}
                    </span>
                    <span className="text-slate-700">{actionTypeLabels[audit.actionType]}</span>
                  </>
                ) : ["BLACKLIST_MSISDN", "WHITELIST_MSISDN", "RESET_NB_CALLS"].includes(audit.actionType) ? (
                  <>
                    <span className="font-semibold text-blue-600 mr-1">
                      Utilisateur #{audit.userId}
                    </span>
                    <span className="text-slate-700">
                      {actionTypeLabels[audit.actionType]} {audit.msisdn}
                    </span>
                    <span className="ml-1 text-blue-700 font-semibold">{audit.entityId}</span>
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-blue-600 mr-1">
                      Utilisateur #{audit.userId}
                    </span>
                    <span className="text-slate-700">
                      {actionTypeLabels[audit.actionType] || audit.actionType}
                    </span>
                    <span className="ml-2 italic text-xs text-slate-500">
                      [{audit.entityType} #{audit.entityId}]
                    </span>
                  </>
                )}
              </p>
            </div>
            <p className="text-xs text-slate-500 font-medium whitespace-nowrap ml-3 sm:ml-0">
              {formatTimestamp(audit.actionTimestamp)}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p className="p-4 text-center text-slate-500 text-sm">Aucune activité récente</p>
    )}
  </div>
        </section> }
   
        
          
      </div>
    </main>

    );
};

export default AdminOverview;