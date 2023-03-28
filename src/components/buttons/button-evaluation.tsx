
import { useEffect, useState } from 'react';
import cn from 'classnames';

import { UserComments } from '../../models/interfaces';
import { EvaluationButtonProps } from '../../models/props-interfaces';
import { BookAPI } from '../../store/services/book-service';

import { findUserComment } from './util-booton';

import styles from './button.module.css';

export function EvaluationButton({ setEvaluation, bookId, bookPage, setUnChange, userData, setBookId, setComment, bookData }: EvaluationButtonProps) {
  const [comment, setCommentBull] = useState(false);
  const [text, setText] = useState(comment ? 'Изменить оценку' : 'Оставить отзыв');
  const [desiredСomment, setDesiredComment] = useState<UserComments | null>(null);

 BookAPI.useGetBookByIdQuery(bookId?.toString() ?? '3')
  const [trigger] = BookAPI.useLazyGetBookByIdQuery();

  useEffect(() => {
    if (comment) setText('Изменить оценку')
  }, [comment]);

  useEffect(() => {
    if (bookPage) setText('оценить книгу')
  }, [bookPage]);


  useEffect(() => {
    if (bookId && bookData.comments && bookData.comments.length > 0) {
      if (bookId && bookData.comments && bookData.comments.length > 0) {
        const userComment = findUserComment(bookData, bookId, userData.id);

        if (userComment) {
          setCommentBull(true);
          setDesiredComment(userComment);
        }
      }
    }
  }, [bookData, bookData.comments, bookId, userData.id]);

  useEffect(() => {
    if (bookId && userData.comments && userData.comments.length > 0) {

      userData.comments.forEach((c) => {
  
        if (c.bookId === bookId) {
          setCommentBull(true)
          setDesiredComment(c)
        }

      })
    }
  }, [bookId, userData.comments]);

  return (
    <button
      data-test-id={bookPage ? 'button-rate-book' : 'history-review-button'}
      type="button"
      className={cn({
        [styles.buttonEval]: !comment,
        [styles.buttonChange]: comment,
      })}
      onClick={(e) => {
        e.stopPropagation()
        if (bookId && !comment) {
          setBookId(bookId)
          setEvaluation(true)
          trigger(bookId.toString())
        }
        if (comment && bookId) {
          setUnChange(true)
          setBookId(bookId)
          if (desiredСomment) setComment(desiredСomment)
        }
      }}
    >
      {text}
    </button>
  )
}