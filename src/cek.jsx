import axios from "axios";

const Cek = () => {
  const asd = async () => {
    const res = await axios.get(
      "https://joglo-ndeso-kasir-admin.vercel.app/v1/cek/prod"
    );
    console.log(res);
    return res;
  };
  asd();
  return <div>Cek</div>;
};

export default Cek;
