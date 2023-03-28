
import { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { setFirstName, setLastName, useAppDispatch } from '../../store';

import { RegisterStep3 } from './step3-register';

import styles from '../login/login.module.css';

export const RegisterStep2: FC = () => {
  const dispatch = useAppDispatch();
  const [isStep3, setStep3] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm();

  const submitForm = async (data: FieldValues) => {
    dispatch(setLastName(data.lastName));
    dispatch(setFirstName(data.firstName));
    setStep3(true)
  };

  return (
    <div>
      {isStep3 ? <RegisterStep3 /> : <div className={styles.container} data-test-id='auth' >
        <div className={styles.logo} > Cleverland </div>
        <form data-test-id='register-form' className={styles.form} onSubmit={handleSubmit(submitForm)} >
          <div className={styles.div__padding} >
            <div className={styles.title} > Регистрация  <div className={styles.text} >2 шаг из 3 </div></div>
              <input
              type="text"
              className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
              {...register('firstName', {
                required: true,
              })}
              onBlur={() => {
                trigger('firstName');
              }}
              name='firstName'
              onInput={() => clearErrors('firstName')}
              placeholder="Имя"
            />
            <div className={styles.errorDivWrapper}>
              {errors?.firstName && (
                <span data-test-id='hint' className={styles.errorDiv}>Поле не может быть пустым </span>
              )}
            </div>     
            <input
              type="text"
              className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
              {...register('lastName', {
                required: true,
              })}
              onBlur={() => {
                trigger('lastName');
              }}
              name='lastName'
              onInput={() => clearErrors('lastName')}
              placeholder="Фамилия"
            />
            <div className={styles.errorDivWrapper}>
              {errors?.lastName && (
                <span data-test-id='hint' className={styles.errorDiv}> Поле не может быть пустым </span>
              )}
            </div>
            <button
              disabled={!isValid}
              className={styles.button}
              type='submit' > ПОСЛЕДНИЙ ШАГ </button>
            <div className={styles.registration}>
              <div className={styles.text_registration}> Есть учетная запись?  </div>
              <button
                onClick={() => { navigate('/auth', { replace: true }) }}
                type='button' className={styles.button_registration} >
                войти ➜
              </button>
            </div>
          </div>
        </form>
      </div>}
    </div>
  );
};

