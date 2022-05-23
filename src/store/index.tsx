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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;