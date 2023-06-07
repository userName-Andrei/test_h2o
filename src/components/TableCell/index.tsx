import React, { FC, useState } from 'react';
import { TPersonKeys } from '../../types';

import styles from './TableCell.module.scss';

interface TableCellProps {
    id: number | string,
    path: TPersonKeys,
    nonchange?: boolean,
    children: number | string,
    editMode: boolean,
    handleChangeData: (
        id: number, 
        path: TPersonKeys, 
        value: string
    ) => void
}

const TableCell: FC<TableCellProps> = ({
    id, 
    path, 
    children, 
    editMode, 
    nonchange, 
    handleChangeData
}) => {

    const [value, setValue] = useState(children);

    if (nonchange) {
        return <td className={styles.cell}>{children}</td>;
    }

    if (editMode) {
        return <td className={`${styles.cell} ${styles.cell_changed}`}>
            <input 
                type="text" 
                value={value} 
                className={styles.cell__input} 
                onChange={(e) => {
                    setValue(e.target.value)
                    handleChangeData(+id, path, e.target.value)
                }} 
            />
        </td>
    }

    return <td className={styles.cell}>{children}</td>;
}

export default TableCell;