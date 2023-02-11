/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { books } from '../../assets/json/books';
import { viewSelector } from '../../redux/slices/view-slice';
import { useAppSelector } from '../../redux/store';
import { BookCard } from '../book-card';

import styles from './books.module.scss';

export const Books = () => {
  const view = useAppSelector((state) => viewSelector(state));

  return (
    <section className={view ? styles.books_bricks : styles.books_list}>
      {books.map((book) => (
        <BookCard {...book} key={book.id} />
      ))}
    </section>
  );
};
