import {  useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Url } from '../../models/constants';
import { MatchingCategoriesCount, SidebarProps } from '../../models/props-interfaces';
import { removeUser, useAppDispatch, useAppSelector } from '../../store';

import styles from './side-bar.module.css'

export const SideBar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const { allBooks } = useAppSelector((state) => state.books);
  const { cat: categories } = useAppSelector((state) => state.stateComponent);
  const {showAuth, setIsOpenBurger, setIsListVisibleFromSide, nav, dataTestsHowcase, dataTestsBooks, dataTestsTerms, dataTestsContract } = props;
  const { jwt } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isListVisible, setIsListVisible] = useState(true);
  const location = useLocation();

  const handleSignOut = async () => {
    dispatch(removeUser());
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    setIsOpenBurger(false)
  };

  const handleIsOpen = () => {
    setIsListVisible(!isListVisible)
    if (setIsListVisibleFromSide)
      setIsListVisibleFromSide(isListVisible);
  };

  const matchingCategoriesCount: MatchingCategoriesCount = {};

  if (allBooks) {
    allBooks.forEach(book => {
      book.categories.forEach(category => {
        matchingCategoriesCount[category] = matchingCategoriesCount[category] + 1 || 1;
      });
    });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={`${styles.div__link__Book} ${location.pathname === Url.PATH_All ? styles.div__link__Book__active : ''}`}>
          <button
            data-test-id={dataTestsHowcase}
            type='button'
            className={`${styles.ul__all} ${location.pathname.includes(Url.PATH_BOOKS) ? styles.active : ''}`}
            onClick={handleIsOpen}
          >
            Витрина книг
            {
              (isListVisible ? <svg className={styles.open} /> : <div className={styles.close} />)
            }
          </button>
        </div>
        <ul className={isListVisible ? styles.ul__block : styles.hide}>
          <Link
            onClick={() => {
              setIsOpenBurger(false)
            }}
            data-test-id={`${dataTestsTerms}-books`}
            to={Url.PATH_All}><div
              data-test-id={dataTestsBooks} className={`${styles.link__label} ${location.pathname === Url.PATH_All ? styles.active : ''}`}>Все книги</div></Link>
          {categories && categories.map((link) => (
            <li key={link.id}>
              <div >
                <Link to={`${Url.PATH_BOOKS}${link.path}`}
                  onClick={() => {
                    setIsOpenBurger(false)
                  }}
                  className={`${styles.link__label} ${location.pathname === `${Url.PATH_BOOKS}${link.path}` ? styles.active : ''}`}>
                  <div className={styles.link}>
                    <span data-test-id={`${nav}-${link.path}`} className={styles.wite}>{link.name}</span><span className={styles.wite}>&nbsp;
                      {matchingCategoriesCount[link.name] > 0 ? (
                        <span data-test-id={`${nav}-book-count-for-${link.path}`} className={styles.link__number}>
                          {matchingCategoriesCount[link.name]}
                        </span>
                      ) : <span data-test-id={`${nav}-book-count-for-${link.path}`} className={styles.link__number}>
                        {(matchingCategoriesCount[link.name] > 0) ? matchingCategoriesCount[link.name] : 0}
                      </span>}
                    </span>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <div className={`${styles.div__link} ${location.pathname === '/direction' ? styles.active : ''}`}>
          <Link
            onClick={() => {
              setIsListVisible(false)
              setIsOpenBurger(false)
            }}
            to="/direction">
            <div data-test-id={dataTestsTerms} className={`${styles.div__link__Book} ${location.pathname === '/direction' ? styles.div__link__Book__active : ''}`}>
              Правила пользования
            </div>
          </Link>
        </div>
        <div className={`${styles.div__link} ${location.pathname === '/contract' ? styles.active : ''}`}>
          <Link onClick={() => {
            setIsListVisible(false)
            setIsOpenBurger(false)
          }}
            to="/contract">
            <div data-test-id={dataTestsContract} className={`${styles.div__link__Book} ${location.pathname === '/contract' ? styles.div__link__Book__active : ''}`}>
              Договор оферты
            </div>
          </Link>
        </div>
      </div>
      {jwt  && showAuth &&
        <div className={styles.authorization}>
          <div className={`${styles.div__link_ut} ${location.pathname === '/profile' ? styles.active : ''}`}>
            <div className={`${location.pathname === '/profile' ? styles.div__link__Book__active__ut : ''}`}>
              <Link onClick={() => {
                setIsListVisible(false)
                setIsOpenBurger(false)
              }}
              data-test-id='profile-button'
                to="/profile">
                Профиль
              </Link>
            </div>
          </div>
          <button
            data-test-id='exit-button'
            type='button'
            onClick={handleSignOut}
            className={styles.div__link_ut}>
            Выход
          </button>
        </div>}
    </div>
  );
};
