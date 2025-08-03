import { ToastContainer } from "react-toastify";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <>
      <ToastContainer className="text-gray-900" />

        <AdminDashboard />
    
    </>
  );
};

export default App;