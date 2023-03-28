import { useState } from 'react';

import { PropsFilterBar } from '../../models/props-interfaces';
import { ButtonRating } from '../buttons/button-rating';
import { ButtonListTile } from '../buttons/list-tile-button';
import { SearchInput } from '../inputs/serch-input'

import styles from './filter-bar.module.css'


export const FilterBar = ({ onClick, handleSearch, handleRating, handleLast}: PropsFilterBar) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = (value: boolean) => {
    setIsOpen(value);
  };

  return (
    <div className={styles.filter__bar}>
      <div className={styles.filter__bar__left}>
        <SearchInput handleIsOpen={handleIsOpen} handleSearch={handleSearch} handleLast={handleLast} />
        <div className={`${isOpen ? styles.hidden : ''}`}>
          <ButtonRating handleRating={handleRating} />
        </div>
      </div>
      <div className={`${isOpen ? styles.hidden : ''}`}>
        <ButtonListTile onClick={onClick} />
      </div>
    </div>
  )
};
