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
import RoleForm from "./components/forms/RoleForm.tsx";
import AdminOverview from "./pages/AdminOverview.tsx";
import PermissionForm from "./components/forms/PermissionForm.tsx";
import AuditsPage from "./pages/AuditsPage.tsx";
import App from "./App.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import RoleDetailsPage from "./pages/RoleDetailsPage.tsx";
import UserDetailsPage from "./pages/UserForm.tsx";
import RoleInfoPage from "./pages/RoleInfoPage.tsx";
import UserInfoPage from "./pages/UserDetailsPage.tsx";
import PermissionInfoPage from "./pages/PermissionInfoPage.tsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedRoute />, // Protect the admin section
    children: [
      {
        path: "",
        element: <App />, // Admin layout/dashboard wrapper
        children: [
          {
            path: "users",
            element: <UsersPage />,
            children: [
              // {
              //   path: "create",
              //   element: (
              //     <UserForm
              //       title="Créer un nouvel utilisateur"
              //       description="Complétez les informations ci-dessous pour créer un nouvel utilisateur."
              //     />
              //   ),
              // },
              // {
              //   path: "update/:id",
              //   element: (
              //     <UserForm
              //       title="Modifier un utilisateur"
              //       description="Modifiez les détails de l'utilisateur ci-dessous."
              //     />
              //   ),
              // },
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
              {
                path: "create",
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
                path: "update/:id",
                element: (
                  <RoleForm
                    title={"Modifier un role"}
                    description={
                      "Mettez à jour les détails du role ci-dessous."
                    }
                  />
                ),
              },
            ],
          },
          {
            path: "permissions",
            element: <PermissionsPage />,
            children: [
              {
                path: "create",
                element: (
                  <PermissionForm
                    title={"Créer une nouvelle permission"}
                    description={
                      "Complétez les informations ci-dessous pour créer une nouvelle permission"
                    }
                  />
                ),
              },
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
    path: "admin/roles/edit/:id",
    element: <RoleDetailsPage />,
  },
  {
    path: "admin/roles/view/:id",
    element: <RoleInfoPage />,
  },
  {
    path: "admin/users/create",
    element: <UserDetailsPage title={"Créer un nouvel utilisateur"} description={"Complétez les informations ci-dessous pour créer un nouvel utilisateur."} />,
  },
  {
    path: "admin/users/edit/:id",
    element: <UserDetailsPage title={"Modifier un utilisateur"} description={"Modifiez les détails de l'utilisateur ci-dessous."} />,
  },
  {
    path: "admin/users/view/:id",
    element: <UserInfoPage />,
  },
  {
    path: "admin/permissions/view/:id",
    element: <PermissionInfoPage />,
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
