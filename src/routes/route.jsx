import { createBrowserRouter } from "react-router";
import Login from "../pages/login/Login";
import Dashboard from "../dashboard";
import Commander from "../pages/commander/commander";
import Reviews from "../pages/reviews/reviews";
import Service from "../pages/service/service";
import Units from "../pages/units/units";

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
        path: "/dashboard",
        element: <Service />,
      },
      {
        path: "/dashboard/units",
        element: <Units />,
      },
      {
        path: "/dashboard/commander",
        element: <Commander />,
      },
      {
        path: "/dashboard/reviews",
        element: <Reviews />,
      },
    ],
  },
]);
