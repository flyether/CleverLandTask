export const checkDateIsEqual = (compareDates: Date, isEqualDate: Date ) =>
compareDates.getDate() === isEqualDate.getDate() &&
compareDates.getMonth() === isEqualDate.getMonth() &&
compareDates.getFullYear() === isEqualDate.getFullYear();