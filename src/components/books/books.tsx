/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';

import { IBooks } from '../../interfaces/books-fetch';
import { booksSelector, filterBooks, sortBooks } from '../../redux/slices/books-slice';
import { categoriesSelector } from '../../redux/slices/category-slice';
import { viewSelector } from '../../redux/slices/view-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { BookCard } from '../book-card';

import styles from './books.module.scss';

export const Books = () => {
  const dispatch = useAppDispatch();
  const view = useAppSelector((state) => viewSelector(state));
  const { items, status, searchValue, sortTypeDesc } = useAppSelector((state) => booksSelector(state));
  const { activeCategory } = useAppSelector((state) => categoriesSelector(state));

  useEffect(() => {
    if (status === 'loaded') {
      dispatch(filterBooks(activeCategory.name));
      dispatch(sortBooks(sortTypeDesc));
    }
  }, [activeCategory.name, dispatch, status, searchValue, sortTypeDesc]);

  return (
    <section
      className={
        view && items.length > 0
          ? styles.books_bricks
          : !view && items.length > 0
          ? styles.books_list
          : styles.books_empty
      }
    >
      {items.map((book: IBooks) => (
        <BookCard {...book} key={book.id} />
      ))}
      <h2
        className={items.length > 0 ? styles.books_empty_text_none : styles.books_empty_text}
        data-test-id='search-result-not-found'
      >
        По запросу ничего не найдено
      </h2>
    </section>
  );
};
