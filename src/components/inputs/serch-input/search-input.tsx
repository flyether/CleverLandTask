import { FC, useEffect, useState } from 'react';
import cnBind from 'classnames/bind';

import crossIcon from '../../../assets/svg/crossIcon.svg';
import magnifyingGlassIcon from '../../../assets/svg/loup.svg';
import { PropsSearchInput } from '../../../models/props-interfaces';
import { useAppDispatch } from '../../../store';
import { setLastValueState, setSearchValue } from '../../../store/slices/state-component-slice';

import styles from './search-inputs.module.css'

const cx = cnBind.bind(styles)

export const SearchInput: FC<PropsSearchInput> = ({ handleIsOpen, handleSearch, handleLast }) => {
  const [isDisabled, setDisabled] = useState(window.innerWidth < 601 ? false : true);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [lastSearchValue, setLastSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(setSearchValue(inputValue))
  }, [dispatch, inputValue]);

  useEffect(() => {
    function handleResize() {
      setDisabled(window.innerWidth < 601 ? false : true);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    if (isDisabled) {
      dispatch(setLastValueState(''))
      dispatch(setSearchValue(inputValue))
    }
  }, [dispatch, isDisabled, inputValue]);

  const handleClearInput = () => {
    if (isDisabled) {
      setInputValue('');
      setIsOpen(false);
      handleSearch('');
    } else {

      setInputValue(lastSearchValue);
      setIsOpen(false);
    }
  };

  const handleChange = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
    handleSearch(e.target.value);
    setLastSearchValue(e.target.value);
  };

  const handleClose = () => {
    dispatch(setLastValueState(lastSearchValue))

    handleClearInput()
    handleIsOpen(false);
  }

  return (
    <div className={styles.search__input__container}>
      <input
        data-test-id='input-search'
        value={inputValue}
        onChange={handleChange}
        type="text"
        placeholder='Поиск книги или автора…'
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
        }}
        className={` ${isOpen ? styles.focused : styles.search__input}`}
      />
      <div className={cx({
        loupe__red: isFocused,
        loupe: !isFocused,
      })} />

      {(isOpen || inputValue.length > 0) && (
        <button
          data-test-id='button-search-close'
          className={cx({
            cross__icon: !isDisabled && isOpen,
            cross__icon__big: isDisabled && inputValue.length > 0,
            hidden: !isOpen && !isDisabled
          })}
          type="button"
          onClick={handleClose}>
          <img src={crossIcon} alt="cross icon" />
        </button>
      )}
      <button className={isOpen ? styles.hidden : styles.search__icon}
        data-test-id='button-search-open'
        disabled={isDisabled}
        type="button"
        onClick={() => {
          setIsOpen(true);
          handleIsOpen(true);
          handleLast(lastSearchValue)
        }}>
        {isOpen ? '' : <img src={magnifyingGlassIcon} alt="search icon" />}
      </button>
    </div>
  );
}