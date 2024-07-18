import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { Side } from "../context/sideContext";
import { NavContext } from "../context/navContext";

const Navbar = () => {
  const { value } = useContext(Side);
  const { setOpen } = useContext(NavContext);
  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <nav className="bg-white w-full h-16 flex justify-between items-center px-3 sticky top-0">
      <div className="flex gap-x-3 items-center justify-normal">
        <span className="md:hidden">
          <MenuIcon />
        </span>
        <h1 className="text-2xl font-bold">{value}</h1>
      </div>
      {value == "Products" && (
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 w-[130px] md:w-[150px] lg:w-[200px] h-[35px] rounded-full flex justify-center items-center text-xs lg:text-sm font-semibold gap-x-1 lg:gap-x-2 text-white"
        >
          <AddIcon />
          <span>Add Products</span>
        </button>
      )}
      <AccountCircleOutlinedIcon />
    </nav>
  );
};

export default Navbar;
