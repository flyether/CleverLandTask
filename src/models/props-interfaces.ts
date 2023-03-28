import { MouseEventHandler } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { Book, BookId, Delivery, UserBook, UserComments, UserData } from './interfaces';

export type PropsBreadcrumbs = {
  category?: string;
  bookId?: string;
  path?: string;
  label?: string;
};

export type PropsBookEvaluation = {
  bookId?: number;
  close: () => void;
  comment?: UserComments | null;
  profile?: boolean;
};

export type PropsModal = {
  message: string;
  close: () => void;
  closeParent?: () => void;
};

export type PropsSearchInput = {
  handleIsOpen: (val: boolean) => void;
  handleSearch: (value: string) => void;
  handleLast: (value: string) => void;
};

export type PropsFilterBar = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  handleSearch: (value: string) => void;
  handleRating: (value: boolean) => void;
  handleLast: (value: string) => void;
};

export type PropsListMonths = {
  onSelectMonth: (index: number) => void;
};

export type PropsCards = {
  books: Book[];
  display: boolean;
  path: string;
};

export type CreateDateParams = {
  locale?: string;
  date?: Date;
};

export type PropsRating = {
  rating?: number | null;
};

export type CreateYearParams = {
  year?: number;
  locale?: string;
  monthNumber?: number;
};

export type PropsCalendarCom = {
  close: () => void;
  bookId?: number | null;
  singleBook?: boolean;
};

export type PropsCard = {
  profile?: boolean;
  delivery?: boolean;
  book: Book;
  path: string;
  display: boolean;
  bookDel: () => void;
};

export type MatchingCategoriesCount = {
  [category: string]: number;
};

export type SidebarProps = {
  setIsOpenBurger: (arg0: boolean) => void;

  setIsListVisibleFromSide?: (arg0: boolean) => void;
  dataTestsHowcase: string;
  dataTestsBooks: string;
  dataTestsTerms: string;
  dataTestsContract: string;
  nav: string;
  showAuth: boolean;
};

export type CalendarChangeProps = {
  close: () => void;
  bookId?: number | null;
  singleBook?: boolean;
  bookingDate?: string;
  bookBookingId?: number | null;
};

export type PropsComments = {
  id?: number;
  rating?: number;
  text?: string;
  createdAt: string;
  user: {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
};

export type PropsRegisterError = {
  message: string;
  message400?: string;
  element: JSX.Element;
  close: () => void;
  button?: string;
};

export type UseCalendarParams = {
  locale?: string;
  selectedDate?: Date;
  firstWeekDayNumber?: number;
};

export type CalendarProps = {
  locale?: string;
  selectedDate?: Date;
  setDisabledBooking: (b: boolean) => void;
  setDisabledBookingChange: (z: boolean) => void;
  firstWeekDayNumber?: number;
  selectDate: (date: Date) => void;
};

export type Day = {
  date: Date;
  dayNumber: number;
  day: string;
  dayNumberInWeek: number;
  dayShort: string;
  year: number;
  yearShort: string;
  month: string;
  monthShort: string;
  monthNumber: number;
  monthIndex: number;
  timestamp: number;
  week: number;
};

export type BookButtonProps = {
  setCalendar: (value: boolean) => void;
  unBooking: () => void;
  stylesButton: string;
  stylesButtonBooking: string;
  bookId?: number | null;
  profile?: boolean;
  setCalendarChangeBooking: (value: boolean) => void;
  order?: boolean;
  delivery?: Delivery;
  deliveryProfile?: boolean;
};

export type EvaluationButtonProps = {
  bookData: BookId;
  bookPage?: boolean;
  setEvaluation: (value: boolean) => void;
  setUnChange: (value: boolean) => void;
  bookId?: number | null;
  setBookId: (value: number | null) => void;
  setComment: (value: UserComments) => void;
  userData: UserData;
};

export type PropsButtonListTile = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export type LoginInputProps = {
  register: UseFormRegister<FieldValues>;
  name: string;
  disabled?: boolean;
  handleLoginChange: (event: React.FormEvent<HTMLInputElement>) => void;
  handChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  className: string;
  placeholder?: string;
  defaultValue?: string;
};

export type PasswordInputProps = {
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
  handleLoginChange: (event: React.FormEvent<HTMLInputElement>) => void;
  handChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  className: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
};

export type NameInputProps = {
//  setValue:  UseFormSetValue<FieldValues>

  name: string;
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
  handleLoginChange: (event: React.FormEvent<HTMLInputElement>) => void;
  handChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  className: string;
  placeholder: string;
  defaultValue?: string;
  required:boolean;
};
