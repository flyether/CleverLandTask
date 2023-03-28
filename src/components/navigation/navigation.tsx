import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import userPic from '../../assets/img/avatar.png'
import login from '../../assets/svg/logo-clevertec_40.svg'
import { Url } from '../../models/constants';
import { removeUser, useAppDispatch, useAppSelector } from '../../store';
import { SideBar } from '../side-bar';

import './index.css';
import styles from './navigation.module.css';

export const NavigationBlock = () => {
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
   const [isOpenBurger, setIsOpenBurger] = useState(false);
   const [isProfile, setProfile] = useState(false);
   const [isListVisibleFromSide, setIsListVisibleFromSide] = useState(false);
   const NavigationBlockRef = useRef<HTMLDivElement>(null);
   const { user } = useAppSelector((state) => state.user);
   const { userMe } = useAppSelector((state) => state.userData);
   const [name, setName] = useState(user?.firstName)
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const [url, setUrl] = useState(userMe.avatar && userMe.avatar !== null ? `${userMe.avatar}` : userPic);

   const buttonClass = classnames({
      button: true,
      'button__close': isOpenBurger
   });

   useEffect(() => {
      if (userMe.avatar && userMe.avatar !== null) {
         setUrl(`${Url.BASE_URL}${userMe.avatar}`)
      }
      if (userMe.firstName && userMe.firstName !== null) {
         setName(userMe.firstName)
      }
   }, [userMe]);


   useEffect(() => {
      function handleResize() {
         setScreenWidth(window.innerWidth);
      }

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
   }, [screenWidth]);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (NavigationBlockRef.current && !NavigationBlockRef.current.contains(event.target as Node)) {
            setIsOpenBurger(false);
         }
      };

      document.addEventListener('click', handleClickOutside);

      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   }, [isOpenBurger]);


   const handleClick = () => {
      setProfile(isProfile === true ? false : true);
   }

   const handleSignOut = () => {
      dispatch(removeUser());
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
   };
   const handleProfile  = () => {
         navigate(Url.PATH_PROFILE, { replace: true });
         setProfile(false)
      };

   return (
      <div>
         <nav className={styles.container} ref={NavigationBlockRef}>
            <div className={styles.list} >
               <div className={styles.header__burger}>
                  <button
                     data-test-id='button-burger'
                     type='button'
                     className={buttonClass}
                     onClick={() => setIsOpenBurger(!isOpenBurger)}
                  >
                     <span className='span' />
                     <span className='span' />
                     <span className='span' />
                  </button>
                  <div
                     ref={NavigationBlockRef}
                     data-test-id="burger-navigation"
                     className={isOpenBurger ? (isListVisibleFromSide ? styles.container__burger__shot : styles.container__burger) : styles.hidden}
                  >
                     <SideBar
                        setIsOpenBurger={setIsOpenBurger}
                        setIsListVisibleFromSide={setIsListVisibleFromSide}
                        dataTestsContract="burger-contract"
                        dataTestsTerms="burger-terms"
                        dataTestsHowcase="burger-showcase"
                        dataTestsBooks="burger-books"
                        nav='burger'
                        showAuth={true}
                     />
                  </div>
               </div>
               <Link to="/" className={styles.link}>
                  <div className={styles.div__logo}>
                     <img src={login} alt='logo' />
                     <div className={styles.logo} />
                  </div>
               </Link>
               <div className={styles.div__book}>
                  <Link to={Url.PATH_All} className={styles.link__book}>
                     Библиотека
                  </Link>


               </div>
               {screenWidth > 860 ?
                  <div className={styles.div__user}>
                     <p className={styles.div__user__p}>Привет, {name}!</p>
                     <button
                        type='button'
                        onClick={handleClick}
                     >
                        <img src={url} className={styles.div__user__pic} alt='user pic' /></button>
                     {isProfile &&
                        <div className={styles.profile}>

                           <button
                              data-test-id='profile-button'
                              type='button'
                              onClick={handleProfile}
                              className={styles.button__exit}>
                              Профиль
                           </button>
                           <button
                              type='button'
                              onClick={handleSignOut}
                              className={styles.button__exit}>
                              Выход
                           </button>
                        </div>
                     }
                  </div> : null}
            </div>
         </nav>
      </div>
   )
};

