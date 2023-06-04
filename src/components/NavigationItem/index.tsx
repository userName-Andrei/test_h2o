import React, {FC, MouseEvent} from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.scss';

export interface ListItem {
    title: string,
    href: string
}

const setActiveNavlink = (props: {
    isActive: boolean,
    isPending: boolean
}): string | undefined => {
    const {isActive} = props;
    return isActive ? `${styles.link} ${styles.active}` : styles.link
}

const NavigationItem: FC<ListItem> = ({title, href}) => {

    const onClickNavlink = (e: MouseEvent<HTMLLIElement>) => {
        const elem = e.currentTarget;
        const elemWidth = elem.offsetWidth;
        const elemLeft = elem.getBoundingClientRect().left;
        const parent = elem.parentElement;
        let parentTransform = parseInt(parent?.style.transform ? 
            parent.style.transform.replaceAll(/translateX\(/g, '') : 
            '0')
        const ulBounding = parent?.parentElement?.getBoundingClientRect();
        
        if (parent && ulBounding?.left && elemLeft < ulBounding.left) {
            const offset = (ulBounding.left - elemLeft) - Math.abs(parentTransform);
            parent.style.transform = `translateX(${offset}px)`;
        }
        
        if (parent && ulBounding?.right && elemLeft + elemWidth > ulBounding.right) {
            const offset = parentTransform - Math.abs(ulBounding.right-(elemLeft + elemWidth));
            parent.style.transform = `translateX(${offset}px)`;
        }
    }

    return (
        <li className={styles.item} onClick={onClickNavlink}>
            <NavLink to={href} className={setActiveNavlink}>
                {title}
            </NavLink>
        </li>
    );
};

export default NavigationItem;