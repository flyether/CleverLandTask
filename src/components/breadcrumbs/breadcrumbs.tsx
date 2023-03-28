
import { Link, useLocation } from 'react-router-dom'

import { Url } from '../../models/constants';
import { PropsBreadcrumbs } from '../../models/props-interfaces';
import { BookAPI } from '../../store/services/book-service';
import { getSessionItemOrDefault } from '../../utils/get-session-item-or-default';

import styles from './breadcrumbs.module.css'

export function Breadcrumbs({ category, bookId, path, label }: PropsBreadcrumbs) {
   const [trigger] = BookAPI.useLazyGetAllBooksQuery()
   const location = useLocation();
   const referrerPath = getSessionItemOrDefault('referrerPath');

   return (
      <div className={styles.container} >
         <Link
            onClick={() => {
               trigger()
            }}
            to={referrerPath === Url.PATH_All
               ? Url.PATH_All
               : `${Url.PATH_BOOKS}${path}/`}
            data-test-id='breadcrumbs-link'
            className={location.pathname.startsWith(`${Url.PATH_BOOKS}${path}`) ? `${styles.active}` : `${styles.not__active}`}
         >
            {referrerPath === Url.PATH_All
               ? 'Все книги'
               : category}
         </Link>
         <span className={styles.space}> / </span>
         <Link to={`${Url.PATH_BOOKS}${path}/${bookId}`}
            data-test-id='book-name'
            className={location.pathname.startsWith(`books/${path}/${bookId}`) ? `${styles.active}` : `${styles.not__active}`}
         >
            {label}
         </Link>
      </div>
   );
}


