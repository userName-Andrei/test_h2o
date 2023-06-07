import React, { FC, useState, useEffect } from 'react';

import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPage, setPerPage } from '../../pages/CommonBase/CommonBaseSlice';

const Pagination: FC = () => {

    const dispatch = useAppDispatch();
    const dataBase = useAppSelector(state => state.common_base.table);
    const dbLength = dataBase.length;
    const [pagesArray, setPagesArray] = useState<number[]>([]);
    const selectedPage = useAppSelector(state => state.common_base.page);
    const perPage = useAppSelector(state => state.common_base.perPage);

    useEffect(() => {
        let arr: number[] = [];

        for (let i = 0; i < Math.ceil(dbLength / perPage); i++){
            arr.push(i + 1);
        }

        setPagesArray(arr);
    }, [perPage])

    return (
        <div className={styles.pagination}>
            <div className={styles.pagination__info}>
                показано {selectedPage * perPage - perPage + 1} - {selectedPage * perPage < dbLength ? selectedPage * perPage : dbLength} из {dbLength} результатов
            </div>
            <div className={styles.pagination__row}>
                <button 
                    className={classNames(styles.iconBtn, {
                        [styles.iconBtn_disable]: selectedPage === 1,
                    })}
                    onClick={() => dispatch(setPage(selectedPage - 1 > 0 ? selectedPage - 1 : 1))}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className={styles.pagesBtns}>
                    {pagesArray.map((num => {
                        return <button
                                    className={classNames(styles.pageBtn, {
                                        [styles.active]: selectedPage === num
                                    })}
                                    key={num} onClick={() => dispatch(setPage(num))}
                                >
                                        {num}
                                </button>
                    }))}
                </div>
                <button 
                    className={classNames(styles.iconBtn, {
                        [styles.iconBtn_disable]: selectedPage === pagesArray[pagesArray.length - 1],
                    })}
                    onClick={() => dispatch(setPage(selectedPage + 1 < pagesArray.length ? selectedPage + 1 : pagesArray.length))}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <div className={styles.pagination__info}>
                <label htmlFor='items-per-page-select'>отображать на странице</label>
                <select className={styles.selectPagination} value={perPage}
                        onChange={(e) => {
                            dispatch(setPerPage(+e.target.value))
                        }}
                        name="items-per-page" id="items-per-page-select">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;