export const displayError = (endpointName: string) => {
  switch (endpointName) {

    case 'addComments':
      return 'Оценка не была отправлена. Попробуйте позже!';
    case 'updateComments':
      return 'Изменения не были сохранены. Попробуйте позже!';
    case 'booking':
      return 'Что-то пошло не так, книга не забронирована. Попробуйте позже!';
    case 'updateBooking':
      return 'Изменения не были сохранены. Попробуйте позже!';
    case ' deleteBooking':
      return 'Не удалось снять бронирование книги. Попробуйте позже!';
    case 'regUser':
      return undefined;
    case 'authorizationUser':
      return undefined;
    case 'forgotPassword':
      return undefined;
    case 'resetPassword':
      return undefined;
    case 'updateUser':
      return 'Изменения не были сохранены. Попробуйте позже!';
    case 'updateUserImg':
      return 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!';


    default:
      return 'Что-то пошло не так. Обновите страницу через некоторое время.';
  }
};
