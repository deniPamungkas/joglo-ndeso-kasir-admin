import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const Pesanan = () => {
  return (
    <div className="px-5 grid grid-cols-2 md:grid-cols-7 gap-6">
      <Link to={"/invoice"}>
        <div className="w-[170px] h-[170px] m-auto border border-black rounded-lg bg-white shadow-lg relative flex justify-center items-center">
          <AddIcon fontSize="large" />
        </div>
      </Link>
      <div className="w-[170px] h-[170px] m-auto border border-black rounded-lg bg-white shadow-lg relative flex justify-center items-center font-semibold text-2xl">
        <span>Riski</span>
      </div>
      <div className="w-[170px] h-[170px] m-auto border border-black rounded-lg bg-white shadow-lg relative flex justify-center items-center font-semibold text-2xl">
        <span>Riski</span>
      </div>
      <div className="w-[170px] h-[170px] m-auto border border-black rounded-lg bg-white shadow-lg relative flex justify-center items-center font-semibold text-2xl">
        <span>Riski</span>
      </div>
    </div>
  );
};

export default Pesanan;
