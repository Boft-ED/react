import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'

// передали в хранилище редакса наш слайс
export const store = configureStore({
    reducer: {
        filter,
    },
})