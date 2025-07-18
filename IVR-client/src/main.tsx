import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import ForgetPasswordPage from './pages/ForgetPasswordPage.tsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(App)
  },
  
  {
    path: "/login",
    element: createElement(LoginPage)
  },
  
  {
    path: "/forget-password",
    element: createElement(ForgetPasswordPage)
  },
  
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
