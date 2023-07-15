import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzasSlice';

// передали в хранилище редакса наш слайс
export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
    },
})