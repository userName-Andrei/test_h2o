import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPerson, TPersonKeys } from "../../types";
import { makeData } from "../../MOCK_DATA";
import { setPersonOnPage } from "../../utils/setPersonOnPage";

interface CommonBaseSliceState {
    table: IPerson[];
    perPage: number;
    page: number;
    search: string;
    editMode: boolean;
    personOnPage: IPerson[];
}

const initialState: CommonBaseSliceState = {
    table: makeData(100),
    perPage: 10,
    page: 1,
    search: "",
    editMode: false,
    personOnPage: [],
};

const commonBaseSlice = createSlice({
    name: "common_base",
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        setEditMode(state) {
            state.editMode = !state.editMode;
        },
        setPerPage(state, action: PayloadAction<number>) {
            state.perPage = action.payload;
            state.personOnPage = setPersonOnPage(
                state.table,
                state.perPage,
                state.page
            );
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
            state.personOnPage = setPersonOnPage(
                state.table,
                state.perPage,
                state.page
            );
        },
        editPersonValue(
            state,
            action: PayloadAction<{
                id: number;
                path: TPersonKeys;
                value: string | number;
            }>
        ) {
            const table = state.table;
            const { id, path, value } = action.payload;
            const person = table[id - 1];
            const editedPerson: IPerson = {
                ...person,
                [path]:
                    typeof table[id][path] === "string"
                        ? String(value)
                        : +value,
            } as IPerson;

            state.table = [
                editedPerson,
                ...state.table.filter((person) => person.id !== id),
            ];
            state.personOnPage = [
                editedPerson,
                ...state.personOnPage.filter((person) => person.id !== id),
            ];
        },
    },
});

export default commonBaseSlice.reducer;

export const { setSearch, setEditMode, editPersonValue, setPerPage, setPage } =
    commonBaseSlice.actions;
