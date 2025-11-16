import React from "react";
import { PiPlus } from "react-icons/pi";
import { NavLink } from "react-router";

const DashTitle = ({ title, pathName, buttonName }) => {
  return (
    <div className="flex items-center justify-between border border-gray-100 p-5 rounded-lg">
      <h1 className="text-2xl font-bold">{title}</h1>

      <NavLink to={pathName}>
        <button className="flex items-center gap-2 bg-primary py-2 px-4 rounded-lg text-white cursor-pointer">
          <PiPlus /> {buttonName}
        </button>
      </NavLink>
    </div>
  );
};

export default DashTitle;
