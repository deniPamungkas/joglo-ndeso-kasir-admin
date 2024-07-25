import axios from "axios";

//get all orders from beginning
export const allOrders = async () => {
  try {
    const result = await axios.get(
      "https://joglo-ndeso-kasir-api-dev.vercel.app/sales",
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sixMonthOrders = async () => {
  try {
    const result = await axios.get(
      "https://joglo-ndeso-kasir-api-dev.vercel.app/sales/six-month",
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sixMonthOrdersSum = async () => {
  try {
    const result = await axios.get(
      "https://joglo-ndeso-kasir-api-dev.vercel.app/sales/sixx-month",
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//get this year orders
export const yearlyOrders = async () => {
  try {
    const result = await axios.get(
      "https://joglo-ndeso-kasir-api-dev.vercel.app/sales/this-year",
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//get this month orders
export const monthlyOrders = async () => {
  try {
    const result = await axios.get(
      "https://joglo-ndeso-kasir-api-dev.vercel.app/sales/this-month",
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//get this week orders
export const weeklyOrders = async () => {
  try {
    const result = await axios.get(
      "https://joglo-ndeso-kasir-api-dev.vercel.app/sales/this-week",
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//get this day orders
export const dailyOrders = async () => {
  try {
    const result = await axios.get(
      "https://joglo-ndeso-kasir-api-dev.vercel.app/sales/this-day",
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//get six month data and grouping by its category
export const sixMonthOrderPerCat = (time, cat) => {
  const data = time?.data?.filter((dat) => {
    return dat.category == cat;
  });
  const dataSum = data?.map((dat) => {
    return { qty: dat.jumlah, month: dat.bulan, year: dat.tahun, cat: cat };
  });
  const dataThisMonthNotExist = data?.filter((asd) => {
    return asd.bulan == new Date().getMonth() + 1;
  });
  if (Array.isArray(dataSum)) {
    if (!dataThisMonthNotExist?.length) {
      return [
        ...dataSum,
        {
          qty: 0,
          month: new Date().getMonth() + 1,
          cat: cat,
        },
      ];
    }
  }
  return dataSum;
};

//fit the data to six month ago by month, when data of previous month is not exist, return {qty: 0,month: new Date().getMonth() + 1 - 5 + i,year: new Date().getFullYear().toString()}
export const fitDataToMonth = (data) => {
  let ar = [];
  try {
    if (data?.length < 6) {
      for (let i = 0; i < 6 - data.length; i++) {
        ar.push({
          qty: 0,
          month: new Date().getMonth() + 1 - 5 + i,
          year: new Date().getFullYear().toString(),
        });
      }
      return [...ar, ...data];
    }
  } catch (err) {
    return err;
  }
};

export const profitThisTime = (jangka) => {
  try {
    const profit = jangka.data?.reduce((acc, cur) => {
      return acc + cur.pemasukan;
    }, 0);
    return profit;
  } catch (error) {
    return null;
  }
};

//sorting data by year then month
export const sortByYearnMonth = (data) => {
  return data?.sort((a, b) => {
    if (a.year === b.year) {
      return a.month - b.month;
    } else {
      return a.year - b.year;
    }
  });
};
