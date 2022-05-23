import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector as rawUseSelector, } from 'react-redux';
import searchReducer from './searchSlice';
// ...

export const store = configureStore({
  reducer: {
    searchReducer
  },
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;