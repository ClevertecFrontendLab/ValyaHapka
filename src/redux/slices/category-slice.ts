/* eslint-disable no-param-reassign */
/* eslint-disable import/no-default-export */
import { createSlice } from '@reduxjs/toolkit';

import { CategoryState } from '../../interfaces/category-state';
import { RootState } from '../store';

const initialState: CategoryState = {
  activeCategory: 'Все книги',
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { changeCategory } = categorySlice.actions;
export const categorySelector = (state: RootState) => state.category.activeCategory;

export default categorySlice.reducer;
