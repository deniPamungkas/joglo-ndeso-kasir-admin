import MenuBookIcon from "@mui/icons-material/MenuBook";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Side } from "../context/sideContext";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LogoutIcon from "@mui/icons-material/Logout";

const Home = () => {
  const { value } = useContext(Side);
  const navigate = useNavigate();

  const confilrmLogin = useQuery({
    queryFn: async () => {
      try {
        const isLoggedIn = axios.get(
          "https://joglo-ndeso-kasir-api-dev.vercel.app/auth/is-logged-in",
          { withCredentials: true }
        );
        return isLoggedIn;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    queryKey: ["confirmLogin"],
  });

  const handleLogout = async () => {
    try {
      const logout = axios.post(
        "https://joglo-ndeso-kasir-api-dev.vercel.app/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
      return logout;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="m-auto w-fit grid grid-cols-2 gap-2 md:gap-3">
        <Link to={"/pesanan"}>
          <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] shadow hover:shadow-2xl rounded-lg flex flex-col justify-center items-center bg-gradient-to-t from-[#eb12e3] to-[#e86f66] font-semibold text-xl text-white">
            <MenuBookIcon fontSize="large" />
            <span>Pesanan</span>
          </div>
        </Link>
        <Link
          to={
            (value == "Dashboard" && "/admin") ||
            (value == "Products" && "/admin/products") ||
            (value == "Sales" && "/admin/sales") ||
            (value == "Playstation" && "/admin/playstation")
          }
        >
          <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] shadow hover:shadow-2xl rounded-lg flex flex-col justify-center items-center bg-gradient-to-t from-[#eaff81] to-[#e8dd66] font-semibold text-xl text-white">
            <DashboardIcon fontSize="large" />
            <span>Dashboard</span>
          </div>
        </Link>
        <Link to={"/playstation"}>
          <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] shadow hover:shadow-2xl rounded-lg flex flex-col justify-center items-center bg-gradient-to-t from-[#9fea1b] to-[#66e87c] font-semibold text-xl md:text-2xl text-white">
            <SportsEsportsIcon fontSize="large" />
            <span>Playstation</span>
          </div>
        </Link>
        {confilrmLogin?.data == undefined ? (
          <Link to={"/login"}>
            <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] shadow hover:shadow-2xl rounded-lg flex flex-col justify-center items-center bg-gradient-to-t from-[#23c4ea] to-[#667ee8] font-semibold text-xl text-white">
              <LoginIcon fontSize="large" />
              <span>Login</span>
            </div>
          </Link>
        ) : (
          <div
            onClick={handleLogout}
            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] shadow hover:shadow-2xl rounded-lg flex flex-col justify-center items-center bg-gradient-to-t from-[#23c4ea] to-[#667ee8] font-semibold text-xl text-white"
          >
            <LogoutIcon fontSize="large" />
            <span>Logout</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
