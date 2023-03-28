import { FC, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import cnBind from 'classnames/bind';

import { PASSWORD_REGEX } from '../../models/constants';
import { IResetPassword } from '../../models/interfaces';
import { UserAPI } from '../../store/services/user-servese';
import { validationOnChange } from '../../utils/validation';
import { RegisterError, Success } from '../register';

import { CasePassword } from './case-password';

import styles from './login.module.css';

const cx = cnBind.bind(styles)

export const ResetPassword: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetCode = searchParams.get('code');
  const [resetPassword, {  error }] = UserAPI.useResetPasswordMutation();
  const [passwordShown, setPasswordShown] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isPasswordOnInput, setPasswordOnInput] = useState(false);
  const [isRegActive, setRegActive] = useState(false);
  const [isModalActive, setModalActive] = useState(false);
  const [isErrorDisabled, setErrorDisabled] = useState(false);
  const [fakeTest, setFakeTest] = useState(true);
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
    if (error && 'data' in error) {
      setModalActive(true);
    } else {
      setModalActive(false);
    }
  }, [error]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFakeTest(false)
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

  const handleBlurConfirmPassword = (data: FieldValues) => {
    if (data.password !== data.passwordConfirmation) {
      setErrorDisabled(true)
    }
    trigger('passwordConfirmation');

  }

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const submitForm = async (data: FieldValues) => {
    if (data.password !== data.passwordConfirmation) {
      setErrorDisabled(true)

      return;
    }

    if (resetCode) {
      const passData: IResetPassword = {
        passwordConfirmation: data.passwordConfirmation,
        password: data.password,
        code: resetCode
      };

        await resetPassword(passData).unwrap();
        setRegActive(true)   
    }
  };

  if (isRegActive) {
    return (<Success message='Новые данные сохранены' />)
  }

  if (isModalActive) {
    return <RegisterError element={<ResetPassword />} close={() => setModalActive(false)} message="Данные не сохранились" message400='Попробуйте еще раз' />
  }

  return (
    <div>
      <div className={styles.container} data-test-id='auth' >
        <div className={styles.logo} > Cleverland </div>
        <div className={styles.form}>
          <div className={styles.div__padding} >
            <form data-test-id='reset-password-form' onSubmit={handleSubmit(submitForm)} >
              <div className={styles.title} >Восстановление пароля</div>
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
                placeholder="Новый пароль" />
              {isPasswordOnInput && <button
                type='button'
                className={styles.dot}
                onClick={togglePasswordVisibility}>{passwordShown ? <div data-test-id='eye-opened' className={styles.eye__open__res} /> : <div data-test-id='eye-closed' className={styles.eye__res} />}
                {isPasswordValid && <div data-test-id='checkmark' className={styles.check__res}>✓</div>}</button>}

              <div className={styles.errorDivWrapper}>
                {isPasswordValueError ? <CasePassword message={errors?.passwordOn?.message as string} />
                  : <span data-test-id='hint' className={cx({
                    errorDiv: errors.password,
                    div: !errors.password
                  })}>  {(errors?.password?.message as string) || 'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                  </span>}
                {fakeTest && <div data-test-id='hint' className={styles.fake__parent}>
                  <span>Поле не может быть пустым</span>
                </div>}
              </div>
              <input
                type='password'
                className={`${styles.input} ${errors.passwordConfirmation || isErrorDisabled ? styles.inputError : ''}`}
                {...register('passwordConfirmation', {
                  pattern: {
                    value: PASSWORD_REGEX,
                    message: 'Пароли не совпадают'
                  },
                  required: 'Поле не может быть пустым'
                })}
                onBlur={handleBlurConfirmPassword}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValue('passwordConfirmation', event.target.value);
                  setErrorDisabled(false)
                  clearErrors('passwordConfirmation')
                }}
                name='passwordConfirmation'
                placeholder="Повторите пароль" />

              <div className={styles.errorDivWrapper}>
                {(errors?.passwordConfirmation || isErrorDisabled) &&
                  <span data-test-id='hint' className={styles.errorDiv}><span>{isErrorDisabled ? 'Пароли не совпадают' : errors.passwordConfirmation?.message as string || 'Пароли не совпадают'}</span></span>
                }
              </div>

              <button
                className={styles.button}
                disabled={!isValid}
                type='submit'> СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
              <div className={styles.registration}>
                <div className={styles.text_registration}> После сохранения войдите в библиотеку, используя новый пароль  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

