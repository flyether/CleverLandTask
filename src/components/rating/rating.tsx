import { FC } from 'react';

import { PropsRating } from '../../models/props-interfaces';

import styles from './rating.module.css'

export const Rating: FC<PropsRating> = ({
  rating }) => {
  const stars = [];

  if (rating) {
    for (let i = 0; i < Math.ceil(rating); i++) {
      stars.push(<div key={i}  data-test-id='star'><div  className={styles.full__star} data-test-id='star-active'/></div>);
    }
    for (let i = Math.ceil(rating); i < 5; i++) {
      stars.push(<div key={i}  data-test-id='star'><div className={styles.empty__star} /> </div>);
    }
  }

  return (
    <div className={styles.star} data-test-id='rating'>
      {rating ? stars : 'ещё нет оценок'}
    </div>
  )
}