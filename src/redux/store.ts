/* eslint-disable import/no-extraneous-dependencies */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './slices/category-slice';
import viewReducer from './slices/view-slice';

export const store = configureStore({
  reducer: { view: viewReducer, category: categoryReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
