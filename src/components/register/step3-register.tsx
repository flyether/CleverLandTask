import { FC, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask'
import cnBind from 'classnames/bind';

import { EMAIL_REGEX } from '../../models/constants';
import { UserRegistration, UserWithToken } from '../../models/interfaces';
import { useAppSelector } from '../../store';
import { UserAPI } from '../../store/services/user-servese';
import { Login } from '../login';

import { Success } from './success';
import { RegisterError } from '.';

import styles from '../login/login.module.css';

const cx = cnBind.bind(styles)

export const RegisterStep3: FC = () => {
  const userData: UserWithToken = useAppSelector(state => state.user) || null;
  const password = useAppSelector(state => state.stateComponent) || null;
  const [regUser, { error }] = UserAPI.useRegUserMutation();
  const [isRegActive, setRegActive] = useState(false);
  const [isModalActive, setModalActive] = useState(false);
  const [message400T, setMessage400T] = useState('Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз');
  const [messageButton, setMessageButton] = useState('повторить');
  const [phone, setPhone1] = useState('');
  const [fakeTest, setFakeTest] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });


  useEffect(() => {
    if (error && 'data' in error) {
      if (error.status === 400) {
        setMessage400T('Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail')
        setModalActive(true)
        setMessageButton('назад к регистрации')
      } else if (error.status === 500) { setModalActive(true) }

    } else {
      setModalActive(false);
    }
  }, [error]);

  const handleBlur = () => {
    trigger('phoneInput')
  }

  const handlePhoneChange = (event: { target: { value: string } }) => {
    setFakeTest(false)
    setValue('phoneInput', event.target.value);
    setPhone1(event.target.value);
    handleBlur()
  };

  const submitForm = async (data: FieldValues) => {
    const userRegData: UserRegistration = {
      username: userData.user.username,
      lastName: userData.user.lastName,
      firstName: userData.user.firstName,
      phone: userData.user.phone,
      email: data.email,
      password: password.password,
    }

    await regUser(userRegData).unwrap();
    setRegActive(true)
  };

  if (isModalActive) {
    return <RegisterError close={() => setModalActive(false)} element={<Login />} message="Данные не сохранились" message400={message400T} button={messageButton} />
  }

  return (
    <div>
      {isRegActive ? <Success message='Регистрация успешна' /> : <div className={styles.container} data-test-id='auth'  >
        <div className={styles.logo} > Cleverland </div>

        <form data-test-id='register-form' className={styles.form} onSubmit={handleSubmit(submitForm)} >
          <div className={styles.div__padding} >
            <div className={styles.title} > Регистрация <div className={styles.text} >3 шаг из 3 </div></div>
            <div className={styles.colum}>

              <MaskedInput
                placeholderChar="x"
                mask={['+', '3', '7', '5', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                className={`${styles.input} ${errors.phoneInput ? styles.inputError : ''}`}
                placeholder="Номер телефона"
                pipe={value => {
                  const inputLength = value.toString().replace(/\D/g, '').length;

                  return inputLength <= 12 ? value : value.replace(/\D/g, '');
                }}

                {...register('phoneInput', {
                  required: 'Поле не может быть пустым',
                  pattern: /^\+375\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/
                })}
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={handleBlur}
              />

              <div className={styles.errorDivWrapper}>
                <span data-test-id='hint' className={cx({
                  errorDiv: errors.phoneInput,
                  div: !errors.phoneInput
                })}>
                  {(fakeTest && !errors?.phone) &&
                    <span className={styles.fake__parent}>Поле не может быть пустым</span>
                  }
                  {(errors?.phoneInput?.message as string) || 'В формате +375 (xx) xxx-xx-xx'}
                </span>
              </div>

              <input
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                {...register('email', {
                  minLength: 4,
                  pattern: EMAIL_REGEX,
                  required: 'Поле не может быть пустым',
                })}
                name='email'
                onInput={() => {
                  setFakeTest(false)
                  clearErrors('email')
                }}
                placeholder="E-mail"
                onBlur={() => {
                  trigger('email');
                }}
              />
              <div className={styles.errorDivWrapper}>
                {errors?.email && (
                  <span data-test-id='hint' className={styles.errorDiv}>
                    {(fakeTest && !errors?.email) &&
                      <span className={styles.fake__parent}>Поле не может быть пустым</span>
                    }
                    {(errors.email.message as string) || 'Введите корректный e-mail'}
                  </span>
                )}
              </div>
            </div>
            <button
              disabled={!isValid}
              className={styles.button}
              type='submit' > ЗАРЕГИСТРИРОВАТЬСЯ </button>
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

