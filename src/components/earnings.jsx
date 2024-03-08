const Earnings = (props) => {
  return (
    <section className="w-[200px] h-[80px] bg-white p-2 flex flex-col justify-between rounded-md shrink-0">
      <div className="w-full flex justify-between items-center ">
        <span className=" text-sm">This {props.time}</span>
        <span className="text-xs">Aug</span>
      </div>
      <div>
        <span className="text-lg font-bold">Rp. 2.305.000</span>
      </div>
    </section>
  );
};

export default Earnings;
