
import { FC,  useState } from 'react';
import { useSelector } from 'react-redux';

import { BookingPost } from '../../models/interfaces';
import { PropsCalendarCom } from '../../models/props-interfaces';
import { selectUserId } from '../../store/select-user-id';
import { BookAPI } from '../../store/services/book-service';
import { useNoScroll } from '../../utils/use-no-scroll';
import {  ServerGoodResponse } from '../errors';

import { Calendar } from './calendar';

import styles from './calendar.module.css';


export const CalendarCom: FC<PropsCalendarCom> = ({ close, bookId, singleBook = false }) => {
  const [isDisabledBookingChange, setDisabledBookingChange] = useState(true);
  const [selectedDate, setSelectedDay] = useState(new Date());
  const [isDisabledBooking, setDisabledBooking] = useState(true);
  const [isResponsive, setResponsive] = useState(false);
  const [isModalErrorActive, setModalErrorActive] = useState(false);
  const [booking] = BookAPI.useBookingMutation();
 
  const userId = useSelector(selectUserId);

  useNoScroll();

  const handleClickOverly = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      close();
    }
  };

  const handleKeyPressOverly = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && event.currentTarget === event.target) {
      close();
    }
  };

  const handleClick = async () => {
    const dateFormat = new Date(selectedDate);

    dateFormat.setHours(dateFormat.getHours() + 3);
    const isoDate = dateFormat.toISOString();

    const dataSend: BookingPost = {
      data: {
        book: bookId?.toString(),
        order: true,
        dateOrder: isoDate,
        customer: userId.toString(),
      }
    };

    await booking(dataSend).unwrap();
         setResponsive(true)
  }

  if (isResponsive) {
    return (<ServerGoodResponse message='Книга забронирована. Подробности можно посмотреть на странице Профиль' close={() => setResponsive(false)} closeParent={() => close()} />)
  }


  return (
      <main aria-hidden={true} onClick={handleClickOverly}
        onKeyDown={handleKeyPressOverly} data-test-id='modal-outer' className={styles.container}>
        <div data-test-id='booking-modal' className={styles.wrapper}>
          <button
            data-test-id='modal-close-button'
            className={styles.cross__button}
            type="button"
            onClick={close}>
            ✕
          </button>
          <div className={styles.title} data-test-id='modal-title'>
            Выбор даты бронирования
          </div>
          <Calendar locale='ru-Ru' setDisabledBookingChange={(z) => setDisabledBookingChange(z)} selectDate={(date) => setSelectedDay(date)} setDisabledBooking={(b) => setDisabledBooking(b)} />
          <button
            disabled={isDisabledBooking}
            data-test-id='booking-button'
            className={styles.button__my}
            onClick={handleClick}
            type='submit' >забронировать</button>
        </div>
      </main>
  )
};
