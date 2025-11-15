import { createBrowserRouter } from "react-router";
import Login from "../pages/login/Login";
import Dashboard from "../dashboard";
import Commander from "../pages/commander/commander";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Commander />,
      },
    ],
  },
]);
