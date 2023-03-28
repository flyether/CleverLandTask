
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Breadcrumbs } from '../../components/breadcrumbs';
import { BookAPI } from '../../store/services/book-service';

import { BookComponent } from './book-component'

import styles from './book-page.module.css'

export const BookPage = () => {
  const { category, bookId } = useParams();
  const { data: bookVar} = BookAPI.useGetBookByIdQuery(bookId? bookId:'3')
  const [book, setBook] = useState(bookVar);


  useEffect(() => {
    if (Array.isArray(bookVar)) {
      const foundBook = bookVar.find((b) => b.id.toString() === bookId);

      if (foundBook) {
        setBook(foundBook);
      }
    } else {
      setBook(bookVar);
    }
  }, [book, bookId, bookVar]);

  return (
    <div >
      <div className={styles.path}>
        {
        (book && book.categories[0]) && <Breadcrumbs bookId={bookId} category={book?.categories[0]} path={category} label={book?.title} />
      }    
      </div>
      <div className={styles.container}>
        {book && <BookComponent book={book} />}
      </div>
    </div>
  )
}