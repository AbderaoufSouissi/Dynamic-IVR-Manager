
import UserFilter from "./components/filters/UserFilter";
import UsersTable from "./components/tables/UsersTable";
import AdminDashboard from "./pages/AdminDashboard";
import ForgetPasswordPage from "./auth/ForgetPasswordPage";
import LoginPage from "./auth/LoginPage";
import content from "./data/content.json"
import PermissionsTable from "./components/tables/PermissionsTable";
import { useEffect, useState } from "react";
import { getUsers } from "./service/api";
import MsisdnPage from "./pages/MsisdnPage";




const App = () => {

  // const [users, setUsers] = useState<any[]>([]);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const data = await getUsers();
  //       setUsers(data);
  //       console.log(users)
  //     } catch (error) {
  //       console.error("Failed to load users", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);
  return (
    <>
      {/* <ForgetPasswordPage/> */}
      {/* <LoginPage/> */}
      <AdminDashboard/>

      {/* <UsersTable users={content.users}/> */}
      {/* <PermissionsTable permissions={content.permissions}/> */}
      {/* <MsisdnPage/> */}
    </>
  )
}

export default App;