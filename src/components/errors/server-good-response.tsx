
import { FC, useEffect } from 'react';

import { PropsModal } from '../../models/props-interfaces';

import styles from './errors.module.css'


export const ServerGoodResponse: FC<PropsModal> = ({ message, close,  closeParent  }) => {

   useEffect(() => {
      const timer = setTimeout(() => {
        close(); 
        if( closeParent) closeParent()
      }, 4000);
  
      return () => clearTimeout(timer);
    }, [close, closeParent]);
   
   return(
   <div data-test-id='error' className={styles.container__good}>
      <div className={styles.ok} />
      <span> {message}</span>
      <button
       data-test-id= "alert-close"
         className={styles.cross__icon}
         type="button"
         onClick={()=>{
            close()
            if( closeParent) closeParent()
            }}>
         ✖
      </button>
   </div>
);
}