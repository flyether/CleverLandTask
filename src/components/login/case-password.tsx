
import { FC } from 'react';

import styles from './login.module.css';

export const CasePassword: FC<{ message: string, profile?: boolean }> = ({ message, profile }) => (
  <div className={profile ? styles.div__profile : styles.div}>
    {
      message === '4' ? <span data-test-id='hint'>Пароль <span style={{ color: 'rgb(244, 44, 79)' }}>не менее 8 символов</span>, с <span>заглавной буквой</span> и <span>цифрой </span></span> :
        message === '5' ? <span data-test-id='hint'>Пароль <span style={{ color: 'rgb(244, 44, 79)' }}>не менее 8 символов</span> , с <span>заглавной буквой</span> и <span style={{ color: 'rgb(244, 44, 79)' }}>цифрой </span></span> :

          message === '6' ? <span data-test-id='hint'>Пароль <span style={{ color: 'rgb(244, 44, 79)' }}>не менее 8 символов</span>, с <span style={{ color: 'rgb(244, 44, 79)' }}>заглавной буквой</span> и <span style={{ color: 'rgb(244, 44, 79)' }}>цифрой</span></span> :
            <span data-test-id='hint'>  <span>Пароль не менее 8 символов, с заглавной буквой и цифрой</span> </span>
    }
  </div>
);

