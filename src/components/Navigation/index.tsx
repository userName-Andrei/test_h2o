import React, { FC, useRef } from 'react';
import Arrow from '../../assets/images/svg/arrow.svg';
import NavigationBtn from '../NavigationBtn';
import NavigationList from '../NavigationList';
import { ListItem } from '../NavigationItem';
import classNames from 'classnames';

import styles from './Navigation.module.scss';

const List: ListItem[] = [
    {
        title: 'База анкет сотрудников',
        href: 'forms'
    },
    {
        title: 'Общая база сотрудников',
        href: 'common-base'
    },
    {
        title: 'База сотрудников',
        href: 'base'
    },
    {
        title: 'Календарь сотрудников',
        href: 'calendar'
    },
]

interface NavigationProps {
    className?: string
}

const Navigation: FC<NavigationProps> = ({className}) => {

    const navlinksRef = useRef<HTMLUListElement>(null);
    const greenLineRef = useRef<HTMLLIElement>(null);
    const classes = classNames(className, styles.navigation);

    return (
        <nav className={classes}>
            <div className={styles.arrow_btns}>
                <NavigationBtn direction='left' navlinksRef={navlinksRef}>
                    <img src={Arrow} alt="arrow-left" className={styles.arrow_left} />
                </NavigationBtn>
                <NavigationBtn direction='right' navlinksRef={navlinksRef}>
                    <img src={Arrow} alt="arrow-right" className={styles.arrow_right} />
                </NavigationBtn>
            </div>
            <div className={styles.wrap}>
                <NavigationList 
                    greenLineRef={greenLineRef} 
                    navlinksRef={navlinksRef} 
                    links={List}
                />
            </div>
        </nav>
    );
};

export default Navigation;