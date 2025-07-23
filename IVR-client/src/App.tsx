
import { useEffect } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import { getUsers } from "./service/UserService";


const App = () => {
  useEffect(() => {
    const response = getUsers();
    console.log(response);
    
  },[])
  return (
    <>
      
      <AdminDashboard/>
    
    </>
  );
};

export default App;
