
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../login/login.module.css';

export const Success: FC<{ message: string }> = ({ message }) =>{
  const navigate = useNavigate();
  const [isLoginState, setLoginState] = useState(false);

  useEffect(() => {
    if (isLoginState) {
      navigate('/auth', { replace: true })
    }
  }, [isLoginState, navigate]);

  return (
    <div className={styles.container} data-test-id='auth' >
      <div className={styles.logo} > Cleverland </div>
      <div data-test-id='status-block' className={styles.form__error}>
        <div className={styles.div__padding} >
          <div className={styles.title__error} > {message}</div>
          <div className={styles.text__error} >Зайдите в личный кабинет, используя свои логин и новый пароль </div>
          <button
            className={styles.button}
            onClick={() => { setLoginState(true) }}
            type='button' > ВХОД </button>
        </div>
      </div>
    </div>
  );
};

