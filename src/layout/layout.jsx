import { Outlet } from "react-router";
import Sidebar from "../components/shared/sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <div className="border border-red-400 w-[12%]">
        <Sidebar />
      </div>
      <div className="border border-green-400 flex-1 min-h-screen p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
