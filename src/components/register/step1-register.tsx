import { FC, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import cnBind from 'classnames/bind';

import { PASSWORD_REGEX } from '../../models/constants';
import { setUserName, useAppDispatch, useAppSelector } from '../../store';
import { setPassword } from '../../store/slices/state-component-slice';
import { validationOnChange } from '../../utils/validation';
import { CasePassword } from '../login/case-password';

import { CaseUserName } from './case-username';
import { RegisterStep2 } from './step2-register';

import styles from '../login/login.module.css';


const cx = cnBind.bind(styles)


export const RegisterStep1: FC = () => {
  const dispatch = useAppDispatch();
  const [isStep2, setStep2] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const { jwt } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isPasswordOnInput, setPasswordOnInput] = useState(false);
  const [isUsernameValueError, setUsernameValueError] = useState(false);
  const [isPasswordValueError, setPasswordValueError] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    if (jwt) {
      navigate('/', { replace: true })
    }
  }, [jwt, navigate]);

  const handleValidateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameValueError(true)
    clearErrors('username');
    clearErrors('usernameOn');
    const usernameValue = e.target.value;

    setValue('username', usernameValue);
    validationOnChange
      .validateAt('username', { username: usernameValue })
      .then(() => {
        clearErrors('usernameOn');
      })
      .catch((err) => {
        setError('usernameOn', { message: err.message });
      });
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValueError(true)
    clearErrors('password');
    clearErrors('passwordOn');
    const passwordVal = e.target.value;

    setValue('password', passwordVal);
    setPasswordOnInput(true)

    validationOnChange
      .validateAt('password', { password: passwordVal })
      .then(() => {
        clearErrors('passwordOn');
      })
      .catch((err) => {
        setError('passwordOn', { message: err.message });
      });

    const isValidPass = passwordVal.length > 7 && PASSWORD_REGEX.test(passwordVal);

    setPasswordValid(isValidPass);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const submitForm = async (data: FieldValues) => {
    dispatch(setUserName(data.username));
    dispatch(setPassword(data.password));
    setStep2(true)
  };

  return (
    <div>
      {isStep2 ? <RegisterStep2 /> : <div className={styles.container} data-test-id='auth' >
        <div className={styles.logo} > Cleverland </div>
        <form data-test-id='register-form' className={styles.form} onSubmit={handleSubmit(submitForm)} >

          <div className={styles.div__padding} >
            <div className={styles.title} > Регистрация <div className={styles.text} >1 шаг из 3 </div></div>

            <input
              type="text"
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              {...register('username', {
                required: 'Поле не может быть пустым',
                pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
              })}
              name='username'
              onInput={handleValidateUsername}

              onBlur={() => {
                trigger('username');
                clearErrors('usernameOn');
                setUsernameValueError(false)
              }}
              placeholder="Придумайте логин для входа"
            />

            <div className={styles.errorDivWrapper}>

              {isUsernameValueError ? <CaseUserName message={errors?.usernameOn?.message as string} />
                : <span data-test-id='hint' className={cx({
                  errorDiv: errors.username,
                  div: !errors.username
                })}>  {(errors?.username?.message as string) || 'Используйте для логина латинский алфавит и цифры'}
                </span>}
            </div>

            <input
              type={passwordShown ? 'text' : 'password'}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              {...register('password', {

                minLength: {
                  value: 8,
                  message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой'
                },
                pattern: PASSWORD_REGEX,
                required: 'Поле не может быть пустым'
              })}
              name='password'

              onInput={handlePasswordChange}
              onBlur={() => {
                setPasswordValueError(false)
                trigger('password');
              }}
              placeholder="Пароль" />
            {isPasswordOnInput && <button
              type='button'
              className={styles.dot}
              onClick={togglePasswordVisibility}>{passwordShown ? <div data-test-id='eye-opened' className={styles.eye__open} /> : <div data-test-id='eye-closed' className={styles.eye} />}
              {isPasswordValid && <div data-test-id='checkmark' className={styles.check}>✓</div>}</button>}

            <div className={styles.errorDivWrapper}>
              {isPasswordValueError ? <CasePassword message={errors?.passwordOn?.message as string} />

                : <span data-test-id='hint' className={cx({
                  errorDiv: errors.password,
                  div: !errors.password
                })}>  {(errors?.password?.message as string) || 'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                </span>}
            </div>
            <button
              className={styles.button}
              disabled={!isValid}
              type='submit' > СЛЕДУЮЩИЙ ШАГ</button>
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

