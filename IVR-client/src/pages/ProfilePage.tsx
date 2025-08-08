import { useLocation } from "react-router-dom";
import ProfileInput from "../components/inputs/ProfileInput";
import { formatTimestamp } from "../api/Api";
import type { User } from "../types/types";
import { HiOutlineUser, HiOutlineClock, HiOutlineShieldCheck } from "react-icons/hi";

const ProfilePage = () => {
  const location = useLocation();
  const user: User = location.state?.user;

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <HiOutlineUser className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune information utilisateur</h3>
          <p className="mt-1 text-sm text-gray-500">Les données du profil ne sont pas disponibles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Profil</h1>
          <p className="mt-2 text-sm text-gray-600">
            Informations détaillées du profil utilisateur
          </p>
        </div>
        
        
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* User Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              <HiOutlineUser className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-blue-100">{user.email}</p>
              <div className="flex items-center mt-1">
                <HiOutlineShieldCheck className="h-4 w-4 text-blue-200 mr-1" />
                <span className="text-sm text-blue-100">{user.roleName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-6 ">
          <div className="space-y-4">
            
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <HiOutlineUser size={30} className="text-blue-600 mr-2" />
                Informations Personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ProfileInput label="Prénom" value={user?.firstName} id="first-name" />
                <ProfileInput label="Nom" value={user?.lastName} id="last-name" />
                <ProfileInput label="Nom d'utilisateur" value={user?.username} id="username" />
                <ProfileInput label="Adresse email" value={user?.email} id="email" />
              </div>
            </div>

            {/* System Information Section */}
            <div className="border-t border-gray-200 pt-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <HiOutlineClock size={30} className=" text-blue-600 mr-2" />
                Informations Système
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ProfileInput 
                  label="Date de création" 
                  value={formatTimestamp(user?.createdAt)} 
                  id="createdAt" 
                />
                <ProfileInput 
                  label="Créé par" 
                  value={user?.createdBy || 'N/A'} 
                  id="createdBy" 
                />
                <ProfileInput 
                  label="Dernière modification" 
                  value={formatTimestamp(user?.updatedAt)} 
                  id="updatedAt" 
                />
                <ProfileInput 
                  label="Modifié par" 
                  value={user?.updatedBy || 'N/A'} 
                  id="updatedBy" 
                />
              </div>
            </div>

            {/* Role & Permissions Section */}
            <div className="border-t border-gray-200 pt-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <HiOutlineShieldCheck size={30} className="text-blue-600 mr-2" />
                Rôle & Permissions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ProfileInput label="Rôle" value={user?.roleName} id="role" />
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default ProfilePage;