import Earnings from "../components/earnings";
import { Bar, Line } from "react-chartjs-2";
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
import { useQuery } from "@tanstack/react-query";
import {
  dailyOrders,
  fitDataToMonth,
  monthlyOrders,
  profitThisTime,
  sixMonthOrderPerCat,
  sixMonthOrdersSum,
  sortByYearnMonth,
  weeklyOrders,
  yearlyOrders,
} from "../utils/getOrders";
import axios from "axios";

const Dashboard = () => {
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

  const months = () => {
    const month = [
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Des",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Des",
      "Jan",
    ];

    const getSixMonth = [];
    const getThisMonth = new Date().getMonth();
    for (let i = getThisMonth; i >= getThisMonth - 5; i--) {
      getSixMonth.unshift(month[i + 6]);
    }
    return getSixMonth;
  };

  const confilrmLogin = useQuery({
    queryFn: async () => {
      try {
        const isLoggedIn = axios.get(
          "https://joglo-ndeso-kasir-api-dev.vercel.app/auth/is-logged-in",
          { withCredentials: true }
        );
        return isLoggedIn;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    queryKey: ["confirmLogin"],
  });

  // const orders = useQuery({
  //   queryKey: ["orders"],
  //   queryFn: allOrders,
  // });

  // const orderSixMonths = useQuery({
  //   queryKey: ["sixMonthOrders"],
  //   queryFn: sixMonthOrders,
  // });

  const orderSixMonthsSum = useQuery({
    queryKey: ["sixMonthOrdersSum"],
    queryFn: sixMonthOrdersSum,
  });

  // console.log(
  //   sortByYearnMonth(
  //     fitDataToMonth(sixMonthOrderPerCat(orderSixMonthsSum, "minum"))
  //   )
  // );
  // console.log(sixMonthOrderPerCat(orderSixMonthsSum, "makan"));
  // console.log(orderSixMonthsSum.data);
  // console.log(new Date().getMonth() + 1);

  const ordersThisYear = useQuery({
    queryKey: ["yearlyOrders"],
    queryFn: yearlyOrders,
  });

  const ordersThisMonth = useQuery({
    queryKey: ["monthlyOrders"],
    queryFn: monthlyOrders,
  });

  const ordersThisWeek = useQuery({
    queryKey: ["weeklyOrders"],
    queryFn: weeklyOrders,
  });

  const ordersThisDay = useQuery({
    queryKey: ["dailyOrders"],
    queryFn: dailyOrders,
  });

  return (
    <>
      {confilrmLogin?.data == undefined ? (
        <div className=" w-full h-fit bg-gray-100 ">Not Logged In</div>
      ) : (
        <div className=" w-full h-fit bg-gray-100 ">
          <section className="w-full h-fit md:h-[150px] flex py-4 px-3 justify-center md:justify-start items-center">
            <div className="md:w-full md:h-full grid grid-cols-2 lg:grid-cols-4 gap-2">
              <Earnings time="Year" value={profitThisTime(ordersThisYear)} />
              <Earnings time="Month" value={profitThisTime(ordersThisMonth)} />
              <Earnings time="Week" value={profitThisTime(ordersThisWeek)} />
              <Earnings time="day" value={profitThisTime(ordersThisDay)} />
            </div>
          </section>
          <section className="px-3 flex-col">
            <h1 className="text-xl font-bold mb-2">Analytics</h1>
            <div className="flex flex-col xl:flex-row gap-2">
              <div className="w-full h-fit bg-white rounded-md p-2">
                <h1 className="font-semibold text-xl">Grafik Pemasukan</h1>
                <Line
                  datasetIdKey="se"
                  options={{
                    responsive: true,
                    animation: { duration: 2000, easing: "easeOutExpo" },
                    plugins: {
                      legend: {
                        labels: {},
                      },
                    },
                  }}
                  data={{
                    labels: months(),
                    datasets: [
                      {
                        id: 1,
                        label: "Pemasukan",
                        backgroundColor: "teal",
                        borderColor: "teal",
                        data: [1, 2, 3, 4, 5, 6],
                      },
                    ],
                  }}
                />
              </div>
              <div className="grafik w-full h-fit bg-white rounded-md p-2">
                <h1 className="font-semibold text-xl">Grafik Pesanan</h1>
                <Bar
                  datasetIdKey="se"
                  options={{
                    responsive: true,
                    indexAxis: "x",
                    animation: { duration: 2000, easing: "easeOutExpo" },
                  }}
                  data={{
                    labels: months(),
                    datasets: [
                      {
                        id: 1,
                        label: "paket",
                        backgroundColor: "teal",
                        borderColor: "teal",
                        data: sortByYearnMonth(
                          fitDataToMonth(
                            sixMonthOrderPerCat(orderSixMonthsSum, "paket")
                          )
                        )?.map((data) => {
                          return data.qty;
                        }),
                      },
                      {
                        id: 2,
                        label: "makan",
                        backgroundColor: "orange",
                        borderColor: "orange",
                        data: sortByYearnMonth(
                          fitDataToMonth(
                            sixMonthOrderPerCat(orderSixMonthsSum, "makan")
                          )
                        )?.map((data) => {
                          return data.qty;
                        }),
                      },
                      {
                        id: 3,
                        label: "minum",
                        backgroundColor: "salmon",
                        borderColor: "salmon",
                        data: sortByYearnMonth(
                          fitDataToMonth(
                            sixMonthOrderPerCat(orderSixMonthsSum, "minum")
                          )
                        )?.map((data) => {
                          return data.qty;
                        }),
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Dashboard;
