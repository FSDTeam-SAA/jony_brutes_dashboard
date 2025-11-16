import { createBrowserRouter } from "react-router";
import Login from "../pages/login/Login";
import Dashboard from "../dashboard";
import Commander from "../pages/commander/commander";
import Reviews from "../pages/reviews/reviews";
import Service from "../pages/service/service";
import Units from "../pages/units/units";
import ForgotPassword from "../pages/forgot-password/forgot-password";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../pages/reset-password/reset-password";
import OtpPage from "../pages/otp/otp";
import AddService from "../pages/service/add-service/add-service";
import AddUnit from "../pages/units/add-unit/add-unit";
import EditService from "../pages/service/edit-service/edit-service";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/otp",
    element: <OtpPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },

  // ⛔ PROTECTED ROUTE WRAPPER
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
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
          {
            path: "/dashboard/add-service",
            element: <AddService />,
          },
          {
            path: "/dashboard/service/edit-service/:id",
            element: <EditService />,
          },
          {
            path: "/dashboard/units/add-unit",
            element: <AddUnit />,
          },
        ],
      },
    ],
  },
]);
