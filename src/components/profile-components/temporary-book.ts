import bookImg2 from '../../assets/img/books2.png';
import { Book, UserBook } from '../../models/interfaces';

export const temporaryBook = (book: UserBook) => {
  if (book && book.id) {
    return {
      issueYear: book.issueYear,
      rating: book.rating,
      title: book.title,
      authors: book.authors,
      image: {
        url: book.image ?? bookImg2,
      },
      categories: [],
      id: book.id,
    };
  }

  return null;
};

export const temporaryBookArray = (books: UserBook[]) => {
  if (books && books.length > 0) {
    const historyBooksArr: Book[] = [];

    books.forEach((book) => {
      const historyBook: Book = {
        issueYear: book.issueYear,
        rating: book.rating,
        title: book.title,
        authors: book.authors,
        image: {
          url: book.image ?? bookImg2,
        },
        categories: [],
        id: book.id,
      };

      historyBooksArr.push(historyBook);
    });

    return historyBooksArr;
  }

  return null;
};
