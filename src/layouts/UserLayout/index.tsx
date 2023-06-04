import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Card from '../../components/Card';
import Navigation from '../../components/Navigation';
import Account from '../../components/Account';

import styles from './UserLayout.module.scss';

const UserLayout: FC = () => {

    return (
        <Card type='light'>
            <article className={styles.top}>
                <Navigation className={styles.navigation} />
                <Account />
            </article>

            <Outlet />
        </Card>
    );
};

export default UserLayout;