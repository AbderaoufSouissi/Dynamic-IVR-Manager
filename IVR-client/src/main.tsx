import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./auth/LoginPage.tsx";
import ForgetPasswordPage from "./auth/ForgetPasswordPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import RolesPage from "./pages/RolesPage.tsx";
import PermissionsPage from "./pages/PermissionsPage.tsx";
import MsisdnPage from "./pages/MsisdnPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ResetPasswordPage from "./auth/ResetPasswordPage.tsx";
import ProtectedRoute from "./route/ProtectedRoute.tsx";
import NotFoundPage from "./pages/NotFound.tsx";
import DeleteEntityModal from "./components/modal/DeleteEntityModal.tsx";
import AdminOverview from "./pages/AdminOverview.tsx";
import AuditsPage from "./pages/AuditsPage.tsx";
import App from "./App.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import RoleDetailsPage from "./pages/RoleDetailsPage.tsx";
import UserDetailsPage from "./pages/UserDetailsPage.tsx";
import RoleForm from "./components/forms/RoleForm.tsx";
import UserForm from "./components/forms/UserForm.tsx";
import PermissionForm from "./components/forms/PermissionForm.tsx";
import PermissionDetailsPage from "./pages/PermissionDetailsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "roles/create",
        element: (
          <RoleForm
            title={"Créer un nouveau role"}
            description={
              "Complétez les informations ci-dessous pour créer un nouveau role."
            }
          />
        ),
      },
      {
        path: "roles/edit/:id",
        element: (
          <RoleForm
            title={"Modifier un role"}
            description={"Modifiez les détails du role ci-dessous."}
          />
        ),
      },
      {
        path: "admin/roles/view/:id",
        element: <RoleDetailsPage />,
      },
      {
        path: "users/create",
        element: (
          <UserForm
            title={"Créer un nouvel utilisateur"}
            description={
              "Complétez les informations ci-dessous pour créer un nouvel utilisateur."
            }
          />
        ),
      },
      {
        path: "users/edit/:id",
        element: (
          <UserForm
            title={"Modifier un utilisateur"}
            description={"Modifiez les détails de l'utilisateur ci-dessous."}
          />
        ),
      },
      {
        path: "users/view/:id",
        element: <UserDetailsPage />,
      },
      {
        path: "permissions/create",
        element: <PermissionForm />,
      },
      {
        path: "permissions/view/:id",
        element: <PermissionDetailsPage />,
      },

      {
        path: "",
        element: <App />, // Admin layout/dashboard wrapper
        children: [
          {
            path: "users",
            element: <UsersPage />,
            children: [
              {
                path: "delete/:id",
                element: <DeleteEntityModal />,
              },
            ],
          },
          {
            path: "roles",
            element: <RolesPage />,
            children: [
              {
                path: "delete/:id",
                element: <DeleteEntityModal />,
              },
            ],
          },
          {
            path: "permissions",
            element: <PermissionsPage />,
            children: [
              {
                path: "delete/:id",
                element: <DeleteEntityModal />,
              },
            ],
          },
          {
            path: "msisdn",
            element: <MsisdnPage />,
          },
          {
            path: "auditLogs",
            element: <AuditsPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            index: true,
            element: <AdminOverview />,
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
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);
