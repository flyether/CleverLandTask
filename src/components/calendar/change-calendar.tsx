import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { BookingUpdate } from '../../models/interfaces';
import { CalendarChangeProps } from '../../models/props-interfaces';
import { selectUserId } from '../../store/select-user-id';
import { BookAPI } from '../../store/services/book-service';
import { useNoScroll } from '../../utils/use-no-scroll';
import { ServerGoodResponse } from '../errors';

import { Calendar } from './calendar';

import styles from './calendar.module.css';


export const CalendarChange: FC<CalendarChangeProps> = ({ close, bookingDate, bookBookingId, bookId, singleBook = false }) => {
  const [selectedDate, setSelectedDay] = useState(new Date(bookingDate ? bookingDate : ''));
  const [isDisabledBookingChange, setDisabledBookingChange] = useState(true);
  const [isDisabledBooking, setDisabledBooking] = useState(true);
  const [isResponsive, setResponsive] = useState(false);
  const [isModalErrorActive, setModalErrorActive] = useState(false);
  const [isResponsiveDel, setResponsiveDel] = useState(false);
  const [updateBooking] = BookAPI.useUpdateBookingMutation();
  const [deleteBooking] = BookAPI.useDeleteBookingMutation();

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

  const handleClickCancel = async () => {
    await deleteBooking(bookBookingId?.toString()).unwrap()
        setResponsiveDel(true)
  }

  const handleClick = async () => {
    const dateFormat = new Date(selectedDate);

    dateFormat.setHours(dateFormat.getHours() + 3);
    const isoDate = dateFormat.toISOString();
    const dataSend: BookingUpdate = {
      body: {
        data: {
          book: bookId?.toString(),
          order: true,
          dateOrder: isoDate,
          customer: userId.toString(),
        }
      },
      id: bookBookingId?.toString()
    };

    await updateBooking(dataSend).unwrap();
        setResponsive(true)
  }

  if(isResponsiveDel){
    return <ServerGoodResponse message='Бронирование книги успешно отменено!' close={() => setResponsiveDel(false)} closeParent={() => close()} />
  }
  
  if(isResponsive){
    return  <ServerGoodResponse message='Изменения успешно сохранены!' close={() => setResponsive(false)} closeParent={() => close()} />
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
            Изменение даты бронирования
          </div>
          <Calendar locale='ru-Ru' selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)} setDisabledBooking={(b) => setDisabledBooking(b)} setDisabledBookingChange={(z) => setDisabledBookingChange(z)} />
          <button
            disabled={isDisabledBookingChange}
            data-test-id='booking-button'
            className={styles.button__my}
            onClick={handleClick}
            type='submit' >забронировать</button>

          <button
            data-test-id='booking-cancel-button'
            className={styles.button__cancel}
            onClick={handleClickCancel}
            type='button' >отменить бронь</button>
        </div>
      </main>
  )
};
