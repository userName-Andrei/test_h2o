import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../../assets/images/svg/Logo.svg';

import styles from './NavBar.module.scss';

interface NavBarProps {
    children?: React.ReactNode
}

const NavBar: FC<NavBarProps> = ({children}) => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to={'/'}>
                    <img src={LogoImg} alt="logo" />
                </Link>
            </div>
            <ul className={styles.navbarList}>
                {children}
            </ul>
        </nav>
    );
};

export default NavBar;