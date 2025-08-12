import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../service/AuthService";
import { toastError, toastSuccess } from "../../service/ToastService";
import type { User } from "../../types/types";
import { BsPersonCircle } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";

interface Props {
  setMobileOpen: (open: boolean) => void;
}

const DashboardHeader = ({ setMobileOpen }: Props) => {
  const [profile, setProfile] = useState<User | null>();
  const navigate = useNavigate();

  const fetchAuthenticatedUser = async () => {
    try {
      const user = await getCurrentUser();
      setProfile(user);
      toastSuccess(`Bienvenue ${user.username}`);
    } catch (err: any) {
      console.error(err);
      toastError("something went wrong");
    }
  };

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Mobile hamburger */}
      <button
        className="sm:hidden p-2 rounded-md hover:bg-slate-200"
        onClick={() => setMobileOpen(true)}
      >
        <HiMenuAlt3 size={24} />
      </button>

      {/* Right side profile */}
      <div className="flex items-center gap-4 ml-auto">
        <button
          onClick={() =>
            navigate("/admin/profile", { state: { user: profile } })
          }
          className="cursor-pointer flex items-center gap-2 rounded-full focus:outline-none focus:ring-blue-600 focus:ring-offset-2 hover:bg-slate-200 px-2 py-1 transition-colors duration-200"
        >
          <div className="h-9 w-9 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200">
            <BsPersonCircle className="text-blue-600 h-7 w-7" />
          </div>
          <span className="hidden text-sm font-medium md:block text-slate-800">
            {profile?.username || "Loading..."}
          </span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
