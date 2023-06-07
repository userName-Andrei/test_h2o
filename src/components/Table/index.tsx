import React, { FC, useDebugValue, useEffect, useRef, useState } from 'react';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { IPerson, TPersonKeys } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { editPersonValue, setPage } from '../../pages/CommonBase/CommonBaseSlice';

import styles from './Table.module.scss';

interface TableCellProps {
    id: number,
    path: TPersonKeys,
    nonchange?: boolean,
    children: number | string,
    editMode: boolean
}

const TableCell: FC<TableCellProps> = ({id, path, children, editMode, nonchange}) => {

    const dispatch = useAppDispatch();

    const ref = useRef<string | number>(children);

    if (nonchange) {
        return <td className={styles.cell}>{children}</td>;
    }

    if (editMode) {
        return <td className={`${styles.cell} ${styles.cell_changed}`}>
            <input 
                type="text" 
                value={ref.current} 
                className={styles.cell__input} 
                onChange={(e) => {
                    ref.current = e.target.value;

                    dispatch(editPersonValue({
                        id,
                        path,
                        value: ref.current,
                    }))
                }} 
            />
        </td>
    }

    return <td className={styles.cell}>{children}</td>;
}


interface SortBtnProps {
    setCurrentSortCol: (n: TPersonKeys) => void,
    children: string | number,
    sortPath: TPersonKeys,
    currentSortCol: string,
    handleColSort: (key: TPersonKeys, oreder: 'asc' | 'desc') => void
}

const SortTableBtn: FC<SortBtnProps> = ({
    setCurrentSortCol, 
    children, 
    sortPath, 
    currentSortCol, 
    handleColSort
}) => {

    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        if (currentSortCol !== sortPath) {
            setIsActive(false)
        }
    }, [isActive, currentSortCol])

    useEffect(() => {
        if (isActive) {
            handleColSort(sortPath, "asc")
        } else {
            handleColSort(sortPath, "desc")
        }

        if (!isActive && currentSortCol === sortPath) {
            setCurrentSortCol('id')
        }
    }, [isActive])
    
    return (
        <button 
            data-sort={sortPath}
            className={styles.title__btn}
            onClick={(e) => {
                setIsActive(state => !state)
                setCurrentSortCol(sortPath)
            }}
        >
           {children}
            <FontAwesomeIcon icon={faCaretDown} className={classNames(styles.title__icon, {
                [styles.rotateSortIcon]: isActive
            })} />
        </button>
    )
}


interface TableProps {
    className?: string,
}

const Table: FC<TableProps> = ({className}) => {

    const dispatch = useAppDispatch();
    const dataBase = useAppSelector(state => state.common_base.personOnPage);
    const search = useAppSelector(state => state.common_base.search);
    const editMode = useAppSelector(state => state.common_base.editMode);

    const [activeCell, setActiveCell] = useState<number>(0);
    const [currentSortCol, setCurrentSortCol] = useState<TPersonKeys>("id");
    const [dataView, setDataView] = useState<IPerson[]>(dataBase);
    const classes = classNames(className, styles.wrapper);
    
    // инициализация первой страницы
    useEffect(() => {
        dispatch(setPage(1))
    }, [])

    // поиск
    useEffect(() => {
        handleFilter(search)
    }, [search])

    // при изменении данных тфблицы и изменении perpage, page перерисовка таблицы
    useEffect(() => {
        setDataView(data => dataBase);
    }, [dataBase])

    // функция сортировки колонок
    const handleColSort = (key: TPersonKeys, order: "asc" | "desc") => {
        const data = [...dataView];

        if (order === 'asc') {
            setDataView(state => {
                return data.sort((a:IPerson,b:IPerson) => a[key as TPersonKeys] > b[key as TPersonKeys] ? 1 : -1)
            })
        }

        if (order === 'desc') {
            setDataView(state => {
                return data.sort((a:IPerson,b:IPerson) => a[key as TPersonKeys] < b[key as TPersonKeys] ? 1 : -1)
            })
        }
    };

    // функция поиска по имени
    const handleFilter = (searchWord: string) => {
        const filterKey = searchWord.toLowerCase();

        if (filterKey) {
            setDataView(data => (
                data.filter(person => person.name.toLowerCase().includes(filterKey))
            ))
        } else {
            setDataView(dataBase)
        }
    };

    return (
        <div className={classes}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th rowSpan={2} className={styles.title}>
                            №
                        </th>
                        <th rowSpan={2} className={styles.title}>
                            <SortTableBtn 
                                setCurrentSortCol={setCurrentSortCol} 
                                sortPath='name' 
                                currentSortCol={currentSortCol} 
                                handleColSort={handleColSort}
                            >
                                Имя сотрудника
                            </SortTableBtn>
                        </th>
                        <th  className={styles.title} colSpan={6}>
                            Основная информация
                        </th>
                    </tr>
                    <tr>
                        <th className={styles.title}>ID номер</th>
                        <th className={styles.title}>Телефон</th>
                        <th className={styles.title}>
                            <SortTableBtn 
                                setCurrentSortCol={setCurrentSortCol} 
                                sortPath='sex' 
                                currentSortCol={currentSortCol} 
                                handleColSort={handleColSort}
                            >
                                Пол
                            </SortTableBtn>
                        </th>
                        <th className={styles.title}>Дата рождения</th>
                        <th className={styles.title}>
                            <SortTableBtn 
                                setCurrentSortCol={setCurrentSortCol} 
                                sortPath='metro_station' 
                                currentSortCol={currentSortCol} 
                                handleColSort={handleColSort}
                            >
                                Метро
                            </SortTableBtn>
                        </th>
                        <th className={styles.title}>Адрес проживания</th>
                    </tr>
                </thead>
                <tbody>
                    {dataView.length > 0 && dataView.map(person => (
                        <tr key={person.id} 
                            className={classNames(styles.bodyRow, {
                                [styles.active]: activeCell === person.id
                            })} 
                            onClick={() => setActiveCell(person.id)}
                        >
                            <TableCell id={person.id} path={'id'} editMode={editMode} nonchange >
                                {person.id}
                            </TableCell>
                            <TableCell id={person.id} path={'name'} editMode={editMode} >
                                {person.name}
                            </TableCell>
                            <TableCell id={person.id} path={'base_id'} editMode={editMode} >
                                {person.base_id}
                            </TableCell>
                            <TableCell id={person.id} path={'phone'} editMode={editMode} >
                                {person.phone}
                            </TableCell>
                            <TableCell id={person.id} path={'sex'} editMode={editMode} >
                                {person.sex}
                            </TableCell>
                            <TableCell id={person.id} path={'birthday'} editMode={editMode} >
                                {person.birthday}
                            </TableCell>
                            <TableCell id={person.id} path={'metro_station'} editMode={editMode} >
                                {person.metro_station}
                            </TableCell>
                            <TableCell id={person.id} path={'address'} editMode={editMode} >
                                {person.address}
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;