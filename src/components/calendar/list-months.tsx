
import { FC } from 'react';

import { PropsListMonths } from '../../models/props-interfaces';

import styles from './calendar.module.css';

export const ListMonths: FC<PropsListMonths> = ({onSelectMonth}) => {
   const today = new Date();
   const months = [];
   
   for (let i = today.getMonth(); i < 12; i++) {
     months.push(new Date(today.getFullYear(), i).toLocaleString('ru-RU', { month: 'long' }));
   }

   return (
      <div  className={styles.list__container}>
        <ul className={styles.month__list}>
        {months.map((month, index) => (
        
          <div aria-hidden={true} className={styles.month}  key={(index+ 100).toString()} 
          onClick={() => {
            onSelectMonth(today.getMonth() + index);
          }}>{month}</div>) )}
          </ul>
      </div>
   );
} 