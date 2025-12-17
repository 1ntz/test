import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from './pages/LandingPage.tsx';
import OutputPage from './pages/OutputPage.tsx';
import InputPage from './pages/InputPage.tsx';
import UspPage from './pages/UspPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
    { path: "", element: <LandingPage /> },
    { path: "output", element: <OutputPage /> },
    { path: "input", element: <InputPage /> },
    { path: "usp", element: <UspPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/> 
  </StrictMode>,
)
