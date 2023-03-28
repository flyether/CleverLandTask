import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserWithToken } from '../../models/interfaces';
import { useAppSelector } from '../../store';

import styles from './profile-components.module.css';

export const ContractBlock = () => {
  const userData: UserWithToken = useAppSelector(state => state.user) || null;
  const [isContract, setContract] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => navigate('/contract');


  return (
    <main className={styles.container}>
      <div className={styles.title} > Договор </div>
      <div className={styles.text} >Здесь вы можете просмотрить данные о договоре, а так же внести оплату</div>
      {isContract ? <div className={styles.wrapper__contract}>
        <div className={styles.flex}>
          <div className={styles.div__input__style}>
            <div className={styles.text__input}>
              Оформлен на
            </div>
            <div className={styles.text2__input}>
              {userData.user.firstName} &nbsp; {userData.user.lastName}
            </div>
          </div>
          <div className={styles.div__input__style}>
            <div className={styles.text__input}>
              Номер договора
            </div>
            <div className={styles.text2__input}>
              тут договор
            </div>
          </div>
        </div>
        <button
          className={styles.button__contract}
          type='button'
          onClick={handleClick}>
          ПОСМОТРЕТЬ ДОГОВОР
        </button>
      </div> : <div className={styles.wrapper} > Нет данных </div>}
    </main>
  )
};
