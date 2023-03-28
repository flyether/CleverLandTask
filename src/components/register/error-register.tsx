import { FC, useState } from 'react';

import { PropsRegisterError } from '../../models/props-interfaces';

import styles from '../login/login.module.css';


export const RegisterError: FC<PropsRegisterError> = ({ close, button = 'повторить', message, element, message400 = 'Что-то пошло не так. Попробуйте ещё раз' }) => {
  const [isBack, setBack] = useState(false);

  const handleRegistration = () => {
    setBack(true)
    close()
  }

  return (
    <div >
      {isBack ? <div> {element} </div> : <div data-test-id='auth' className={styles.container} >
        <div className={styles.logo} > Cleverland </div>
        <div data-test-id='status-block' className={styles.form__error} >
          <div className={styles.div__padding} >
            <div className={styles.title__error} > {message} </div>
            <div className={styles.text__error} >{message400}</div>
            <button
              className={styles.button}
              type='button'
              onClick={handleRegistration} > {button}</button>
          </div>
        </div> </div>}
    </div>
  );
};

