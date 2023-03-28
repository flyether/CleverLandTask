import React, { useState } from 'react';
import cnBind from 'classnames/bind';

import { DateMode } from '../../models/constants';
import { CalendarProps, Day } from '../../models/props-interfaces';

import { useCalendar } from './hooks/hook-calendar';
import { checkDateIsEqual, checkIsLast, checkIsToday, checkIsTomorrow, checkWeekend } from './helpers';
import { ListMonths } from './list-months';

import styles from './calendar-component.module.css';

const cx = cnBind.bind(styles)

export const Calendar: React.FC<CalendarProps> = ({
  locale = 'default',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2,
  setDisabledBooking,
  setDisabledBookingChange
}) => {

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const [isListMonths, setListMonths] = useState(false);
  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber
  });
  const [month, setSelectedMonthIndex] = useState<number>(0 || state.selectedMonth.monthIndex);


  const handleClickListMonth = () => setListMonths(!isListMonths);

  const getDayClassNames = (today: boolean, tomorrow: boolean, weekend: boolean, day: Day, isSelected?: boolean) => ({
    calendar__day: true,
    calendar__tomorrow__item: tomorrow && !isSelected && selectedDay !== day.date,
    calendar__day__disabled: !tomorrow && !isSelected && selectedDay !== day.date && !today,
    calendar__weekend__item: weekend && !isSelected && selectedDay !== day.date,
    calendar__today__item: today && !isSelected && selectedDay !== day.date,
    selected__item: isSelected,
    selected__item_without: selectedDay === day.date
  });

  const handleClick = (isWeekend: boolean, isLastDay: boolean, day: Day) => {
    if (!isWeekend && !isLastDay) {
      functions.setSelectedDay(day);
      selectDate(day.date);
      setDisabledBooking(false)
      if (date) {
        if (!checkDateIsEqual(day.date, date)) {
          setDisabledBookingChange(false);
        }
      } else { setSelectedDay(day.date) }
    }
  }

  const handleMonthSelect = (index: number) => {
    setSelectedMonthIndex(index);
    setListMonths(false);
    functions.onClickArrow('select', index)
  };

  return (
    <div className={styles.wrapper}>
      <div data-test-id='calendar' className={styles.container}>
        <div className={styles.calendar__header}>
          <button
            className={styles.title__block}
            onClick={handleClickListMonth}
            type='button'
          >
            {state.mode === DateMode.DAYS && (
              <div data-test-id='month-select' aria-hidden={true}
              >
                {state.monthesNames[month].month} {state.selectedYear}
              </div>
            )}
            <div
              className={styles.next__button}
            />
            {isListMonths && <ListMonths onSelectMonth={handleMonthSelect} />}
          </button>
          <div className={styles.button__block}>
            <div
              data-test-id='button-prev-month'
              aria-hidden={true}
              className={styles.prev2__button}
              onClick={() => functions.onClickArrow('left')}
            />
            <div
              data-test-id='button-next-month'
              aria-hidden={true}
              className={styles.next2__button}
              onClick={() => functions.onClickArrow('right')}
            />
          </div>
        </div>
        <div className={styles.calendar__body}>
          {state.mode === 'days' && (
            <React.Fragment>
              <div className={styles.calendar__week__names}>
                {state.weekDaysNames.map((weekDaysName) => (
                  <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
                ))}
              </div>
              <div className={styles.calendar__days}>
                {state.calendarDays.map((day) => {
                  const isToday = checkIsToday(day.date);
                  const isTomorrow = checkIsTomorrow(day.date);
                  const isWeekend = checkWeekend(day.date);
                  const isSelectedDay = date && checkDateIsEqual(day.date, state.selectedDay.date);
                  const isLastDay = checkIsLast(day.date);

                  return (
                    <div
                      data-test-id='day-button'
                      key={`${day.dayNumber}-${day.monthIndex}`}
                      aria-hidden={true}
                      onClick={() => handleClick(isWeekend, isLastDay, day)}
                      className={cx(getDayClassNames(isToday, isTomorrow, isWeekend, day, isSelectedDay))}>
                      {day.dayNumber}
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
};
