import { FC, useEffect, useState } from 'react';

import userPic from '../../assets/img/avatar.png'
import { Rating } from '../../components/rating/rating';
import { Url } from '../../models/constants';
import { PropsComments } from '../../models/props-interfaces';

import styles from './book-page.module.css'


export const Comment: FC<PropsComments> = ({ id, rating, text, createdAt, user }) => {
   
   const date = new Date(createdAt);
   const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
   };
   const formattedDate = date.toLocaleDateString('ru-RU', options);
   

   return (
      <div data-test-id='comment-wrapper' key={id}>
         <div className={styles.review}>
            {user.avatarUrl && user.avatarUrl !==null ? <img src={`${Url.BASE_URL}${user.avatarUrl}`} alt={`Avatar for ${user.firstName} ${user.lastName}`} className={styles.div__user__pic} /> : <img src={userPic} className={styles.div__user__pic} alt='user pic' />}
            <div className={styles.review__colum}><div data-test-id='comment-author' className={styles.review__p}> {user.firstName} {user.lastName}</div>
               
               <div data-test-id='comment-date' className={styles.review__p}>{formattedDate}</div>
            </div>
         </div>
         <Rating rating={rating} />
         <div className={styles.review__margin}>
            <span data-test-id='comment-text' className={styles.about_text} >  {text} </span>
         </div>
      </div>
   )
}
