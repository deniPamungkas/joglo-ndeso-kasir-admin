import MenuBookIcon from "@mui/icons-material/MenuBook";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Side } from "../context/sideContext";
import LoginIcon from "@mui/icons-material/Login";

const Home = () => {
  const { value } = useContext(Side);
  return (
    <div className="w-full h-screen flex-col md:flex-row flex justify-center items-center gap-3">
      <Link to={"/pesanan"}>
        <div className="w-[170px] h-[170px] md:w-[200px] md:h-[200px] shadow hover:shadow-2xl rounded-lg flex flex-col justify-center items-center bg-gradient-to-t from-[#eb12e3] to-[#e86f66] font-semibold text-2xl text-white">
          <MenuBookIcon fontSize="large" />
          <span>Pesanan</span>
        </div>
      </Link>
      <Link to={"/playstation"}>
        <div className="w-[170px] h-[170px] md:w-[200px] md:h-[200px] shadow hover:shadow-2xl rounded-lg flex flex-col justify-center items-center bg-gradient-to-t from-[#9fea1b] to-[#66e87c] font-semibold text-2xl text-white">
          <SportsEsportsIcon fontSize="large" />
          <span>Playstation</span>
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
        <div className="w-[170px] h-[170px] md:w-[200px] md:h-[200px] shadow hover:shadow-2xl rounded-lg flex flex-col justify-center items-center bg-gradient-to-t from-[#eaff81] to-[#e8dd66] font-semibold text-2xl text-white">
          <DashboardIcon fontSize="large" />
          <span>Dashboard</span>
        </div>
      </Link>
      <Link to={"/login"}>
        <div className="w-[170px] h-[170px] md:w-[200px] md:h-[200px] shadow hover:shadow-2xl rounded-lg flex flex-col justify-center items-center bg-gradient-to-t from-[#23c4ea] to-[#667ee8] font-semibold text-2xl text-white">
          <LoginIcon fontSize="large" />
          <span>Login</span>
        </div>
      </Link>
    </div>
  );
};

export default Home;
