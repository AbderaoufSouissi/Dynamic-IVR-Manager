import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './auth/LoginPage.tsx'
import ForgetPasswordPage from './auth/ForgetPasswordPage.tsx'
import UsersPage from './pages/UsersPage.tsx'
import RolesPage from './pages/RolesPage.tsx'
import PermissionsPage from './pages/PermissionsPage.tsx'
import MsisdnPage from './pages/MsisdnPage.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(App),
  },
  {
    path: "/login",
    element: createElement(LoginPage),
  },
  {
    path: "/forget-password",
    element: createElement(ForgetPasswordPage),
  },
  {
    path: "/admin",
    element: createElement(AdminDashboard), // Sidebar and layout
    children: [
      {
        path: "users",
        element: createElement(UsersPage),
      },
      {
        path: "roles",
        element: createElement(RolesPage),
      },
      {
        path: "permissions",
        element: createElement(PermissionsPage),
      },
      {
        path: "msisdn",
        element: createElement(MsisdnPage),
      },
      {
        path: "auditLogs",
        element: <p>Logs d’audit ici.</p>,
      },
      {
        index: true, // /admin by default
        element: <p>Bienvenue dans le tableau de bord admin.</p>,
      },
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
