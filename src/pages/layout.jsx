import SideBar from "../components/sidebar";
import Navbar from "../components/navbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="w-full h-screen flex">
      <SideBar />
      <div className="w-full min-h-screen overflow-y-scroll relative">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
