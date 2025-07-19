
import UserFilter from "./components/filters/UserFilter";
import UsersTable from "./components/tables/UsersTable";
import AdminDashboard from "./pages/AdminDashboard";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import LoginPage from "./pages/login/LoginPage";
import content from "./data/content.json"
import PermissionsTable from "./components/tables/PermissionsTable";




const App = () => {
  return (
    <>
      {/* <ForgetPasswordPage/> */}
      {/* <LoginPage/> */}
      <AdminDashboard/>
      {/* <UsersTable users={content.users}/> */}
      {/* <PermissionsTable permissions={content.permissions}/> */}
    </>
  )
}

export default App;