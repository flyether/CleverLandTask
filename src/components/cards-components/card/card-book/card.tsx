import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cnBind from 'classnames/bind';

import bookImg2 from '../../../../assets/img/books2.png';
import { Url } from '../../../../models/constants';
import { PropsCard } from '../../../../models/props-interfaces';
import { setBookImg, useAppDispatch, useAppSelector} from '../../../../store';
import { BookAPI } from '../../../../store/services/book-service';
import { BookButton } from '../../../buttons/button-booking';
import { CalendarChange, CalendarCom } from '../../../calendar';
import { ServerGoodResponse } from '../../../errors';
import { Rating } from '../../../rating/rating';

import styles from './card.module.css'

const cx = cnBind.bind(styles)

export const CardGlobal = ({delivery, book, path, display, profile, bookDel }: PropsCard) => {
   const location = useLocation();
   const dispatch = useAppDispatch();
   const { cat: categories, searchValue } = useAppSelector((state) => state.stateComponent);
   const [isCalendar, setCalendar] = useState(false);
   const [isCalendarChange, setCalendarChange] = useState(false);
   const [isPath, setPathTrue] = useState('');
   const navigate = useNavigate();
   const [deleteBooking] = BookAPI.useDeleteBookingMutation();
   const [isResponsiveDel, setResponsiveDel] = useState(false);
   const [isRating, setRating] = useState(0);

   let index = 0;
   let url = bookImg2;
  
   
   useEffect(() => {
      if (book.rating && book.rating !==0) {
    setRating(book.rating)
      }
   }, [book.rating]);


   if (book.image) { url = `${Url.BASE_URL}${book.image.url}` }

   if (searchValue && book.title) { index = book.title?.toLowerCase().indexOf(searchValue.toLowerCase()); }

   useEffect(() => {
      if (path) {
         setPathTrue(path);

      } else if (categories) {
         for (let i = 0; i < categories.length; i++) {
            const el = categories[i];

            if (el.name === book.categories[0]) {
               setPathTrue(el.path);
               break;
            }
         }
      }
   }, [path, book.categories, categories]);

   const handleUnbooking = async () => {
      await deleteBooking(book.booking?.id?.toString()).unwrap(); 
            setResponsiveDel(true)  
       }

   const handleClick = () => {
      if (book.categories && location.pathname !== Url.PATH_All) {
         navigate(`${Url.PATH_BOOKS}${isPath}/${book.id}`);
      } else { navigate(`${Url.PATH_All}/${book.id}`) }
      dispatch(setBookImg(url))
   }

   const handleKeyPress = (event: { key: string; }) => {
      if (book.categories) {
         if (event.key === 'Enter') {
            dispatch(setBookImg(url))
            navigate(`${Url.PATH_BOOKS}${isPath}/${book.id}`);
         }
      }
   }

   return (
      <div >
         {isResponsiveDel && <ServerGoodResponse message='Бронирование книги успешно отменено!' close={() => setResponsiveDel(false)}  closeParent={()=> {bookDel()}}/>}
         {isCalendar && <CalendarCom bookId={book.id} close={() => setCalendar(false)} />}
         {isCalendarChange && <CalendarChange bookBookingId={book.booking?.id} bookId={book.id} bookingDate={book.booking?.dateOrder} close={() => setCalendarChange(false)} />}
         <div
         data-test-id='card'
            className={cx({
               tile__card__container: display,
               card__container1: !display
            })}>
            <div
               className={cx({
                  pointer: display,
                  card__container__flex1: !display
               })}
               onClick={handleClick}
               onKeyDown={handleKeyPress}
               role="button"
               tabIndex={0} >
               {display ? <React.Fragment>
                  <img src={url} alt="books face" className={styles.card__img} />
                  < div className={styles.star__text}>
                     <Rating rating={isRating} />
                  </div>

                  <div className={styles.description}>
                     {searchValue ? <div >
                        {book.title && book.title.slice(0, index)}
                        <span data-test-id='highlight-matches' style={{ color: 'rgb(255, 82,83)' }}>
                           {book.title && book.title.slice(index, index + searchValue.length)}
                        </span>
                        {book.title && book.title.slice(index + searchValue.length)}
                     </div> : <div> {book.title} </div>}
                  </div>

                  <div className={styles.author}> {book.authors}</div>
                  <BookButton
                     unBooking={() => { }}
                     setCalendarChangeBooking={setCalendarChange}
                     order={book.booking?.order}
                     delivery={book.delivery}
                     bookId={book.booking?.customerId}
                     setCalendar={setCalendar}
                     stylesButton={styles.button}
                     stylesButtonBooking={styles.button_booking}
                  />
               </React.Fragment> : <React.Fragment><div className={styles.card__img1}>
                  <img src={url} alt="books face" className={styles.img1} />
               </div>
                  <div className={styles.card__container__colum1}>
                     <div className={styles.description1}> {book.title}</div>
                     <div className={styles.author1}> {book.authors}</div>
                     <div className={styles.card__container__flex__rating1}>
                        < div className={styles.star__text1}>
                           <Rating rating={isRating} />
                        </div>

                        <div className={styles.button__div1} >
                           <BookButton
                              deliveryProfile={delivery}
                              unBooking={handleUnbooking}
                              profile={profile}
                              order={book.booking?.order}
                              delivery={book.delivery}
                              setCalendarChangeBooking={setCalendarChange}
                              bookId={book.booking?.customerId}
                              setCalendar={setCalendar}
                              stylesButton={styles.button1}
                              stylesButtonBooking={styles.button1_booking}
                           />
                        </div>
                     </div>
                  </div></React.Fragment>}
            </div>
         </div>
      </div>
   );
};
