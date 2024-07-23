import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { Side } from "../context/sideContext";
import { NavContext } from "../context/navContext";

const Navbar = () => {
  const { value, setPosition } = useContext(Side);
  const { setOpen } = useContext(NavContext);
  const handleOpenModal = () => {
    setOpen(true);
  };
  return (
    <nav className="bg-white w-full h-16 flex justify-between items-center px-3 sticky top-0">
      <div className="flex gap-x-3 items-center justify-normal">
        <button
          type="button"
          className="md:hidden"
          onClick={() => {
            setPosition(true);
          }}
        >
          <MenuIcon />
        </button>
        <h1 className="text-xl md:text-2xl font-bold">{value}</h1>
      </div>
      {value == "Products" && (
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 w-[120px] md:w-[150px] lg:w-[200px] h-[30px] rounded-full flex justify-center items-center text-[10px] lg:text-sm font-semibold gap-x-1 lg:gap-x-2 text-white"
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
