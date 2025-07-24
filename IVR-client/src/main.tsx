import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./auth/LoginPage.tsx";
import ForgetPasswordPage from "./auth/ForgetPasswordPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import RolesPage from "./pages/RolesPage.tsx";
import PermissionsPage from "./pages/PermissionsPage.tsx";
import MsisdnPage from "./pages/MsisdnPage.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import UserForm from "./components/forms/UserForm.tsx";
import HomePage from "./pages/HomePage.tsx";
import ResetPasswordPage from "./auth/ResetPasswordPage.tsx";
import ProtectedRoute from "./route/ProtectedRoute.tsx";
import NotFoundPage from "./pages/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedRoute />, // Protect the admin section
    children: [
      {
        path: "",
        element: <AdminDashboard />, // Admin layout/dashboard wrapper
        children: [
          {
            path: "users",
            element: <UsersPage />,
            children: [
              {
                path: "create",
                element: (
                  <UserForm
                    title="Créer un nouvel utilisateur"
                    description="Complétez les informations ci-dessous pour créer un nouvel utilisateur."
                  />
                ),
              },
              {
                path: "update",
                element: (
                  <UserForm
                    title="Modifier un utilisateur"
                    description="Mettez à jour les détails de l'utilisateur ci-dessous."
                  />
                ),
              },
            ],
          },
          {
            path: "roles",
            element: <RolesPage />,
          },
          {
            path: "permissions",
            element: <PermissionsPage />,
          },
          {
            path: "msisdn",
            element: <MsisdnPage />,
          },
          {
            path: "auditLogs",
            element: <p className="text-lg font-semibold text-gray-800">Logs d’audit ici.</p>,
          },
          {
            index: true,
            element: <p className="text-3xl font-bold text-gray-800">Bienvenue dans le tableau de bord admin.</p>,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
