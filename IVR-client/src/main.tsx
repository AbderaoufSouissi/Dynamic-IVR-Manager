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
import ForbiddenPage from "./pages/ForbiddenPage.tsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedRoute />, // Just login required here
    children: [
      {
        path: "",
        element: <App />, // Admin layout/dashboard wrapper
        children: [
          // Users section
          {
            path: "users",
            element: <ProtectedRoute requiredPermissions={["read:users"]} />,
            children: [
              {
                element: <UsersPage />, // UsersPage wraps <Outlet context={{ triggerRefresh }} />
                children: [
                  { index: true, element: null }, // table inside UsersPage itself
                  { path: "delete/:id", element: <DeleteEntityModal /> },
                ],
              },
            ],
          },
          {
            path: "users/create",
            element: <ProtectedRoute requiredPermissions={["create:users"]} />,
            children: [
              {
                index: true,
                element: (
                  <UserForm
                    title="Créer un nouvel utilisateur"
                    description="Complétez les informations ci-dessous pour créer un nouvel utilisateur."
                  />
                ),
              },
            ],
          },
          {
            path: "users/edit/:id",
            element: <ProtectedRoute requiredPermissions={["update:users"]} />,
            children: [
              {
                index: true,
                element: (
                  <UserForm
                    title="Modifier un utilisateur"
                    description="Modifiez les détails de l'utilisateur ci-dessous."
                  />
                ),
              },
            ],
          },
          {
            path: "users/view/:id",
            element: <ProtectedRoute requiredPermissions={["read:users"]} />,
            children: [{ index: true, element: <UserDetailsPage /> }],
          },

          // Roles section
          {
            path: "roles",
            element: <ProtectedRoute requiredPermissions={["read:roles"]} />,
            children: [
              {
                element: <RolesPage />,
                children: [
                  { index: true, element: null },
                  { path: "delete/:id", element: <DeleteEntityModal /> },
                ],
              },
            ],
          },
          {
            path: "roles/create",
            element: <ProtectedRoute requiredPermissions={["create:roles"]} />,
            children: [
              {
                index: true,
                element: (
                  <RoleForm
                    title="Créer un nouveau role"
                    description="Complétez les informations ci-dessous pour créer un nouveau role."
                  />
                ),
              },
            ],
          },
          {
            path: "roles/edit/:id",
            element: <ProtectedRoute requiredPermissions={["update:roles"]} />,
            children: [
              {
                index: true,
                element: (
                  <RoleForm
                    title="Modifier un role"
                    description="Modifiez les détails du role ci-dessous."
                  />
                ),
              },
            ],
          },
          {
            path: "roles/view/:id",
            element: <ProtectedRoute requiredPermissions={["read:roles"]} />,
            children: [{ index: true, element: <RoleDetailsPage /> }],
          },

          // Permissions section
          {
            path: "permissions",
            element: <ProtectedRoute requiredPermissions={["read:permissions"]} />,
            children: [
              {
                element: <PermissionsPage />,
                children: [
                  { index: true, element: null },
                  { path: "delete/:id", element: <DeleteEntityModal /> },
                ],
              },
            ],
          },
          {
            path: "permissions/create",
            element: <ProtectedRoute requiredPermissions={["create:permissions"]} />,
            children: [
              {
                index: true,
                element: <PermissionForm />,
              },
            ],
          },
          {
            path: "permissions/view/:id",
            element: <ProtectedRoute requiredPermissions={["read:permissions"]} />,
            children: [{ index: true, element: <PermissionDetailsPage /> }],
          },

          // MSISDN section
          {
            path: "msisdn",
            element: (
              <ProtectedRoute
                requiredPermissions={[
                  "verify:msisdn",
                  "blacklist:msisdn",
                  "whitelist:msisdn",
                  "reset:msisdn",
                ]}
              />
            ),
            children: [{ index: true, element: <MsisdnPage /> }],
          },

          // Audit Logs
          {
            path: "auditLogs",
            element: <ProtectedRoute requiredPermissions={["read:audits"]} />,
            children: [{ index: true, element: <AuditsPage /> }],
          },

          // Profile
          { path: "profile", element: <ProfilePage /> },

          // Admin Overview
          { index: true, element: <AdminOverview /> },
        ],
      },
    ],
  },

  {
    path: "/about",
    element: <HomePage />,
  },

  {
    path: "/",
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
  path: "/403",
  element: <ForbiddenPage />,
},

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
