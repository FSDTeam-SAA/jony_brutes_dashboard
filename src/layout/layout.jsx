import { Outlet } from "react-router";
import Sidebar from "../components/shared/sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <div className="w-[12%]">
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
