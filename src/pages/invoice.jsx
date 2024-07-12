import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Invoice = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const result = await axios.get("http://localhost:5500/products", {
          withCredentials: true,
        });
        return result.data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ["form"],
  });

  return (
    <div className="bg-gray-100 min-h-screen px-3">
      <div className="w-full h-[50px] bg-white flex justify-center items-center text-xl font-semibold rounded-lg">
        <h1>Riski</h1>
      </div>
      <table className="w-full text-sm xl:text-base border-separate border-spacing-0.5 rounded-2xl overflow-hidden mt-3">
        <tbody className="text-xs">
          <tr key={"item.name"} id={"item.name"} className="h-[50px] bg-white">
            <td className="px-4 py-2 xl:py-4 flex justify-center items-center h-[50px]">
              {"1"}
            </td>
            <td className="px-4 py-2 xl:py-4">{"item.name"}</td>
            <td className="px-4 py-2 xl:py-4">{"item.price"}</td>
            <td className="px-4 py-2 xl:py-4 text-center">
              <div className="flex gap-x-2">
                <div className="relative cursor-pointer">
                  <div className="absolute top-0 right-0 left-0 bottom-0 z-10 bg-transparent"></div>
                  X
                </div>
              </div>
            </td>
          </tr>
          <tr key={"item.name"} id={"item.name"} className="h-[50px] bg-white">
            <td className="px-4 py-2 xl:py-4 flex justify-center items-center h-[50px]">
              {"1"}
            </td>
            <td className="px-4 py-2 xl:py-4">{"item.name"}</td>
            <td className="px-4 py-2 xl:py-4">{"item.price"}</td>
            <td className="px-4 py-2 xl:py-4 text-center">
              <div className="flex gap-x-2">
                <div className="relative cursor-pointer">
                  <div className="absolute top-0 right-0 left-0 bottom-0 z-10 bg-transparent"></div>
                  X
                </div>
              </div>
            </td>
          </tr>
          <tr key={"item.name"} id={"item.name"} className="h-[50px] bg-white">
            <td className="px-4 py-2 xl:py-4 flex justify-center items-center h-[50px]">
              {"1"}
            </td>
            <td className="px-4 py-2 xl:py-4">{"item.name"}</td>
            <td className="px-4 py-2 xl:py-4">{"item.price"}</td>
            <td className="px-4 py-2 xl:py-4 text-center">
              <div className="flex gap-x-2">
                <div className="relative cursor-pointer">
                  <div className="absolute top-0 right-0 left-0 bottom-0 z-10 bg-transparent"></div>
                  X
                </div>
              </div>
            </td>
          </tr>
          <tr key={"item.name"} id={"item.name"} className="h-[50px] bg-white">
            <td className="px-4 py-2 xl:py-4 flex justify-center items-center h-[50px]">
              {"1"}
            </td>
            <td className="px-4 py-2 xl:py-4">{"item.name"}</td>
            <td className="px-4 py-2 xl:py-4">{"item.price"}</td>
            <td className="px-4 py-2 xl:py-4 text-center">
              <div className="flex gap-x-2">
                <div className="relative cursor-pointer">
                  <div className="absolute top-0 right-0 left-0 bottom-0 z-10 bg-transparent"></div>
                  X
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="w-full h-[50px] bg-red-500 flex justify-center items-center text-lg font-semibold my-2 text-white rounded-lg">
        <h2>Total</h2>: Rp. <span>12.000</span>
      </div>
      <button
        className="w-full h-[50px] bg-green-500 text-lg font-semibold rounded-lg text-white"
        type="button"
      >
        Bayar
      </button>
      <section className="mt-5">
        <input
          type="text"
          placeholder="cari..."
          className="w-full h-[30px] outline-none border-b-2 mb-3 text-xs px-2"
        />
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <table className="bg-white w-full text-xs xl:text-base">
            <thead className="border-b-2 sticky top-0 z-20 bg-slate-700 h-[50px] text-white">
              <tr>
                <th className="text-start px-4 py-2 xl:py-4">Name</th>
                <th className="text-start px-4 py-2 xl:py-4">Price</th>
                <th className="text-start px-4 py-2 xl:py-4">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {data?.map((item) => (
                <tr
                  key={item.name}
                  id={item.name}
                  className="h-[50px] even:bg-slate-200 odd:bg-white"
                >
                  <td className="px-4 py-2 xl:py-4">{item.name}</td>
                  <td className="px-4 py-2 xl:py-4">{`Rp. ${new Intl.NumberFormat(
                    "id-ID"
                  ).format(item.price)}`}</td>
                  <td className="px-4 py-2 xl:py-4 text-center">
                    <div className="flex gap-x-2">
                      <button className="w-[40px] h-[17px] rounded-sm font-semibold text-white bg-slate-800 text-[8px] flex justify-center items-center">
                        Add
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Invoice;
