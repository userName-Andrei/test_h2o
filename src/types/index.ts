export interface IPerson {
    id: number;
    name: string;
    base_id: number;
    phone: string;
    sex: string;
    birthday: string;
    metro_station: string;
    address: string;
}

export type TPersonKeys = keyof IPerson;
