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
  monthlyOrders,
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
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
    ];
    const getSixMonth = [];
    const getThisMonth = new Date().getMonth();
    for (let i = getThisMonth; i < getThisMonth + 6; i++) {
      getSixMonth.push(month[i]);
    }
    return getSixMonth;
  };

  const orders = useQuery({
    queryKey: ["orders"],
    queryFn: allOrders,
  });

  const ordersThisMonth = useQuery({
    queryKey: ["monthlyOrders"],
    queryFn: monthlyOrders,
  });
  const profitThisMonth = ordersThisMonth.data?.reduce((acc, cur) => {
    return acc + cur.profit;
  }, 0);

  const ordersThisWeek = useQuery({
    queryKey: ["weeklyOrders"],
    queryFn: weeklyOrders,
  });
  const profitThisWeek = ordersThisWeek.data?.reduce((acc, cur) => {
    return acc + cur.profit;
  }, 0);

  const ordersThisDay = useQuery({
    queryKey: ["dailyOrders"],
    queryFn: dailyOrders,
  });
  const profitThisDay = ordersThisDay.data?.reduce((acc, cur) => {
    return acc + cur.profit;
  }, 0);

  return (
    <div className="mt-16 w-full h-fit">
      <section className="w-full h-fit md:h-[150px] flex py-4 px-3 justify-center md:justify-start items-center">
        <div className="md:w-full md:h-full grid grid-cols-2 lg:grid-cols-4 gap-2">
          <Earnings time="Year" />
          <Earnings time="Month" value={profitThisMonth} />
          <Earnings time="Week" value={profitThisWeek} />
          <Earnings time="day" value={profitThisDay} />
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
                    backgroundColor: "teal",
                    borderColor: "teal",
                    data: [20],
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
                labels: [
                  "Jun 23",
                  "Jul 23",
                  "Aug 23",
                  "Sep 23",
                  "Okt 23",
                  "Nov 23",
                ],
                datasets: [
                  {
                    id: 1,
                    label: "paket",
                    backgroundColor: "teal",
                    borderColor: "teal",
                    data: [500, 100, 700, 400, 600, 200],
                  },
                  {
                    id: 2,
                    label: "makan",
                    backgroundColor: "orange",
                    borderColor: "orange",
                    data: [300, 600, 200, 600, 800, 400],
                  },
                  {
                    id: 3,
                    label: "minum",
                    backgroundColor: "salmon",
                    borderColor: "salmon",
                    data: [40, 500, 300, 500, 700, 100],
                  },
                ],
              }}
            />
          </div>
        </div>
      </section>
      {/* <section className="w-full p-3 flex gap-x-3 overflow-scroll">
        <Earnings time="Month" />
        <Earnings time="Month" />
        <Earnings time="Month" />
        <Earnings time="Month" />
      </section> */}
    </div>
  );
};

export default Dashboard;
