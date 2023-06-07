import React, { FC } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { setSearch } from '../../pages/CommonBase/CommonBaseSlice';

import styles from './Search.module.scss';


interface SearchProps {
    className?: string
}

const Search: FC<SearchProps> = ({className}) => {

    const dispatch = useAppDispatch();
    const classes = classNames(styles.search, className);

    return (
        <div className={classes}>
            <FontAwesomeIcon icon={faSearch} className={styles.search__icon}/>
            <input 
                type="text" 
                onChange={(e) => dispatch(setSearch(e.target.value))}
                className={styles.countEmployers__search} 
                placeholder='Поиск'
            />
        </div>
    );
};

export default Search;