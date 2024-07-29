import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import LogoutIcon from "@mui/icons-material/Logout";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import HomeIcon from "@mui/icons-material/Home";
import { useContext } from "react";
import { Side } from "../context/sideContext";
import { Link } from "react-router-dom";
import { todayDate } from "../utils/getTodayDate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SideBar = () => {
  const { value, setValue, position, setPosition } = useContext(Side);
  //handle side state
  const handleClick = (e) => {
    setPosition(false);
    setValue(e.target.parentElement.id);
  };
  return (
    <>
      <div
        className={`w-[200px] md:w-[250px] md:hidden h-screen bg-white p-3 lg:p-5 absolute ${
          position ? "translate-x-[0px]" : "-translate-x-[200px]"
        } md:block md:relative z-50 ease-in-out transition`}
      >
        <div className="flex justify-between items-center">
          <span>
            <h3 className="text-sm">{todayDate()}</h3>
            <h1 className="text-2xl font-bold">Hi, Joglo</h1>
          </span>
          <button
            type="button"
            className="md:hidden"
            onClick={() => {
              setPosition(false);
            }}
          >
            <ArrowBackIcon />
          </button>
        </div>
        <ul className="flex flex-col gap-y-5 py-10">
          <Link
            to={"/admin"}
            onClick={handleClick}
            id="Dashboard"
            className={`${
              value == "Dashboard" ? "bg-blue-500 text-white" : "text-gray-500"
            } rounded-lg h-[50px] w-full flex justify-start px-3 font-semibold items-center gap-x-3 relative cursor-pointer`}
          >
            <div className="absolute top-0 right-0 left-0 bottom-0 z-10"></div>
            <DashboardIcon
              style={
                value == "Dashboard" ? { color: "white" } : { color: "gray" }
              }
            />
            <span>Dashboard</span>
          </Link>
          <Link
            to={"products"}
            onClick={handleClick}
            id="Products"
            className={`${
              value == "Products" ? "bg-blue-500 text-white" : "text-gray-500"
            } rounded-lg h-[50px] w-full flex justify-start px-3 font-semibold items-center gap-x-3 relative cursor-pointer`}
          >
            <div className="absolute top-0 right-0 left-0 bottom-0 z-10"></div>
            <ShoppingCartIcon
              style={
                value == "Products" ? { color: "white" } : { color: "gray" }
              }
            />
            <span>Products</span>
          </Link>
          <Link
            to={"sales"}
            onClick={handleClick}
            id="Sales"
            className={`${
              value == "Sales" ? "bg-blue-500 text-white" : "text-gray-500"
            } rounded-lg h-[50px] w-full flex justify-start px-3 font-semibold items-center gap-x-3 relative cursor-pointer`}
          >
            <div className="absolute top-0 right-0 left-0 bottom-0 z-10"></div>
            <SsidChartIcon
              style={value == "Sales" ? { color: "white" } : { color: "gray" }}
            />
            <span>Sales</span>
          </Link>
          <Link
            to={"playstation"}
            onClick={handleClick}
            id="Playstation"
            className={`${
              value == "Playstation"
                ? "bg-blue-500 text-white"
                : "text-gray-500"
            } rounded-lg h-[50px] w-full flex justify-start px-3 font-semibold items-center gap-x-3 relative cursor-pointer`}
          >
            <div className="absolute top-0 right-0 left-0 bottom-0 z-10"></div>
            <SportsEsportsIcon
              style={
                value == "Playstation" ? { color: "white" } : { color: "gray" }
              }
            />
            <span>Playstation</span>
          </Link>
          <Link
            to={"/"}
            onClick={() => {
              setPosition(false);
            }}
            id="Home"
            className={`bg-gray-500 text-white rounded-lg h-[40px] w-full flex justify-start px-3 font-semibold items-center gap-x-3 relative cursor-pointer`}
          >
            <div className="absolute top-0 right-0 left-0 bottom-0 z-10"></div>
            <HomeIcon style={{ color: "white" }} />
            <span>Home</span>
          </Link>
          <Link
            to={"/logout"}
            id="Logout"
            className={` bg-gray-500 text-white rounded-lg h-[40px] w-full flex justify-start px-3 font-semibold items-center gap-x-3 relative cursor-pointer`}
          >
            <div className="absolute top-0 right-0 left-0 bottom-0 z-10"></div>
            <LogoutIcon style={{ color: "white" }} />
            <span>Log Out</span>
          </Link>
        </ul>
      </div>
      <div
        className={`hidden md:block w-[250px] h-screen bg-white p-3 lg:p-5 z-50`}
      >
        <div className="flex justify-between items-center">
          <span>
            <h3 className="text-sm">{todayDate()}</h3>
            <h1 className="text-2xl font-bold">Hi, Joglo</h1>
          </span>
          <button
            type="button"
            className="md:hidden"
            onClick={() => {
              setPosition(false);
            }}
          >
            <ArrowBackIcon />
          </button>
        </div>
        <ul className="flex flex-col gap-y-5 py-10">
          <Link
            to={"/admin"}
            onClick={handleClick}
            id="Dashboard"
            className={`${
              value == "Dashboard" ? "bg-blue-500 text-white" : "text-gray-500"
            } rounded-lg h-[50px] w-full flex justify-start px-3 font-semibold items-center gap-x-3 relative cursor-pointer`}
          >
            <div className="absolute top-0 right-0 left-0 bottom-0 z-10"></div>
            <DashboardIcon
              style={
                value == "Dashboard" ? { color: "white" } : { color: "gray" }
              }
            />
            <span>Dashboard</span>
          </Link>
          <Link
            to={"products"}
            onClick={handleClick}
            id="Products"
            className={`${
              value == "Products" ? "bg-blue-500 text-white" : "text-gray-500"
            } rounded-lg h-[50px] w-full flex justify-start px-3 font-semibold items-center gap-x-3 relative cursor-pointer`}
          >
            <div className="absolute top-0 right-0 left-0 bottom-0 z-10"></div>
            <ShoppingCartIcon
              style={
                value == "Products" ? { color: "white" } : { color: "gray" }
              }
            />
            <span>Products</span>
          </Link>
          <Link
            to={"sales"}
            onClick={handleClick}
            id="Sales"
            className={`${
              value == "Sales" ? "bg-blue-500 text-white" : "text-gray-500"
            } rounded-lg h-[50px] w-full flex justify-start px-3 font-semibold items-center gap-x-3 relative cursor-pointer`}
          >
            <div className="absolute top-0 right-0 left-0 bottom-0 z-10"></div>
            <SsidChartIcon
              style={value == "Sales" ? { color: "white" } : { color: "gray" }}
            />
            <span>Sales</span>
          </Link>
          <Link
            to={"playstation"}
            onClick={handleClick}
            id="Playstation"
            className={`${
              value == "Playstation"
                ? "bg-blue-500 text-white"
                : "text-gray-500"
            } rounded-lg h-[50px] w-full flex justify-start px-3 font-semibold items-center gap-x-3 relative cursor-pointer`}
          >
            <div className="absolute top-0 right-0 left-0 bottom-0 z-10"></div>
            <SportsEsportsIcon
              style={
                value == "Playstation" ? { color: "white" } : { color: "gray" }
              }
            />
            <span>Playstation</span>
          </Link>
          <Link
            to={"/"}
            onClick={() => {
              setPosition(false);
            }}
            id="Home"
            className={`bg-gray-500 text-white rounded-lg h-[40px] w-full flex justify-start px-3 font-semibold items-center gap-x-3 relative cursor-pointer`}
          >
            <div className="absolute top-0 right-0 left-0 bottom-0 z-10"></div>
            <HomeIcon style={{ color: "white" }} />
            <span>Home</span>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
