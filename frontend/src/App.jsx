import React from 'react'
import { createBrowserRouter } from 'react-router';
import AuthLayout from './layout/AuthLayout';
import LoginPage from './pages/LoginPage';
import { RouterProvider } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <Router></Router>
  )
}


function Router() {
  const router = createBrowserRouter([
    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },    
  ]);

  return <RouterProvider router={router} />;
}
