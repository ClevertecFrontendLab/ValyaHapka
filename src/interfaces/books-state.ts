import { IBooks } from './books-fetch';

export enum Status {
  EMPTY = '',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

export interface BooksState {
  status: Status;
  items: IBooks[];
}
