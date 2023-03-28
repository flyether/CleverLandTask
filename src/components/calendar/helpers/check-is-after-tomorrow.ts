export const checkIsAfterTomorrow = (date: Date) => {
  const dateNow = new Date();

  dateNow.setHours(dateNow.getHours());

  if (dateNow < date) {
    return false;
  }

  return true;
};

