import { createSlice } from '@reduxjs/toolkit'

// инициализировали исходное состояние
const initialState = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'raiting'
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // action.payload передает то, что придет в аргумент
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
        }
    },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;

// мы вытаскиваем из обьекта actions свойство setCategoryId и делаем его константой 

export default filterSlice.reducer;

