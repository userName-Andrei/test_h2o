import React, { FC, MouseEvent } from 'react';

import styles from './NavigationBtn.module.scss';

interface NavigationBtnProps {
    direction: 'left' | 'right',
    children: React.ReactNode,
    navlinksRef: React.RefObject<HTMLUListElement>
}

const NavigationBtn: FC<NavigationBtnProps> = ({children, navlinksRef, direction}) => {

    const onClickBtns = (e: MouseEvent<HTMLButtonElement>, offset: number = 200) => {
        const ulWidth = navlinksRef.current?.scrollWidth || 0;
        const ulParentWidth = navlinksRef.current?.parentElement?.offsetWidth || 0;
        let transformProp = navlinksRef.current ? parseInt(navlinksRef.current.style.transform ? 
                            navlinksRef.current.style.transform.replaceAll(/translateX\(/g, '') : 
                            '0') : 0;

        if (navlinksRef.current) {

            if ('left' === direction) {
                if (transformProp + offset > 0) {
                    transformProp += 0 - transformProp;
                } else {
                    transformProp += offset;
                }

                navlinksRef.current.style.transform = `translateX(${transformProp}px)`;
            } else {
                const maxOffset = ulParentWidth - ulWidth;

                if (transformProp - offset < maxOffset) {
                    transformProp += maxOffset - transformProp;
                } else {
                    transformProp -= offset;
                }

                navlinksRef.current.style.transform = `translateX(${transformProp}px)`;
            }
        }
    }

    return (
        <button 
            className={styles.btn} 
            onClick={onClickBtns}
        >
            {children}
        </button>
    );
};

export default NavigationBtn;