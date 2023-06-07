import React, {FC, useState} from 'react';
import Card from '../../components/Card';

import styles from './CommonBase.module.scss';
import Search from '../../components/Search';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import { IPerson } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setEditMode } from './CommonBaseSlice';

const CommonBase: FC = () => {

    const dispatch = useAppDispatch();
    const dataBaseLength = useAppSelector(state => state.common_base.table.length);

    return (
        <Card type='dark'>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>
                    Общая база сотрудников
                </h1>

                <Card type='light' className={styles.cardSearch}>
                    <div className={styles.cardSearch__row}>
                        <div className={`${styles.cardSearch__row} ${styles.countEmployers}`}>
                            <div className={`${styles.cardSearch__row} ${styles.countEmployers__text}`}>
                                <h3 className={styles.countEmployers__title}>
                                    {dataBaseLength}
                                </h3>
                                <span>Контактов</span>
                            </div>
                            <Search className={styles.countEmployers__search}/>
                        </div>

                        <button className={`${styles.btn} ${styles.btn_edit}`} onClick={() => dispatch(setEditMode())}>
                            Режим редактирования
                        </button>
                    </div>
                </Card>

                <Table />

                <Pagination />
            </div>
        </Card>
    );
};

export default CommonBase;