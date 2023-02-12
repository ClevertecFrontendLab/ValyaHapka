/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { IBooks } from '../../interfaces/books-fetch';
import { booksSelector } from '../../redux/slices/books-slice';
import { viewSelector } from '../../redux/slices/view-slice';
import { useAppSelector } from '../../redux/store';
import { BookCard } from '../book-card';

import styles from './books.module.scss';

export const Books = () => {
  const view = useAppSelector((state) => viewSelector(state));
  const { items } = useAppSelector((state) => booksSelector(state));

  return (
    <section className={view ? styles.books_bricks : styles.books_list}>
      {items.map((book: IBooks) => (
        <BookCard {...book} key={book.id} />
      ))}
    </section>
  );
};
