
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { BookButtonProps } from '../../models/props-interfaces';
import { selectUserId } from '../../store/select-user-id';

import { getText } from './util-booton';

import styles from './button.module.css';

export function BookButton({ stylesButton, deliveryProfile, setCalendar, bookId, order, delivery, stylesButtonBooking, profile, setCalendarChangeBooking, unBooking }: BookButtonProps) {
  const userId = useSelector(selectUserId);
  const text = getText(userId,  order, delivery, profile, deliveryProfile, bookId  )
  let disabled = false;

  if (order && bookId !== userId || delivery && !profile) {
    disabled = true;
  }


  if (deliveryProfile && delivery && delivery.dateHandedTo) {
    return <div className={styles.deliveryProfile}>{text}</div>
  }

  return (
    <button
      disabled={disabled}
      data-test-id={
        profile ? 'cancel-booking-button' : 'booking-button'
      }
      type="button"
      className={cn(stylesButton, {
        [stylesButtonBooking]: order && bookId !== userId || delivery || order && bookId === userId && !profile,
        [`${stylesButtonBooking} ${styles.color}`]: bookId === userId && !profile,
      })}
      onClick={(e) => {
        e.stopPropagation()

        if (order && bookId === userId! && !profile) {
          setCalendarChangeBooking(true)
        }
        if (profile) {
          unBooking()
        }
        if (!order && !profile) {
          setCalendar(true)
        }
      }}
    >
      {delivery ? <span data-test-id="content">{text}</span> : text}
    </button>
  )
}