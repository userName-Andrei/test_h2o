import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import NavBar from '../../components/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faRectangleList,
    faBoxArchive,
    faUserGroup,
    faCoins,
    faChartPie,
    faGear
} from '@fortawesome/free-solid-svg-icons';
import NavBarItem from '../../components/NavBarItem';

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

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;