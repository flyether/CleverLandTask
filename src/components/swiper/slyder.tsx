import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import bookImg2 from '../../assets/img/books2.png'
import { Url } from '../../models/constants';
import { Book, UserComments, UserData } from '../../models/interfaces';
import { setBookImg, useAppDispatch } from '../../store';
import { BookAPI } from '../../store/services/book-service';
import { EvaluationButton } from '../buttons';
import { BookEvaluation, ChangeEvaluation } from '../evaluation';
import { Rating } from '../rating/rating';

import styles from './slider.module.css';



export const HistorySlider: FC<{ books: Book[], userData: UserData }> = ({ books, userData }) => {
  const [isEvaluation, setEvaluation] = useState(false);
  const [isEvaluationChange, setEvaluationChange] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [bookId, setBookId] = useState<number | null>(null);
  const [comment, setComment] = useState<UserComments | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: bookIdData } = BookAPI.useGetBookByIdQuery(bookId? bookId.toString():'3')

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth < 600) {
      setItemsPerPage(1);
    } else if (screenWidth < 900) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(4);
    }
  }, [screenWidth]);


  return (
    <div className={styles.sliderContainer}
      >
      {(isEvaluation && bookId) && (
        <BookEvaluation bookId={bookId} close={() => setEvaluation(false)} profile={true} />
      )}
      {(isEvaluationChange && bookId) && (
        <ChangeEvaluation bookId={bookId} comment={comment} close={() => setEvaluationChange(false)} profile={true} />
      )}
      <div className={styles.sliderTrack}>
        {books.slice(currentIndex, currentIndex + itemsPerPage).map((book, index) => (
          <div data-test-id='history-slide' aria-hidden={true} onClick={() => {
            dispatch(setBookImg(book.image.url ? `${Url.BASE_URL}${book.image.url}` : bookImg2))
            navigate(`${Url.PATH_BOOKS}${book.categories[0]}/${book.id}`);
          }}
            className={styles.sliderItem} key={(654 + index).toString()}>
            <img
              src={book.image.url ? `${Url.BASE_URL}${book.image.url}` : bookImg2}
              alt="books face"
              className={styles.card__img}
            />
            <div className={styles.star}>
              <Rating rating={book.rating} />
            </div>
            <div className={styles.description}>{book.title}</div>
            <div className={styles.author}>{book.authors}</div>
          {bookIdData &&  <EvaluationButton bookData={bookIdData}  setComment={setComment}
              bookId={book.id} setEvaluation={setEvaluation} setUnChange={setEvaluationChange} setBookId={()=>setBookId(book.id)} userData={userData} />}
          </div>
        ))}
      </div>

      <div className={styles.sliderPagination}>
        {books.map((_, index) => (
          <div
            aria-hidden={true}
            key={(454 + index).toString()}
            className={`${styles.sliderPaginationItem} ${currentIndex <= index && index < currentIndex + itemsPerPage
              ? styles.active
              : ''
              }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}