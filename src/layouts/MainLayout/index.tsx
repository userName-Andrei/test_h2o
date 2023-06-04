import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faRectangleList,
    faBoxArchive,
    faUserGroup,
    faCoins,
    faGear
} from '@fortawesome/free-solid-svg-icons';
import NavBarItem from '../../components/NavBarItem';

import styles from './MainLayout.module.scss';

const MainLayout: FC = () => {
    return (
        <div className={styles.content}>
            <NavBar>
                <NavBarItem linkTo='/'>
                    <FontAwesomeIcon icon={faCalendarDays} className={styles.icon} />
                </NavBarItem>
                <NavBarItem linkTo='/'>
                    <FontAwesomeIcon icon={faRectangleList} className={styles.icon} />
                </NavBarItem>
                <NavBarItem linkTo='/'>
                    <FontAwesomeIcon icon={faBoxArchive} className={styles.icon} />
                </NavBarItem>
                <NavBarItem linkTo='/users'>
                    <FontAwesomeIcon icon={faUserGroup} className={styles.icon} />                    
                </NavBarItem>
                <NavBarItem linkTo='/'>
                    <FontAwesomeIcon icon={faCoins} className={styles.icon} />
                </NavBarItem>
                <NavBarItem linkTo='/'>
                    <FontAwesomeIcon icon={faGear} className={styles.icon} />
                </NavBarItem>
            </NavBar>

            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;