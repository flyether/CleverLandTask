import { FC, useEffect, useMemo, useState } from 'react';
import cnBind from 'classnames/bind';

import bookImg2 from '../../assets/img/books2.png';
import { Book, UserData } from '../../models/interfaces';
import { useAppSelector } from '../../store';
import { checkIsAfterTomorrow } from '../calendar/helpers';
import { CardGlobal } from '../cards-components/card/card-book';

import { temporaryBook } from './temporary-book';

import styles from './profile-components.module.css';

const cx = cnBind.bind(styles)

export const YourBook: FC<{ userData: UserData }> = ({ userData }) => {
  const temporary = useMemo(() => temporaryBook(userData.delivery.book), [userData.delivery.book]);

  const [isBook, setBook] = useState<Book | null>(temporary);
  const { allBooks } = useAppSelector((state) => state.books);
  const [isOverdue, setOverdue] = useState(false);

  useEffect(() => {
    if (userData.delivery && userData.delivery.dateHandedTo) {
      const dateObj = new Date(userData.delivery.dateHandedTo);
      const checkOverdue = checkIsAfterTomorrow(dateObj)

      setOverdue(checkOverdue)
    }
  }, [userData.delivery, userData.delivery.dateHandedTo]);

  useEffect(() => {
    if (allBooks && userData.delivery.book) {
      const book = allBooks.find((b) => b.delivery?.id === userData.delivery.id);

      if (book) {
        setBook(book);
      }
    }
  }, [allBooks, userData.delivery.book, userData.delivery.dateHandedTo, userData.delivery.id]);


  return (
    <main className={styles.container}>
      <div className={styles.title} > Книга которую взяли </div>
      <div className={styles.text} >Здесь можете просмотреть информацию о книге и узнать сроки возврата</div>
      {userData.delivery && isBook?.delivery ?
        <div className={styles.position}>
          <div
            data-test-id={
              isOverdue ? 'expired' : 'nnn'
            }
            className={cx({
              hidden: !isOverdue,
              overdue: isOverdue
            })}>Вышел срок пользования книги
            <div className={styles.text__wite__small}>Верните книгу, пожалуйста</div>
          </div>
          {isBook ? <CardGlobal delivery={true} book={isBook} path='' display={false} profile={true} bookDel={() => { }} /> : temporary ? <CardGlobal delivery={true} book={temporary} path='' bookDel={() => { }} display={false} profile={true} /> : null}
        </div>
        : <div data-test-id='empty-blue-card' className={styles.wrapper} > Прочитав книгу, она отобразится в истории
        </div>}
    </main>
  )
};
