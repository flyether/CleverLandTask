
import { FC } from 'react';

import styles from './login.module.css';


export const SuccessPassword: FC = () => (
  <div className={styles.container}
        data-test-id='auth' >
    <div >
    <div className={styles.logo_error} > Cleverland </div>
        <div className={styles.form__error}>
        <div className={styles.div__padding} >
        <div className={styles.title} data-test-id='status-block'>Письмо выслано</div>
        <div className={styles.text__error} >Перейдите на вашу почту, чтобы воспользоваться подсказками по востановлению пароля </div>
        </div>
        </div>
    </div>
    </div>
  );


  