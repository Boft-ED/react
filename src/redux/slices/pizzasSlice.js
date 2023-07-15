import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPizzas = createAsyncThunk('pizza/getPizzasStatus', async ({ params }) => {
    const { sortBy,
        order,
        category,
        search,
        currentPage } = params;
    const { data } = await axios.get(
        `https://64920b3c2f2c7ee6c2c9570b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
}
);

// инициализировали исходное состояние
const initialState = {
    items: [],
    status: 'loading',
}

const pizzaSLice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [getPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [getPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [getPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        },
    }
});

export const { setItems } = pizzaSLice.actions;

// мы вытаскиваем из обьекта actions свойство setCategoryId и делаем его константой 

export default pizzaSLice.reducer;

