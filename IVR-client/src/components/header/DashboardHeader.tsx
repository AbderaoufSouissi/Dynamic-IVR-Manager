

import { TbLayoutDashboard } from "react-icons/tb";
import { NavLink, useNavigate,  } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../service/AuthService";
import { toastError, toastSuccess } from "../../service/ToastService";
import type { User } from "../../types/types";
import { BsPersonCircle } from "react-icons/bs";




const DashboardHeader = () => {
  const [profile, setProfile] = useState<User|null>()
  const navigate = useNavigate()


  const fetchAuthenticatedUser = async () => {
    try{
    const user = await getCurrentUser()
      setProfile(user)
      toastSuccess(`Bienvenue ${user.username}`)
    } catch (err: any) {
      console.error(err);
      toastError("something went wrong")
    }
    
  }

  useEffect(() => {
    fetchAuthenticatedUser();

    
    
  },[])

  return (
    <header className="flex-shrink-0 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200">
      <div className="px-2">
        <div className="flex items-center justify-between">
      
          <div className="flex items-center gap-1">
            <TbLayoutDashboard size={40} className="text-blue-700" />
            <NavLink
              to="/admin"
              className="text-3xl font-medium text-gray-900 hover:text-blue-700 transition"
            >
              Dynamic IVR Manager
            </NavLink>
          </div>

          {/* Right: User Profile Section */}
          <div className="relative">
            <button
             onClick={() => navigate("/admin/profile", { state: { user: profile } })}
              className=" cursor-pointer flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {/* User Avatar */}
              <div className="rounded-full overflow-hidden shadow-sm">
                <BsPersonCircle className="text-blue-700" size={40}/>
              </div>
              
              {/* User Info */}
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">{profile?.username}</p>
                <p className="text-xs text-gray-500">{profile?.roleName}</p>
              </div>
              
            </button>

    
          
          </div>
        </div>
      </div>

  

      
    </header>
  );
};

export default DashboardHeader;