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
