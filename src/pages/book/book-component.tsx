import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cnBind from 'classnames/bind';

import ImageEmpty from '../../assets/img/nobook.png'
import { EvaluationButton } from '../../components/buttons';
import { CalendarChange, CalendarCom } from '../../components/calendar';
import { BookButton } from '../../components/cards-components/card/card-book';
import { BookEvaluation, ChangeEvaluation } from '../../components/evaluation';
import { Rating } from '../../components/rating/rating';
import { Slider } from '../../components/swiper/swiper';
import { Url } from '../../models/constants';
import { BookId,  UserComments } from '../../models/interfaces';
import { useAppSelector } from '../../store';
import { selectUserId } from '../../store/select-user-id';
import { UserAPI } from '../../store/services/user-servese';

import { CommentsList } from './comments-list';

import styles from './book-page.module.css'

const cx = cnBind.bind(styles)

export const BookComponent: FC<{ book: BookId }> = ({ book }) => {

  const [imageUrl, setImageUrl] = useState(ImageEmpty);
  const [isCalendar, setCalendar] = useState(false);
  const [isEvaluation, setEvaluation] = useState(false);
  const [isListVisible, setIsListVisible] = useState(true);
  const userId = useSelector(selectUserId);
  const { image, allBooks } = useAppSelector((state) => state.books);
  const { userMe } = useAppSelector((state) => state.userData);
  const [isRateDisabled, setRateDisabled] = useState(false);
  const [trigger] = UserAPI.useLazyGetUserMeQuery()
  const [isCalendarChange, setCalendarChange] = useState(false);
  const [isEvaluationChange, setEvaluationChange] = useState(false);
  const [desiredСomment, setDesiredComment] = useState<UserComments | null>(null);

  let idNum = 3;

  if (!book?.id) { idNum = book?.id as number }


  useEffect(() => {
    if (book.comments && book.comments.some(comment => comment.user.commentUserId === userId)) {
      setRateDisabled(true);
    } else setRateDisabled(false)
  }, [book.comments, userId]);

  useEffect(() => {
    if (image.url && image.url !==null ) {
      setImageUrl(`${Url.BASE_URL}${image.url}`);
    } else if (allBooks) {
      const bookWithMatchingId = allBooks.find((el) => el?.id === idNum);

      if (bookWithMatchingId?.image) {
        setImageUrl(`${Url.BASE_URL}${bookWithMatchingId.image.url}`);
      }
    }
  }, [image.url, allBooks, idNum]);

  function handleClick() {
    setIsListVisible(!isListVisible)
  }

  return (
    <React.Fragment>
      {(isEvaluationChange && book.id) && (
        <ChangeEvaluation bookId={book.id} comment={desiredСomment} close={() => setEvaluationChange(false)} profile={false} />
      )}
      {isCalendarChange && <CalendarChange bookBookingId={book.booking.id} bookingDate={book.booking.dateOrder} singleBook={true} bookId={book.id} close={() => setCalendarChange(false)} />}
      <div className={styles.wrapper}>
        {isCalendar && <CalendarCom singleBook={true} bookId={book.id} close={() => setCalendar(false)}
        />}
        {isEvaluation && <BookEvaluation bookId={book.id} close={() => setEvaluation(false)}
        />}
        <div className={styles.div1}>
          {(book.images?.length ?? 0) > 1 ? (
            <Slider book={book} />
          ) : (
            <div className={styles.slider}>
              <img
                src={imageUrl}
                alt="book img"
              />
            </div>
          )}
        </div>
        <div data-test-id="card" className={styles.div2}>
          <div
            data-test-id='book-title'
            className={styles.description}>{book?.title}</div>
          <div className={styles.author}> {book?.authors}</div>
          <div className={styles.margin}>
            <BookButton
              unBooking={() => { }}
              order={book.booking?.order}
              delivery={book.delivery}
              setCalendarChangeBooking={setCalendarChange}
              stylesButtonBooking={styles.button__booking__booking} bookId={book.booking?.customerId}
              setCalendar={setCalendar}
              stylesButton={styles.button}
            />
          </div>
        </div>
        <div className={styles.div3}>
          <div className={styles.about} >
            <div className={styles.about_title} >О книге</div>
            <p className={styles.about_text} > {book.description} </p>
          </div>
        </div>
        <div className={styles.wrapper__colum}>
          <span className={styles.rating} >Рейтинг</span>
          <div className={styles.rating_div}>
            <Rating rating={book.rating} />
            <div className={styles.number}>{book?.rating} </div>
          </div>
          <div className={styles.table}>
            <div className={styles.rating}>Подробная информация</div>
            <div className={styles.tabg}>
              <div className={styles.tab}>
                <div className={styles.tab__gray}>Издательство</div>
                <div className={styles.tab__black}>{book?.publish} </div>
              </div>
              <div className={styles.tab}>
                <div className={styles.tab__gray}>Жанр</div>
                <div className={styles.tab__black}>{book?.categories} </div>
              </div>
            </div>
            <div className={styles.tabg}>
              <div className={styles.tab}>
                <div className={styles.tab__gray}>Год издания</div>
                <div className={styles.tab__black}>{book?.issueYear} </div>
              </div>
              <div className={styles.tab}>
                <div className={styles.tab__gray}>Вес</div>
                <div className={styles.tab__black}>{book?.weight} </div>
              </div>
            </div>
            <div className={styles.tabg}>
              <div className={styles.tab}>
                <div className={styles.tab__gray}>Переплет</div>
                <div className={styles.tab__black}>{book?.cover} </div>
              </div>
              <div className={styles.tab}>
                <div className={styles.tab__gray}>ISBN</div>
                <div className={styles.tab__black}>{book?.ISBN}  </div>
              </div>
            </div>
            <div className={styles.tabg}>
              <div className={styles.tab}>
                <div className={styles.tab__gray}>Формат</div>
                <div className={styles.tab__black}>{book?.format} </div>
              </div>
              <div className={styles.tab}>
                <div className={styles.tab__gray}>Изготовитель</div>
                <div className={styles.tab__black}>{book?.producer
                }  </div>
              </div>
            </div>
          </div>
          <div className={cx({
            num: true,
            rating: isListVisible,
            review__without__border: !isListVisible
          })}>
            Отзывы  <div className={styles.num1}> {book?.comments ? book?.comments.length : 0} </div>
            {book.comments &&
              <button
                data-test-id='button-hide-reviews'
                type="button"
                onClick={handleClick}
              >
                <div className={cx({
                  open: isListVisible,
                  close: !isListVisible
                })} />
              </button>}
          </div>
          <div data-test-id='reviews' className={isListVisible ? '' : styles.hide}>
            {book.comments && <CommentsList comments={book.comments} />}
          </div>
        </div>
        <EvaluationButton setComment={setDesiredComment}
          bookId={book.id} bookData={book} setEvaluation={setEvaluation} setUnChange={setEvaluationChange} bookPage={true} setBookId={() => { trigger() }} userData={userMe} />
      </div>
    </React.Fragment>
  )
}