import { FC,  useMemo  } from 'react';

import {  UserData } from '../../models/interfaces';
import { HistorySlider } from '../swiper';

import { temporaryBookArray } from './temporary-book';

import styles from './profile-components.module.css';


export const BookHistory: FC<{ userData: UserData }> = ({ userData }) => {

  const temporary = useMemo(() => temporaryBookArray(userData.history.books), [userData.history.books]);

  return (
    <main className={styles.container}>
      <div data-test-id='history' className={styles.title}>История <div className={styles.text}>Список прочитанных книг</div>  </div>
      {userData.history.id && temporary ? <HistorySlider books={temporary} userData={userData} /> : <div data-test-id='empty-blue-card' className={styles.wrapper}>Вы не читали книг из нашей библиотеки</div>}
    </main>
  );
};