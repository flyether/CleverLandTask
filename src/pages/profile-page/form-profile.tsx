/* eslint-disable complexity */
import React, { FC, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask'
import cnBind from 'classnames/bind';

import { ServerGoodResponse } from '../../components/errors';
import { LoginInput,  PasswordInput } from '../../components/inputs/serch-input';
import { CasePassword } from '../../components/login/case-password';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../models/constants';
import { InitialValues, UserData, UserDataUpdate } from '../../models/interfaces';
import { UserAPI } from '../../store/services/user-servese';
import { validationOnChange } from '../../utils/validation';

import stylesLogin from '../../components/login/login.module.css';
import styles from './profile-page.module.css';

const cx = cnBind.bind(stylesLogin)

export const FormProfile: FC<{ userData: UserData }> = ({ userData }) => {
   const [updateUser] = UserAPI.useUpdateUserMutation();
   const [fakeTest, setFakeTest] = useState(true);
   const [isInputActive, setInputActive] = useState(false);
   const [passwordShown, setPasswordShown] = useState(false);
   const [isPasswordValid, setPasswordValid] = useState(false);
   const [isPasswordOnInput, setPasswordOnInput] = useState(false);
   const [isLoginValueError, setLoginValueError] = useState(false);
   const [isPasswordValueError, setPasswordValueError] = useState(false);
   const [isRegActive, setRegActive] = useState(false);
   const [isVal, setval] = useState(true);
   const [phoneNew, setPhoneNew] = useState(userData.phone ?? '');
   const [initialValues, setInitialValues] = useState<InitialValues | undefined>(undefined);

   const {
      setError,
      register,
      handleSubmit,
      clearErrors,
      trigger,
      setValue,
      formState: { errors },
   } = useForm();

   const handleBlur = () => {
      trigger('phone')
   }

   useEffect(() => {
      setPhoneNew(userData.phone)
      setInitialValues({
         login: userData.username,
         email: userData.email,
         lastName: userData.lastName,
         firstName: userData.firstName,
         phone: userData.phone
      });
   }, [userData]);

   const handlePhoneChange = (event: { target: { value: string } }) => {
      setFakeTest(false)
      setValue('phone', event.target.value);
      setPhoneNew(event.target.value);
      handleBlur()
   };

   const handleValidateLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFakeTest(false)
      setLoginValueError(true)
      clearErrors('login');
      clearErrors('loginOn');
      const loginValue = event.target.value;

      setValue('login', loginValue);
      validationOnChange
         .validateAt('login', { login: loginValue })
         .then(() => {
            clearErrors('loginOn');

            clearErrors('login');
            setval(true)

         })
         .catch((err) => {
            setError('loginOn', { message: err.message });
            setval(false)
         });
   }
   const handleRedact = () => {
      setInputActive(!isInputActive)
      if (errors) {
         clearErrors('loginOn');
         clearErrors('login');
         clearErrors('phone');
         clearErrors('password');
         clearErrors('passwordOn');
         setPasswordValueError(false)
         clearErrors('lastName');
         clearErrors('email');
         clearErrors('firstName');
      }
   }

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

   const handleBlurLogin = () => {
      trigger('login');
      clearErrors('loginOn');
   }

   const togglePasswordVisibility = () => {
      setPasswordShown(passwordShown ? false : true);
   };

   const submitForm = async (d: FieldValues) => {
      const userLogData: UserDataUpdate = {
         id: userData.id.toString(),
         body: {
            username: d.login,
            email: d.email,
            password: d.password,
            firstName: d.firstName,
            lastName: d.lastName,
            phone: phoneNew,
         }
      }
      
         await updateUser(userLogData).unwrap()
         setRegActive(true)
         setPasswordValueError(false)
         setInputActive(false)
   };

   return (
      <React.Fragment>
         {isRegActive && <ServerGoodResponse message='Изменения успешно сохранены!' close={() => setRegActive(false)} />}
         <form data-test-id='profile-form' className={styles.form} onSubmit={handleSubmit(submitForm)} >
            <div className={styles.title} > Учётные данные </div>
            <div className={styles.text} >Здесь вы можете отредактировать информацию о себе</div>
            <div className={styles.div__colum} >
               <div className={styles.div__flex} >
                  <div className={styles.div__under__input} >
                     <label className={styles.inputLabel} htmlFor="login">Логин</label>
                     <LoginInput defaultValue={initialValues?.login} disabled={!isInputActive} className={`${styles.input} ${errors.login ? stylesLogin.inputError : ''}`}
                        onBlur={handleBlurLogin} register={register} name="login" handleLoginChange={() => {

                           setFakeTest(false)
                        }} handChange={handleValidateLogin} />
                     <div className={`${stylesLogin.errorDivWrapper} .${stylesLogin.margin__profile}`}>
                        {isLoginValueError && !isVal ?
                           <div data-test-id='hint' className={
                              stylesLogin.errorDiv1}>Используйте для логина латинский алфавит и цифры </div>
                           : <div data-test-id='hint' className={
                              stylesLogin.errorDiv1}> {(fakeTest && !errors?.email) ?
                                 <span className={stylesLogin.fake__parent}>Поле не может быть пустым</span>
                                 : (errors?.login?.message as string) || ''}
                           </div>}
                     </div>
                  </div>
                  <div className={styles.div__under__input} >
                     <label className={styles.inputLabel} htmlFor="password">Пароль</label>
                     <PasswordInput type={passwordShown ? 'text' : 'password'} className={`${styles.input} ${errors.password ? stylesLogin.inputError : ''}`} disabled={!isInputActive} handChange={handlePasswordChange} handleLoginChange={() => { }} placeholder='*******' onBlur={() => {
                        trigger('password');
                     }} register={register} />

                     {isPasswordOnInput && <button
                        type='button'
                        className={stylesLogin.dot}
                        onClick={togglePasswordVisibility}>{passwordShown ? <div data-test-id='eye-opened' className={stylesLogin.eye__open__profile} /> : <div data-test-id='eye-closed' className={stylesLogin.eye__profile} />}
                        {isPasswordValid && <div data-test-id='checkmark' className={stylesLogin.check__profile}>✓</div>}</button>}

                     <div className={`${stylesLogin.errorDivWrapper} .${stylesLogin.margin__profile}`}>
                        {isPasswordValueError && !isPasswordValid ? <CasePassword profile={true} message={errors?.passwordOn?.message as string} />
                           : <div data-test-id='hint' className={stylesLogin.errorDiv1}>  {(fakeTest && !errors?.password) &&
                              <span className={stylesLogin.fake__parent}>Поле не может быть пустым</span>
                           } {(errors?.password?.message as string) || ''}
                           </div>}
                     </div>
                  </div>
               </div>
               <div className={styles.div__flex} >
                  <div className={styles.div__under__input} >
                     <label className={styles.inputLabel}
                        htmlFor="firstName">Имя</label>

                     <input
                        defaultValue={initialValues?.firstName}
                        type="text"
                        className={`${styles.input} ${errors.firstName ? stylesLogin.inputError : ''}`}
                        {...register('firstName', {
                           disabled: !isInputActive,
                        })}
                        name='firstName'
                        placeholder='Имя'
                     />
                     <div className={`${stylesLogin.errorDivWrapper} ${stylesLogin.margin__profile}`}>
                        <span data-test-id='hint' className={stylesLogin.errorDiv}> {(fakeTest && !errors?.firstName) &&
                           <span className={stylesLogin.fake__parent}>Поле не может быть пустым</span>
                        }{(errors?.firstName?.message as string) || null}
                        </span>
                     </div>
                  </div>
                  <div className={styles.div__under__input} >
                     <label className={styles.inputLabel} htmlFor="lastName">Фамилия</label>
                     <input
                        defaultValue={initialValues?.lastName}
                        type="text"
                        className={`${styles.input} ${errors.lastName ? stylesLogin.inputError : ''}`}
                        {...register('lastName', {
                           disabled: !isInputActive,
                        })}
                        name='lastName'
                        placeholder='Фамилия'
                     />
                     <div className={`${stylesLogin.errorDivWrapper} ${stylesLogin.margin__profile}`}>
                        <span data-test-id='hint' className={stylesLogin.errorDiv}> {(fakeTest && !errors?.lastName) &&
                           <span className={stylesLogin.fake__parent}>Поле не может быть пустым</span>
                        }{(errors?.lastName?.message as string) || null}
                        </span>
                     </div>

                  </div>
               </div>
               <div className={styles.div__flex} >
                  <div className={styles.div__under__input} >
                     <label className={styles.inputLabel} htmlFor="phone">Телефон</label>
                     <MaskedInput
                        // value={phoneNew}
                        defaultValue={phoneNew}
                        placeholderChar="x"
                        mask={['+', '3', '7', '5', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                        className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                        placeholder="Номер телефона"
                        pipe={value => {
                           const inputLength = value.toString().replace(/\D/g, '').length;

                           return inputLength <= 12 ? value : value.replace(/\D/g, '');
                        }}
                        {...register('phone', {

                           disabled: !isInputActive,
                           pattern: /^\+375\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/
                        })}
                        name="phone"

                        onChange={handlePhoneChange}
                        onBlur={handleBlur}
                     />
                     <div className={`${stylesLogin.errorDivWrapper} ${stylesLogin.margin__profile}`}>
                        <span data-test-id='hint' className={cx({
                           errorDiv: errors.phone,
                           div: !errors.phone
                        })}>  {(fakeTest && !errors?.email) ?
                           <span className={stylesLogin.fake__parent}>Поле не может быть пустым</span>
                           : (errors?.phone?.message as string) || 'В формате +375 (xx) xxx-xx-xx'}
                        </span>
                     </div>
                  </div>
                  <div className={styles.div__under__input} >
                     <label className={styles.inputLabel} htmlFor="email">E-mail</label>
                     <input
                        defaultValue={initialValues?.email}
                        type="text"
                        className={`${styles.input} ${errors.login ? stylesLogin.inputError : ''}`}
                        {...register('email', {
                           disabled: !isInputActive,
                           required: 'Поле не может быть пустым',
                           minLength: 5,
                           pattern: {
                              value: EMAIL_REGEX,
                              message: 'Введите корректный e-mail'
                           },
                        })}
                        name='email'
                        onInput={() => clearErrors('email')}
                        onBlur={() => {
                           trigger('email');
                           clearErrors('email');
                        }}
                        placeholder='E-mail'
                     />
                     <div className={`${stylesLogin.errorDivWrapper} .${stylesLogin.margin__profile}`}>
                        <div data-test-id='hint' className={
                           stylesLogin.errorDiv1}> {(fakeTest && !errors?.email) ?
                              <span className={stylesLogin.fake__parent}>Поле не может быть пустым</span>
                              : (errors?.email?.message as string) || ''}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.div__flex} >
               <button
                  data-test-id='edit-button'
                  className={styles.button}
                  onClick={handleRedact}
                  type='button' >Редактировать</button>
               <button
                  type='submit'
                  data-test-id='save-button'
                  className={styles.button__red}
                  disabled={!isInputActive}
               >сохранить изменения</button>
            </div>
         </form>
      </React.Fragment>
   )
};
