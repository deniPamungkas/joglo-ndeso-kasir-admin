import Earnings from "../components/earnings";

const Dashboard = () => {
  return (
    <div className="w-full h-fit">
      <section className="w-full h-fit flex py-4 px-1 justify-center items-center">
        <div className="grid grid-cols-2 gap-2">
          <Earnings time="Month" />
          <Earnings time="Week" />
          <Earnings time="day" />
        </div>
      </section>
      <section className="p-3">
        <h1 className="text-xl font-bold">Analytics</h1>
        <div className="grafik w-full h-[500px] bg-white rounded-md"></div>
      </section>
      <section className="w-full p-3 flex gap-x-3 overflow-scroll">
        <Earnings time="Month" />
        <Earnings time="Month" />
        <Earnings time="Month" />
        <Earnings time="Month" />
      </section>
    </div>
  );
};

export default Dashboard;
