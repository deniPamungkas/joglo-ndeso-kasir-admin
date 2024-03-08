import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Navbar = () => {
  return (
    <nav className="bg-white w-full h-20 flex justify-between items-center px-3">
      <MenuIcon />
      <div className="text-center">
        <h3 className="text-sm">Tue, 03 Dec</h3>
        <h1 className="text-2xl font-bold">Hi, Joglo</h1>
      </div>
      <AccountCircleOutlinedIcon />
    </nav>
  );
};

export default Navbar;
