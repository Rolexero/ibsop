import { Navigate, RouteObject } from "react-router-dom";
import RootLayout from "@/components/RootLayout";
import Dashboard from "@/views/root/dashboard";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true, // Default child route when visiting "/"
        element: <Navigate to="/users" replace />,
      },
      {
        path: "users",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/users" replace />,
  },
];

export default routes;
