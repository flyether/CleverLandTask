export const checkIsLast = (date: Date) => {
  const check = new Date();

  check.setDate(check.getDate() - 1);
  check.setHours(0, 0, 0, 0);

  date.setHours(0, 0, 0, 0);
  if (check < date) {
    return false;
  }

  return true;
};
