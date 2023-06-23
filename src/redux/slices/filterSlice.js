import { createSlice } from '@reduxjs/toolkit'

// инициализировали исходное состояние
const initialState = {
    categoryId: 0,
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
        }
    },
});

export const { setCategoryId, setSort } = filterSlice.actions;

// мы вытаскиваем из обьекта actions свойство setCategoryId и делаем его константой 

export default filterSlice.reducer;
