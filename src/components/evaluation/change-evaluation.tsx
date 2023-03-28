import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import {  EvaluationUpdate } from '../../models/interfaces';
import { PropsBookEvaluation } from '../../models/props-interfaces';
import { selectUserId } from '../../store/select-user-id';
import { BookAPI } from '../../store/services/book-service';
import { useNoScroll } from '../../utils/use-no-scroll';
import {  ServerGoodResponse } from '../errors';

import styles from './evaluation.module.css';

export const ChangeEvaluation: FC<PropsBookEvaluation> = ({ close, bookId, comment }) => {
   const [updateComments] = BookAPI.useUpdateCommentsMutation()
   const userId = useSelector(selectUserId);
   const [isModalErrorActive, setModalErrorActive] = useState(false);
   const [isResponsive, setResponsive] = useState(false);
   const [selectedStar, setSelectedStar] = useState(0);
   const [isText, setText] = useState('');
   const {
      register,
      handleSubmit,
   } = useForm();

useEffect(() => {
   if (comment && comment.rating) {
      setSelectedStar(comment.rating)
   }
}, [comment]);

useEffect(() => {
   if (comment && comment.text) {
      setText(comment.text)
   }
}, [comment]);

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

   const submitForm = async () => {
      const dataSend: EvaluationUpdate = {
         id: comment?.id.toString(),
         body: {
            data: {
            rating: selectedStar,
            text: isText,
            book: bookId?.toString(),
            user: userId?.toString(),
            }
         }
      };

      await updateComments(dataSend).unwrap();
   }

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
      return (<ServerGoodResponse message='Спасибо, что нашли время изменить оценку!' close={() => setResponsive(false)} closeParent={() => close()} />)
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
               value={isText}
                  data-test-id="comment"
                  className={styles.textarea}
                  {...register('description')}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Оставить отзыв"
               />
               <button
                  data-test-id="button-comment"
                  className={styles.button}
                  type='submit' >изменить оценку</button>
            </form>
         </div>
   );
};
