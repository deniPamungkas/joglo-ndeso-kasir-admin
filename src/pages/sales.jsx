import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { useState } from "react";
import axios from "axios";
const Sales = () => {
  ChartJS.register(
    ArcElement,
    BarElement,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale
  );
  ChartJS.defaults.plugins.legend.labels.boxWidth = 10;
  ChartJS.defaults.plugins.legend.labels.boxHeight = 10;
  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(new Date().getDate()).padStart(2, "0")}`
  );
  const [orderData, setOrderData] = useState(null);
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleDateForm = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5500/admin/v1/getOrdersByDate",
        { date: date }
      );
      setOrderData(result.data);
      return result;
    } catch (error) {
      return console.log(error);
    }
  };

  const dataPerCat = (cat) => {
    const filteredData = orderData?.filter((data) => {
      return data.category == cat;
    });
    console.log(filteredData);
    return filteredData;
  };
  return (
    <div className="mt-16">
      <section className="w-full h-fit p-3 flex justify-between gap-x-3">
        <div className="flex flex-col gap-y-3 w-[400px]">
          <form
            onSubmit={handleDateForm}
            className="w-[400px] h-[70px] flex justify-center items-center bg-white rounded-md"
          >
            <div className="w-[350px] h-[30px] flex gap-x-1">
              <input
                type="date"
                name="tanggal"
                id="tanggal"
                value={date}
                onChange={handleDate}
                className="w-full outline-none pl-2 bg-gray-200 rounded-sm"
              />
              <button
                type="submit"
                className="bg-blue-500 w-[70px] h-[30px] flex justify-center items-center text-white font-bold rounded-sm"
              >
                Cek
              </button>
            </div>
          </form>
          <div className="w-full h-[400px] bg-white rounded-md px-5 py-8 flex flex-col gap-y-5">
            <div className="w-full h-[50px] flex justify-between items-center text-2xl font-semibold">
              <h1>Makan</h1>
              <span>
                {orderData !== null
                  ? `Rp ${new Intl.NumberFormat("id-ID").format(
                      dataPerCat("makan").reduce((acc, cur) => {
                        return acc + cur.totalPrice;
                      }, 0)
                    )}`
                  : `Rp ${new Intl.NumberFormat("id-ID").format(0)}`}
              </span>
            </div>
            <div className="w-full h-[50px] flex justify-between items-center text-2xl font-semibold">
              <h1>Minum</h1>
              <span>
                {orderData !== null
                  ? `Rp ${new Intl.NumberFormat("id-ID").format(
                      dataPerCat("minum").reduce((acc, cur) => {
                        return acc + cur.totalPrice;
                      }, 0)
                    )}`
                  : `Rp ${new Intl.NumberFormat("id-ID").format(0)}`}
              </span>
            </div>
            <div className="w-full h-[50px] flex justify-between items-center text-2xl font-semibold">
              <h1>Paket</h1>
              <span>
                {orderData !== null
                  ? `Rp ${new Intl.NumberFormat("id-ID").format(
                      dataPerCat("paket").reduce((acc, cur) => {
                        return acc + cur.totalPrice;
                      }, 0)
                    )}`
                  : `Rp ${new Intl.NumberFormat("id-ID").format(0)}`}
              </span>
            </div>
            <hr />
            <div className="w-full h-[50px] flex justify-between items-center text-3xl font-semibold">
              <h1>Total</h1>
              <span>
                {orderData !== null
                  ? `Rp ${new Intl.NumberFormat("id-ID").format(
                      orderData?.reduce((acc, cur) => {
                        return acc + cur.totalPrice;
                      }, 0)
                    )}`
                  : `Rp ${new Intl.NumberFormat("id-ID").format(0)}`}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-[482px] bg-white rounded-md">
          <div className="">
            <ul>
              {orderData !== null &&
                orderData.map((data) => {
                  return (
                    <li
                      key={data._id.name}
                    >{`${data._id.name} = ${data.qty}`}</li>
                  );
                })}
            </ul>
          </div>
        </div>
        {/* <div className="grid grid-cols-11 gap-3">
          <div className="h-full w-full col-span-7 bg-white rounded-md py-2 px-3">
            <Line
              datasetIdKey="se"
              plugins={{ backgroundColor: "lighgreen" }}
              options={{
                backgroundColor: "red",
                responsive: true,
                animation: { duration: 2000, easing: "easeOutExpo" },
              }}
              data={{
                labels: [
                  "Jun 23",
                  "Jul 23",
                  "Aug 23",
                  "Jun 23",
                  "Jul 23",
                  "Aug 23",
                  "Jun 23",
                ],
                datasets: [
                  {
                    id: 1,
                    label: "paket",
                    backgroundColor: "teal",
                    borderColor: "teal",
                    data: [2, 5, 9, 2, 5, 9, 2],
                  },
                  {
                    id: 2,
                    label: "makan",
                    backgroundColor: "orange",
                    borderColor: "orange",
                    data: [3, 2, 5, 2, 5, 9, 2],
                  },
                  {
                    id: 3,
                    label: "minum",
                    backgroundColor: "salmon",
                    borderColor: "salmon",
                    data: [4, 7, 2, 2, 3, 4, 5],
                  },
                ],
              }}
            />
          </div>
          <div className="h-full w-full col-span-4 bg-white rounded-md py-2 px-3 font-semibold">
            <h1>This Week</h1>
            <Doughnut
              datasetIdKey="se"
              options={{
                backgroundColor: "fuscia",
                indexAxis: "y",
                animation: { duration: 2000, easing: "easeOutExpo" },
                plugins: { legend: { maxWidth: "1" } },
              }}
              data={{
                labels: ["Paket", "Makan", "Minum"],
                datasets: [
                  {
                    id: 1,
                    data: [500, 300, 400],
                    backgroundColor: ["teal", "orange", "salmon"],
                    borderColor: ["teal", "orange", "salmon"],
                  },
                ],
              }}
            />
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default Sales;
