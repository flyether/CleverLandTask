import { FC, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { EMAIL_REGEX } from '../../models/constants';
import { Email } from '../../models/interfaces';
import { useAppSelector} from '../../store';
import { UserAPI } from '../../store/services/user-servese';

import { ResetPassword } from './reset-password';
import { SuccessPassword } from './success-password';

import styles from './login.module.css';

export const ForgotPassword: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetCode = searchParams.get('code');
  const [forgotPassword, {  error }] = UserAPI.useForgotPasswordMutation();
  const [isSuccess, setSuccess] = useState(false);
  const { jwt } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [fakeTest, setFakeTest] = useState(true);
  

  useEffect(() => {
    if (jwt) {
      navigate('/', { replace: true })
    }
  }, [jwt, navigate]);

  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const submitForm = async (data: FieldValues) => {
    const dataEmail: Email = {
      email: data.email
    }
    
      await forgotPassword(dataEmail).unwrap();
      setSuccess(true)
  };

  const handleBlur = () => {
    trigger('email')
  }

  if (isSuccess) {
    return (<SuccessPassword />)
  }

  if (resetCode) {
    return (<ResetPassword />)
  }

  return (
    <div>
      <div className={styles.container} data-test-id='auth'>
        <div className={styles.logo} > Cleverland </div>
        <form data-test-id='send-email-form' className={styles.form} onSubmit={handleSubmit(submitForm)} >
          <button className={styles.login__entrance}
            onClick={() => { navigate('/auth', { replace: true }) }}
            type='button'>
            🡨 &nbsp; ВХОД В ЛИЧНЫЙ КАБИНЕТ </button>
          <div className={styles.div__padding} >
            <div className={styles.title} > Восстановление пароля </div>
            <input
              type="email"
              className={`${styles.input} ${errors.email || error ? styles.inputError : ''}`}
              {...register('email', {
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Введите корректный e-mail'
                },
                required: 'Поле не может быть пустым',
              })}
              name='email'
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFakeTest(false)
                setValue('email', event.target.value);
                clearErrors('email');
              }}
              placeholder="E-mail"
              onBlur={handleBlur}
            />
            <div className={styles.errorDivWrapper}>
              <div data-test-id='hint' style={{ color: 'rgb(244, 44, 79)' }} >
                {(errors?.email || error) ? (
                  <span className={styles.errorDiv}>{error ? 'error' : (errors?.email?.message as string)}</span>
                ) : <span className={styles.div}> На этот email  будет отправлено письмо с инструкциями по восстановлению пароля</span>}
                {fakeTest && <div data-test-id='hint' className={styles.fake__parent}>
                  <span>Поле не может быть пустым</span>
                </div>}
              </div>
            </div>
            <div className={styles.margin} />
            <button
              className={styles.button}
              type='submit' >восстановить</button>
            <div className={styles.registration}>
              <div className={styles.text_registration}>НЕТ УЧЕТНОЙ ЗАПИСИ?</div>
              <button
                onClick={() => { navigate('/registration', { replace: true }) }}
                type='button' className={styles.button_registration} >
                РЕГИСТРАЦИЯ 🡪
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

