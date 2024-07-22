import axios from "axios";

const Cek = () => {
  const asd = async () => {
    const res = await axios.get("http://localhost:5600/v1/cek/prod");
    console.log(res);
    return res;
  };
  asd();
  return <div>Cek</div>;
};

export default Cek;
