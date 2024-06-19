const Earnings = (props) => {
  return (
    <section className="w-[175px] h-[80px] md:w-full md:h-full bg-white p-2 flex flex-col justify-between rounded-md shrink-0">
      <div className="w-full flex justify-between items-center ">
        <span className=" text-sm">This {props.time}</span>
        <span className="text-xs">Aug</span>
      </div>
      <div>
        <span className="text-lg font-bold">
          {props.value
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "IDR",
              }).format(props.value)
            : "0"}
        </span>
      </div>
    </section>
  );
};

export default Earnings;
