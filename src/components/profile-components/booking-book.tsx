import {  FC, useEffect, useMemo, useState } from 'react';
import cnBind from 'classnames/bind';

import { Book, UserData } from '../../models/interfaces';
import { useAppSelector } from '../../store';
import { checkIsAfterTomorrow } from '../calendar/helpers';
import { CardGlobal } from '../cards-components/card/card-book';

import { temporaryBook } from './temporary-book';

import styles from './profile-components.module.css';

const cx = cnBind.bind(styles)

export const BookingBook:FC<{ userData: UserData, }> = ({ userData,  }) => {
 
  const temporary = useMemo(() => temporaryBook(userData.booking.book), [userData.booking.book]);
  const [isBook, setBook] = useState<Book | null >(temporary);
  const { allBooks } = useAppSelector((state) => state.books);
  const [isOverdue , setOverdue] = useState(false);
  
  useEffect(() => {
    if(userData.booking && userData.booking.dateOrder){
      const dateObj = new Date(userData.booking.dateOrder);
          const checkOverdue = checkIsAfterTomorrow(dateObj)

          setOverdue(checkOverdue)       
      } 
  }, [userData.booking, userData.booking.dateOrder]);

  useEffect(() => {
    if(allBooks && userData.booking){
      allBooks.forEach((book) => {
        if (book.booking?.id && book.booking.id === userData.booking.id) {
          setBook(book);   
        } 
      });
      } 
  }, [allBooks,  userData.booking, userData.booking.id]);





  return (
    <main className={styles.container}>
      <div className={styles.title} > Забронированная книга </div>
      <div className={styles.text} >Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь</div>
      {userData.booking.book ?
      <div className={styles.position}>
      <div 
        data-test-id={
          isOverdue ? 'expired' : 'alternative'
       }
      className={cx({
        hidden: !isOverdue,
        overdue: isOverdue
     })}> Дата бронирования книги истекла 
     <div className={styles.text__wite__small}>Через 24 часа книга будет  доступна всем</div>
     </div>

    {isBook ? <CardGlobal delivery={false}  book={isBook} path='' bookDel={()=> setBook(null)} display={false} profile={true} /> : temporary? <CardGlobal delivery={false}  book={temporary} path='' bookDel={()=> setBook(null)} display={false} profile={true} />:null }  
      </div>
      :   <div data-test-id='empty-blue-card' className={styles.wrapper} > Забронируйте книгу 
и она отобразится  </div>}      
    </main>
  )
};
