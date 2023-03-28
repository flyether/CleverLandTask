
import React, { FC, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import userPic from '../../assets/img/avatar.png'
import { Evaluation } from '../../models/interfaces';
import { PropsBookEvaluation } from '../../models/props-interfaces';
import {  useAppSelector} from '../../store';
import { selectUserId } from '../../store/select-user-id';
import { BookAPI } from '../../store/services/book-service';
import { UserAPI } from '../../store/services/user-servese';
import { useNoScroll } from '../../utils/use-no-scroll';
import { ServerGoodResponse } from '../errors';

import styles from './evaluation.module.css';

export const BookEvaluation: FC<PropsBookEvaluation> = ({ close, bookId, profile }) => {
   const [addComments ] = BookAPI.useAddCommentsMutation();
   const userId = useSelector(selectUserId);
   const [isModalErrorActive, setModalErrorActive] = useState(false);
   const [isResponsive, setResponsive] = useState(false);
   const [selectedStar, setSelectedStar] = useState(5);
   const [triggerMe] = UserAPI.useLazyGetUserMeQuery();
   const { userMe } = useAppSelector((state) => state.userData);

   const {
      register,
      handleSubmit,
   } = useForm();

   useNoScroll();

   const handleStarClick = (starNumber: number) => {
      setSelectedStar(starNumber);
   };
   const handleKeyPress = (event: { key: string; }) => {
      if (event.key === 'ArrowLeft' && selectedStar > 0) {
         setSelectedStar(selectedStar - 1);
      } else if (event.key === 'ArrowRight' && selectedStar < 5) {
         setSelectedStar(selectedStar + 1);
      }
   }

   const submitForm = async (data: FieldValues) => {
      const dataSend: Evaluation = {
         data: {
            text: data.description,
            book: bookId?.toString(),
            user: userId?.toString(),
            rating: selectedStar,
         },
         comment: {
            // createdAt: new Date(2023, 0, 19).toString(),
            createdAt: new Date().toString(),
            rating: selectedStar,
            text: data.description,
            user: {
               commentUserId: userMe.id,
               firstName: userMe.firstName,
               lastName: userMe.lastName,
               avatarUrl: userMe.avatar && userMe.avatar !==null ? userMe.avatar: userPic
            }
         }
      };
      
         await addComments(dataSend).unwrap();
         if (profile) {
            triggerMe()
         }
   };

   const handleClickOverly = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target instanceof HTMLDivElement && event.target.classList.contains(styles.container)) {
         close();
      }
   };

   const handleKeyPressOverly = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' && event.target instanceof HTMLDivElement && event.target.classList.contains(styles.container)) {
         close();
      }
   };

   if (isResponsive) {
      return (<ServerGoodResponse message='Спасибо, что нашли время оценить книгу!' close={() => setResponsive(false)} closeParent={() => close()} />)
   }


   return (
         <div aria-hidden={true} onClick={handleClickOverly}
            onKeyDown={handleKeyPressOverly} className={styles.container} data-test-id="modal-outer">
            <form data-test-id="modal-rate-book" className={styles.form} onSubmit={handleSubmit(submitForm)} >
               <button
                  data-test-id="modal-close-button"
                  className={styles.cross__button}
                  type="button"
                  onClick={close}>
                  ✕
               </button>
               <div className={styles.title} data-test-id="modal-title" > Оцените книгу</div>
               <div className={styles.text} >Ваша оценка</div>
               <div className={styles.rating} data-test-id="rating">
                  {[1, 2, 3, 4, 5].map((starNumber) => (
                     <div data-test-id='star' key={starNumber}>
                        <div
                           className={starNumber <= selectedStar ? styles.full__star : styles.empty__star}
                           onKeyDown={handleKeyPress}
                           role="button"
                           tabIndex={0}
                           onClick={() => handleStarClick(starNumber)}
                           data-test-id={
                              starNumber <= selectedStar ? 'star-active' : 'nnn'
                           }
                        >  </div>
                     </div>
                  ))}
               </div>
               <textarea
                  data-test-id="comment"
                  className={styles.textarea}
                  {...register('description')}

                  placeholder="Оставить отзыв"
               />
               <button
                  data-test-id="button-comment"
                  className={styles.button}
                  type='submit' > ОЦЕНИТЬ</button>
            </form>
         </div>
   );
};
