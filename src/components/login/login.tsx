import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { PASSWORD_REGEX, Url } from '../../models/constants';
import { UserAutarization } from '../../models/interfaces';
import { setUser, useAppDispatch, useAppSelector} from '../../store';
import { UserAPI } from '../../store/services/user-servese';
import { PasswordInput } from '../inputs/serch-input';
import { LoginInput } from '../inputs/serch-input/login-input';
import { RegisterError } from '../register';

import styles from './login.module.css';

export const Login = () => {
  const navigate = useNavigate();
  const [isModalErrorActive, setModalErrorActive] = useState(false);
  const { jwt } = useAppSelector((state) => state.user);
  const [authorizationUser, {  error }] = UserAPI.useAuthorizationUserMutation()
  const [passwordShown, setPasswordShown] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isPasswordOnInput, setPasswordOnInput] = useState(false);
  const [message400T, setMessage400T] = useState('');
  const dispatch = useAppDispatch();
  const [fakeTest, setFakeTest] = useState(true);

  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
console.log( jwt)

  useEffect(() => {
    if (jwt) {
      navigate('/', { replace: true })
    }
  }, [jwt, navigate]);


  useEffect(() => {
    if (error && 'data' in error) {
      if (error.status === 400) {
        setMessage400T('Неверный логин или пароль!')
      }
      else if (error.status === 500) { setModalErrorActive(true) }

    } else {
      setModalErrorActive(false);
    }
  }, [error]);

  const handleLoginChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFakeTest(false)
    setValue('identifier', (event.target as HTMLInputElement).value)
    clearErrors('identifier')
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFakeTest(false)
    const password = e.target.value;
    const isValidPass = password.length >= 8 && PASSWORD_REGEX.test(password);

    setPasswordOnInput(true)
    setPasswordValid(isValidPass);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleBlurLogin = () => {
    trigger('identifier');
  }

  const submitForm = async (data: FieldValues) => {
    const userLogData: UserAutarization = {
      identifier: data.identifier,
      password: data.password,
    };
      const response = await authorizationUser(userLogData).unwrap();

      dispatch(setUser(response));
      localStorage.setItem('user', JSON.stringify(response));

        navigate(Url.PATH_All, { replace: true });
   
  };

  if (isModalErrorActive) {
    return (
      <RegisterError close={() => setModalErrorActive(false)} element={<Login />} message="Вход не выполнен" />
    )
  }

  return (
 
      <div className={styles.container}
        data-test-id='auth' >
        <div className={styles.logo} > Cleverland </div>
        <div className={styles.form}>
          <div className={styles.div__padding} >
            <div className={styles.title} > Вход в личный кабинет </div>
            <form data-test-id='auth-form' onSubmit={handleSubmit(submitForm)} >
              <LoginInput handChange={() => { }} disabled={false} className={`${styles.input} ${errors.identifier || message400T ? styles.inputError : ''}`}
                onBlur={handleBlurLogin} register={register} name="identifier" handleLoginChange={handleLoginChange} />
              <div className={styles.errorDivWrapper}>
                <div data-test-id='hint' className={styles.errorDiv}>
                  {(fakeTest && !errors) &&
                    <span className={styles.fake__parent}>Поле не может быть пустым</span>
                  }
                  {errors?.identifier && (
                    <span>Поле не может быть пустым</span>
                  )}
                </div>
              </div>
              <PasswordInput type={passwordShown ? 'text' : 'password'} className={`${styles.input} ${errors.password || message400T ? styles.inputError : ''}`} disabled={false} handChange={handlePasswordChange} handleLoginChange={(event) => {
                setValue('password', (event.target as HTMLInputElement).value)
                clearErrors('password')
              }} placeholder='Пароль' onBlur={() => {
                trigger('password');
              }} register={register} />
              {isPasswordOnInput && <button
                type='button'
                className={styles.dot}
                onClick={togglePasswordVisibility}>{passwordShown ? <div data-test-id='eye-opened' className={styles.eye__open} /> : <div data-test-id='eye-closed' className={styles.eye} />}
                {isPasswordValid && <div data-test-id='checkmark' className={styles.check}>✓</div>}</button>}

              {errors.password || message400T ? <div className={styles.errorServer}>
                <span data-test-id='hint' className={styles.errorDiv}><span>
                {(fakeTest && !errors) &&
                    <span className={styles.fake__parent}>Поле не может быть пустым</span>
                  }
                  {errors.password ? 'Поле не может быть пустым' : message400T}</span></span>
                <button
                  onClick={() => { navigate('/forgot-pass', { replace: true }) }}
                  type='button' className={styles.forgot} >
                  Восстановить?
                </button> </div> : <button
                  onClick={() => { navigate('/forgot-pass', { replace: true }) }}
                  type='button' className={styles.button_forgot} >
                Забыли логин или пароль?
              </button>}
              <button
                className={styles.button}
                type='submit' >вход</button>
              <div className={styles.registration}>
                <div className={styles.text_registration}> НЕТ УЧЕТНОЙ ЗАПИСИ? </div>
                <button
                  onClick={() => { navigate('/registration', { replace: true }) }}
                  type='button' className={styles.button_registration} >
                  регистрация 🡪
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

