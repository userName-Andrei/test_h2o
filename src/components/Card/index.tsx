import React, { FC } from 'react';
import classNames from 'classnames';

import styles from './Card.module.scss';

interface CardProps {
    type: 'dark' | 'light',
    className?: string,
    children: React.ReactNode
}

const Card: FC<CardProps> = ({type, className, children}) => {
    const classes = classNames(styles.card, className, {
        [styles.card_light]: type === 'light',
        [styles.card_dark]: type === 'dark',

    })

    return (
        <article className={classes}>
            {children}
        </article>
    );
};

export default Card;