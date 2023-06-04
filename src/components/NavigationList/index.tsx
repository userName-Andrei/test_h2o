import React, { FC, useEffect, useRef } from 'react';
import NavigationItem, { ListItem } from '../NavigationItem';

import styles from './NavigationList.module.scss';
import itemsStyles from '../NavigationItem/NavigationItem.module.scss';

interface NavigationListProps {
    navlinksRef: React.RefObject<HTMLUListElement>,
    greenLineRef: React.RefObject<HTMLLIElement>,
    links: ListItem[]
}

const NavigationList: FC<NavigationListProps> = ({
    navlinksRef,
    greenLineRef,
    links
}) => {

    const requestAnimGreenLine = useRef<any>(null);

    useEffect(() => {
        requestAnimGreenLine.current = requestAnimationFrame(animateGreenLine);

        return () => cancelAnimationFrame(requestAnimGreenLine.current)
    }, [])

    const animateGreenLine = (): void => {
        const lineEl = greenLineRef.current;
        const ulLeft = navlinksRef.current?.getBoundingClientRect().left;
        let activeLinkEl: HTMLAnchorElement | undefined;
    
        navlinksRef.current?.childNodes.forEach(item => {
            let liItem = item as HTMLLIElement;

            if (!liItem.classList.contains(styles.greenLine)) {
                const linkEl: HTMLAnchorElement = liItem.firstElementChild as HTMLAnchorElement;

                if (linkEl.classList.contains(itemsStyles.active)) activeLinkEl = linkEl;
            }
        })

        if (activeLinkEl && ulLeft) {
            let offsetLeft = activeLinkEl.getBoundingClientRect().left - ulLeft;
            let offsetWidth = activeLinkEl.offsetWidth;

            lineEl!.style.width = `${offsetWidth}px`;
            lineEl!.style.left = `${offsetLeft}px`;
        }

        requestAnimGreenLine.current = requestAnimationFrame(animateGreenLine);
    }

    const renderItems = (items: ListItem[]) => items.map(listItem => (
        <NavigationItem key={listItem.href} href={listItem.href} title={listItem.title} />
    ))

    return (
        <ul ref={navlinksRef} className={styles.navlinks}>
            <li ref={greenLineRef} className={styles.greenLine}></li>
            {renderItems(links)}
        </ul>
    );
};

export default NavigationList;