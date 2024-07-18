export const sumArray = (arg) => {
  if (arg !== undefined) {
    if (arg.length) {
      const sum = arg.reduce((acc, cur) => {
        return acc + cur.price * cur.amount;
      }, 0);
      return sum;
    } else {
      return 0;
    }
  }
};
