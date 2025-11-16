import { FaUserNurse } from "react-icons/fa6";
import {
  MdOutlineAdUnits,
  MdOutlineDesignServices,
  MdOutlineRateReview,
} from "react-icons/md";
import { NavLink, useLocation } from "react-router";
import LogoutModal from "../re-usable/LogoutModal";
import { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";

const Sidebar = () => {
  const [openLogout, setOpenLogout] = useState(false);
  const location = useLocation();

  const items = [
    {
      path: "/dashboard",
      label: "Service",
      icon: MdOutlineDesignServices,
    },
    {
      path: "/dashboard/units",
      label: "Units",
      icon: MdOutlineAdUnits,
    },
    {
      path: "/dashboard/commander",
      label: "Commander",
      icon: FaUserNurse,
    },
    {
      path: "/dashboard/reviews",
      label: "Reviews",
      icon: MdOutlineRateReview,
    },
  ];

  const isItemActive = (item) => {
    const { path, label } = item;

    switch (label) {
      case "Service":
        return (
          location.pathname === "/dashboard" ||
          location.pathname === "/dashboard/add-service" ||
          location.pathname.startsWith("/dashboard/service")
        );

      case "Units":
        return (
          location.pathname === "/dashboard/units" ||
          location.pathname === "/dashboard/units/add-unit" ||
          location.pathname.startsWith("/dashboard/units/")
        );

      case "Commander":
        return (
          location.pathname === "/dashboard/commander" ||
          location.pathname.startsWith("/dashboard/commander/")
        );

      case "Reviews":
        return (
          location.pathname === "/dashboard/reviews" ||
          location.pathname.startsWith("/dashboard/reviews/")
        );

      default:
        return location.pathname === path;
    }
  };

  return (
    <div className="min-h-screen pl-5 sticky top-5 z-50">
      <div className="pt-5 flex flex-col space-y-4">
        {items.map((item, index) => {
          const isActive = isItemActive(item);
          return (
            <NavLink
              key={index}
              to={item.path}
              className={`p-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-white font-semibold"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <button className="flex items-center gap-2 w-full text-left h-[30px] cursor-pointer">
                <item.icon
                  className={isActive ? "text-white" : "text-gray-600"}
                />
                {item.label}
              </button>
            </NavLink>
          );
        })}
      </div>
      <div className="absolute bottom-10 left-0 right-0 w-full pl-5">
        <button
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white text-base md:text-lg font-medium rounded-lg hover:bg-red-600 cursor-pointer"
          onClick={() => setOpenLogout(true)}
        >
         <MdOutlineLogout className="w-6 h-6"/> Logout
        </button>
      </div>
      <LogoutModal isOpen={openLogout} onClose={() => setOpenLogout(false)} />
    </div>
  );
};

export default Sidebar;
