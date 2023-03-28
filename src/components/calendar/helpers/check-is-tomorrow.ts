import { checkDateIsEqual } from './check-date-is-equal';

export const checkIsTomorrow = (date: Date) => {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowDayOfWeek = tomorrow.getDay();

  if (tomorrowDayOfWeek === 0) {
    tomorrow.setDate(tomorrow.getDate() + 1);
  } else if (tomorrowDayOfWeek === 6) {
    tomorrow.setDate(tomorrow.getDate() + 2);
  }

  return checkDateIsEqual(tomorrow, date);
};
