
import {  useState } from 'react';

import { PropsButtonListTile } from '../../models/props-interfaces';

import styles from './button.module.css'


export const ButtonListTile = ({ onClick }: PropsButtonListTile) => {

   const [activeButton, setActiveButton] = useState('window');

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>, buttonId: string) => {
      setActiveButton(prevActiveButton => prevActiveButton === buttonId ? '' : buttonId);
      onClick(event);
   }

   return (
      <div className={styles.filter__bar__right}>
         <button
            data-test-id='button-menu-view-window'
            className={`${styles.tile__button} ${activeButton === 'window' ? styles['tile__button--pressed'] : ''}`}
            onClick={(event) => handleClick(event, 'window')}
            type="button"
         >
            .
         </button>
         <button
            data-test-id='button-menu-view-list'
            className={`${styles.list__button} ${activeButton === 'list' ? styles['list__button--pressed'] : ''}`}
            onClick={(event) => handleClick(event, 'list')}
            type="button"
         >
            .
         </button>
      </div>
   )
};