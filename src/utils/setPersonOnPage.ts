import { IPerson } from "../types";

export const setPersonOnPage = (
    table: IPerson[],
    perPage: number,
    page: number
): IPerson[] => {
    let arr: IPerson[] = [];

    for (let i = (page - 1) * perPage; i < page * perPage; i++) {
        if (table[i]) {
            arr.push(table[i]);
        }
    }

    return arr;
};
