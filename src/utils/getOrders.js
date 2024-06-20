import axios from "axios";

export const allOrders = async () => {
  try {
    const result = await axios.get(
      "http://localhost:5500/admin/v1/getAllOrders"
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// export const yearlyOrders = async () => {
//     try {
//       const result = await axios.get(
//         "http://localhost:5500/admin/v1/getThisYearOrders"
//       );
//       return result.data;
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
//   };

export const sixMonthOrders = async () => {
  try {
    const result = await axios.get(
      "http://localhost:5500/admin/v1/getSixMonthOrders"
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
      "http://localhost:5500/admin/v1/getSixMonthOrdersSum"
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const monthlyOrders = async () => {
  try {
    const result = await axios.get(
      "http://localhost:5500/admin/v1/getThisMonthOrders"
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const weeklyOrders = async () => {
  try {
    const result = await axios.get(
      "http://localhost:5500/admin/v1/getThisWeekOrders"
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const dailyOrders = async () => {
  try {
    const result = await axios.get(
      "http://localhost:5500/admin/v1/getThisDayOrders"
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sixMonthOrderPerCat = (time, cat) => {
  const dataSum = time?.data
    ?.filter((dat) => {
      return dat._id.category == cat;
    })
    .map((dat) => {
      return dat.jumlah;
    });
  return dataSum;
};

export const fitDataToMonth = (data) => {
  let ar = [];
  try {
    if (data.length < 6) {
      for (let i = 0; i < 6 - data.length; i++) {
        ar.push(0);
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
      return acc + cur.keuntungan;
    }, 0);
    return profit;
  } catch (error) {
    return null;
  }
};
