import { Doughnut, Line, Bar } from "react-chartjs-2";
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
  // ChartJS.defaults.aspectRatio = false;
  // ChartJS.defaults.responsive = false;
  ChartJS.defaults.plugins.legend.labels.boxWidth = 10;
  ChartJS.defaults.plugins.legend.labels.boxHeight = 10;
  // ChartJS.overrides[Doughnut]
  return (
    <div className="mt-16">
      <section className="w-full h-fit p-3 grid grid-cols-1 gap-3">
        <div className="grid grid-cols-11 gap-3">
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
        </div>
        <div className="grid grid-cols-11 gap-3">
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
        </div>
      </section>
    </div>
  );
};

export default Sales;
