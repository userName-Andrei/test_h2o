import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavBarItem.module.scss';

const navLinkClasses = (props: {
    isActive: boolean;
    isPending: boolean;
}):string | undefined => {
    const {isActive} = props;
    return isActive ? `${styles.link} ${styles.active}` : styles.link
}

interface NavBarItemProp {
    children?: React.ReactNode
    linkTo: string
}

const NavBarItem: FC<NavBarItemProp> = ({children, linkTo}) => {
    return (
        <li className={styles.navbarItem}>
            <NavLink to={linkTo} className={navLinkClasses}>
                {children}
            </NavLink>
        </li>
    );
};

export default NavBarItem;