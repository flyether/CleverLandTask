import { BookId, Delivery, UserComments } from '../../models/interfaces';
import { formattedDateFunction, formattedDateFunction10 } from '../../utils/format-date';

export function findUserComment(bookData: BookId, bookId: number, userId: number): UserComments | null {
  const userComment = bookData.comments.find((comment) => comment.user.commentUserId === userId);

  if (userComment) {
    if (userComment.id && userComment.rating &&  bookId) {
      const commentMe: UserComments = {
        id: userComment.id,
        rating: userComment.rating,
        text: userComment.text?? '',
        bookId
      }

    return commentMe
  }  
}

  return null;
}

export function getText(
  userId: number,
  order?: boolean,
  delivery?: Delivery,
  profile?: boolean,
  deliveryProfile?: boolean,
  bookId?: number | null
): string {
  let text = 'забронировать';

  if ((order && bookId !== userId) || (delivery && !profile)) {
    text = 'забронирована';
  }

  if (profile) {
    text = 'отменить бронь';
  }

  if (order && bookId === userId && !profile) {
    text = 'забронирована';
  }

  if (delivery && delivery.dateHandedTo) {
    text = `Занята до ${formattedDateFunction(delivery.dateHandedTo)}`;
  }

  if (deliveryProfile && delivery && delivery.dateHandedTo) {
    text = `возврат ${formattedDateFunction10(delivery.dateHandedTo)}`;
  }

  return text;
}
