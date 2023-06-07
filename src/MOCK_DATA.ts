import { faker } from "@faker-js/faker/locale/ru";
import { IPerson } from "./types";

function plusZero(num: number) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}

const newPerson = (): IPerson => {
    const birthdate = faker.date.birthdate({
        min: 18,
        max: 75,
        mode: "age",
    });

    return {
        id: 0,
        name: faker.person.firstName() + " " + faker.person.lastName(),
        base_id: faker.number.int(1000),
        phone: faker.phone.number("+7 (###) ###-##-##"),
        sex: faker.person.sexType(),
        birthday:
            plusZero(birthdate.getDate()) +
            "." +
            plusZero(birthdate.getMonth()) +
            "." +
            birthdate.getFullYear(),
        metro_station: faker.helpers.arrayElement([
            "Василеостровская",
            "Ладожская",
            "Московская",
            "Технологический институт",
            "Купчино",
            "Девяткино",
            "Ладожская",
        ]),
        address:
            faker.location.street() + " " + faker.location.buildingNumber(),
    };
};

export const makeData = (length = 1): IPerson[] => {
    let data: IPerson[] = [];
    let len = length;

    while (len > 0) {
        let person = newPerson();
        person.id = length - len + 1;
        data = [...data, person];
        len--;
    }

    return data;
};
