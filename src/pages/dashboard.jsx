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
  allOrders,
  dailyOrders,
  fitDataToMonth,
  monthlyOrders,
  profitThisTime,
  sixMonthOrderPerCat,
  sixMonthOrders,
  sixMonthOrdersSum,
  weeklyOrders,
} from "../utils/getOrders";

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

  const orders = useQuery({
    queryKey: ["orders"],
    queryFn: allOrders,
  });

  const orderSixMonths = useQuery({
    queryKey: ["sixMonthOrders"],
    queryFn: sixMonthOrders,
  });

  const orderSixMonthsSum = useQuery({
    queryKey: ["sixMonthOrdersSum"],
    queryFn: sixMonthOrdersSum,
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
    <div className="mt-16 w-full h-fit">
      <section className="w-full h-fit md:h-[150px] flex py-4 px-3 justify-center md:justify-start items-center">
        <div className="md:w-full md:h-full grid grid-cols-2 lg:grid-cols-4 gap-2">
          <Earnings time="Year" />
          <Earnings time="Month" value={profitThisTime(ordersThisMonth)} />
          <Earnings time="Week" value={profitThisTime(ordersThisWeek)} />
          <Earnings time="day" value={profitThisTime(ordersThisDay)} />
        </div>
      </section>
      <section className="px-3 flex-col">
        <h1 className="text-xl font-bold mb-2">Analytics</h1>
        <div className="flex flex-col xl:flex-row gap-2">
          <div className="w-full h-fit bg-white rounded-md p-2">
            <h1 className="font-semibold text-xl">Grafik Keuntungan</h1>
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
                    label: "keuntungan",
                    backgroundColor: "teal",
                    borderColor: "teal",
                    data: fitDataToMonth(
                      orderSixMonths?.data?.map((dat) => {
                        return dat.keuntungan;
                      })
                    ),
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
                    data: fitDataToMonth(
                      sixMonthOrderPerCat(orderSixMonthsSum, "paket")
                    ),
                  },
                  {
                    id: 2,
                    label: "makan",
                    backgroundColor: "orange",
                    borderColor: "orange",
                    data: fitDataToMonth(
                      sixMonthOrderPerCat(orderSixMonthsSum, "makan")
                    ),
                  },
                  {
                    id: 3,
                    label: "minum",
                    backgroundColor: "salmon",
                    borderColor: "salmon",
                    data: fitDataToMonth(
                      sixMonthOrderPerCat(orderSixMonthsSum, "minum")
                    ),
                  },
                ],
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
