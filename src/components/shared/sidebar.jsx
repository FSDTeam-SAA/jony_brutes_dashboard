import { FaUserNurse } from "react-icons/fa6";
import { MdOutlineAdUnits, MdOutlineDesignServices, MdOutlineRateReview } from "react-icons/md";
import { NavLink } from "react-router";

const Sidebar = () => {
  const items = [
    {
      path: "/dashboard",
      label: "Commander",
      icon: FaUserNurse,
    },
    {
      path: "/dashboard/reviews",
      label: "Reviews",
      icon: MdOutlineRateReview,
    },
    {
      path: "/dashboard/service",
      label: "Service",
      icon: MdOutlineDesignServices,
    },
    {
      path: "/dashboard/units",
      label: "Units",
      icon: MdOutlineAdUnits,
    },
  ];

  return (
    <div className="py-5 pl-5">
      <div>logo</div>

      <div className="mt-5 flex flex-col space-y-4">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-white font-semibold"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            {({ isActive }) => (
              <button className="flex items-center gap-2 w-full text-left h-[30px] cursor-pointer">
                <item.icon
                  className={isActive ? "text-white" : "text-gray-600"}
                />
                {item.label}
              </button>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
