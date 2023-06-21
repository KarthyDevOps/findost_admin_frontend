import React from 'react';
import { debounce } from 'helpers/index';
import {BiChevronDown} from 'react-icons/bi'
import styles from './SearchInput.module.scss';

export const SearchInput = ({
  id = 'search-input',
  onFocus = () => {
    return null;
  },
  onChange = () => {
    return null;
  },
  defaultValue = '',
  placeholder = 'Search',
  dropDownSymbol = 'Search',
  autoFocus = false
}) => {
  return (
    <div className={styles.search_input}>
      <input
        autoFocus={autoFocus}
        id={id}
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={debounce(onChange, 500)}
        onFocus={onFocus}
        autoComplete="off"
      />
      <i style={{color : "#000000"}}><BiChevronDown  size={25} /></i>
      {/* {dropDownSymbol === 'Search' && (
        <i className="fas fa-search"></i>
      ) : (
        <i class="fas fa-chevron-down"></i>
      )} */}
    </div>
  );
};