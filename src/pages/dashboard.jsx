import Earnings from "../components/earnings";
import { Bar, Doughnut, Line } from "react-chartjs-2";
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

  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const result = await axios.get(
          "http://localhost:5500/admin/v1/getAllOrders"
        );
        return result.data;
      } catch (error) {
        return error;
      }
    },
  });
  console.log(
    // data?.filter(()=>{})
    data
      ?.filter((er) => {
        return er.category == "minum";
      })
      .map((val) => {
        return val.amount;
      })
  );
  return (
    <div className="mt-16 w-full h-fit">
      <section className="w-full h-fit flex py-4 px-3 justify-center md:justify-start items-center">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          <Earnings time="Month" />
          <Earnings time="Week" />
          <Earnings time="day" />
        </div>
      </section>
      <section className="px-3 flex-col">
        <h1 className="text-xl font-bold mb-2">Analytics</h1>
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="grafik w-full h-fit bg-white rounded-md p-2">
            <h1 className="font-semibold text-xl">Grafik Pesanan</h1>
            <Line
              datasetIdKey="se"
              options={{
                animation: { duration: 2000, easing: "easeOutExpo" },
                backgroundColor: "green",
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
                    data: data
                      ?.filter((er) => {
                        return er.category == "paket";
                      })
                      .map((val) => {
                        return val.amount;
                      }),
                  },
                  {
                    id: 2,
                    label: "makan",
                    backgroundColor: "orange",
                    borderColor: "orange",
                    data: data
                      ?.filter((er) => {
                        return er.category == "makan";
                      })
                      .map((val) => {
                        return val.amount;
                      }),
                  },
                  {
                    id: 3,
                    label: "minum",
                    backgroundColor: "salmon",
                    borderColor: "salmon",
                    data: data
                      ?.filter((er) => {
                        return er.category == "minum";
                      })
                      .map((val) => {
                        return val.amount;
                      }),
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
                    data: [5, 1, 7, 4, 6, 2],
                  },
                  {
                    id: 2,
                    label: "makan",
                    backgroundColor: "orange",
                    borderColor: "orange",
                    data: [3, 6, 2, 6, 8, 4],
                  },
                  {
                    id: 3,
                    label: "minum",
                    backgroundColor: "salmon",
                    borderColor: "salmon",
                    data: [4, 5, 3, 5, 7, 1],
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
