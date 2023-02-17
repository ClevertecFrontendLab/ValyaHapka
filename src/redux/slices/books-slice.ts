/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-default-export */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { IBooks } from '../../interfaces/books-fetch';
import { BooksState, Status } from '../../interfaces/books-state';
import { RootState } from '../store';

export const fetchBooks = createAsyncThunk('books/fetchBooksStatus', async () => {
  const query = await axios.get<IBooks[]>('https://strapi.cleverland.by/api/books');

  return query.data;
});

const initialState: BooksState = {
  status: Status.EMPTY,
  items: [],
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<IBooks[]>) => {
      state.items = action.payload;
      state.status = Status.LOADED;
    });
    builder.addCase(fetchBooks.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const booksSelector = (state: RootState) => state.books;

export default booksSlice.reducer;
