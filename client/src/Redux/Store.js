import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './uiSlice'
import userReducer from './userSlice'

export const store = configureStore({
                                        reducer: {
                                            uiSlice : uiReducer,
                                            userSlice : userReducer
                                        },
                                    })