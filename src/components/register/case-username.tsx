
import { FC } from 'react';

import styles from '../login/login.module.css';


export const CaseUserName:FC<{ message: string }> = ({ message }) => (
  <div data-test-id='hint' className={styles.div}>
  {
    message === '1' ? <span  style={{ color: 'rgb(244, 44, 79)' }}>Используйте для логина латинский алфавит и цифры</span> :
    message === '2' ? <span>Используйте для логина <span  style={{ color: 'rgb(244, 44, 79)' }}>латинский алфавит</span> и цифры</span> :
    message === '3' ? <span>Используйте для логина латинский алфавит и <span style={{ color: 'rgb(244, 44, 79)' }}>цифры</span></span> : <span>Используйте для логина латинский алфавит и цифры</span>
       }
</div>
);

