import { useState } from 'react';

import mag from '../../assets/svg/descending.svg'
import magnifyingGlassIcon from '../../assets/svg/select.svg';

import styles from './button.module.css';

type Props = {
   handleRating: (value: boolean) => void;
}

export const ButtonRating = ({ handleRating }: Props) => {
   const [handler, setHandler] = useState(false);

   const handleClick = () => {
      setHandler(!handler);
      handleRating(!handler);
   };

   return (
      <button
         data-test-id='sort-rating-button'
         className={styles.rating__button}
         onClick={handleClick}
         type="button"
      >
         {handler ? <img src={magnifyingGlassIcon} alt="sort icon" className={styles.rating__icon} /> : <img src={mag} alt="sort icon" className={styles.rating__icon} />}
         <span className={styles.rating__text}>По рейтингу</span>
      </button>
   );
};