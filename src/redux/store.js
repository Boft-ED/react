import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'

// передали в хранилище редакса наш слайс
export const store = configureStore({
    reducer: {
        filter,
        cart,
    },
})