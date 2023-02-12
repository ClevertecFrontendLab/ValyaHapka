/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';

import { Books } from '../../components/books';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { RejectModal } from '../../components/reject-modal';
import { Sidebar } from '../../components/sidebar';
import { booksSelector, fetchBooks } from '../../redux/slices/books-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const [isOpenModal, setModal] = useState(true);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => booksSelector(state));

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const fetchBook = async () => {
      dispatch(fetchBooks());
    };

    fetchBook();
  }, [dispatch]);

  return (
    <section className={styles.main_page}>
      <Header />
      <main className={styles.main_content}>
        <Sidebar />
        {status === 'loaded' ? (
          <div className={styles.main_content_wrapper}>
            <Navigation />
            <Books />
          </div>
        ) : status === 'error' && isOpenModal ? (
          <RejectModal closeModal={closeModal} />
        ) : (
          <React.Fragment />
        )}
      </main>
      <Footer />
    </section>
  );
};
