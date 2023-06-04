import React, { FC } from 'react';
import UserPhoto from '../../assets/images/account/account-user-photo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import styles from './Account.module.scss';

const Account: FC = () => {
    return (
        <div className={styles.account}>
            <div className={styles.photo}>
                <img src={UserPhoto} alt="account-user" />
            </div>
            <div className={styles.description}>
                <p className={styles.title}>Kristina 🐰</p>
                <p className={styles.subtitle}>менеджер продаж</p>
            </div>
            <button className={styles.arrow_bottom}>
                <FontAwesomeIcon icon={faSortDown} />
            </button>
        </div>
    );
};

export default Account;