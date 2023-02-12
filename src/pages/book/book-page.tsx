/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import activeStar from '../../assets/img/active_star.svg';
import inactiveStar from '../../assets/img/star.svg';
import openSidebarImg from '../../assets/img/stroke.svg';
import { BookPageContent } from '../../components/book-page-content';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { RejectModal } from '../../components/reject-modal';
import { Review } from '../../components/review';
import { FetchedBook } from '../../interfaces/books-fetch';
import { activeBookSelector, fetchBookById } from '../../redux/slices/active-book-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './book-page.module.scss';

export const BookPage = () => {
  const [isOpenModal, setModal] = useState(true);
  const { bookID } = useParams();
  const [isOpenReviews, setIsOpenReviews] = useState(true);
  const dispatch = useAppDispatch();
  const { status, book } = useAppSelector((state) => activeBookSelector(state));

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const fetchingData = async () => {
      dispatch(fetchBookById(bookID as string));
    };

    fetchingData();
  }, [bookID, dispatch]);

  return (
    <section className={status === 'loaded' ? styles.book : styles.book_loading}>
      <Header />
      <div>
        {status === 'loaded' ? (
          <React.Fragment>
            <div className={styles.book_pathline}>
              <div className={styles.book_pathline_block}>
                <span>{`Бизнес книги / ${book.title}`}</span>
              </div>
            </div>
            <main>
              <BookPageContent book={book as FetchedBook} />
              <div className={styles.book_data}>
                <div className={styles.book_data_rank}>
                  <h5>Рейтинг</h5>
                  <hr />
                  {book.rating ? (
                    <div className={styles.book_data_rank_stars}>
                      {[...new Array(Math.floor(book.rating as number))].map(() => (
                        <img src={activeStar} alt='' />
                      ))}
                      {[...new Array(5 - Math.floor(book.rating as number))].map(() => (
                        <img src={inactiveStar} alt='' />
                      ))}
                      <span>{book.rating}</span>
                    </div>
                  ) : (
                    <span>ещё нет оценок</span>
                  )}
                </div>
                <div className={styles.book_data_info}>
                  <h5>Подробная информация</h5>
                  <hr />
                  <div className={styles.book_data_info_columns}>
                    <ul className={styles.book_data_info_columns_group1}>
                      <li>
                        <span>Издательство</span>
                        <p>{book.publish}</p>
                      </li>
                      <li>
                        <span>Год издания</span>
                        <p>{book.issueYear}</p>
                      </li>
                      <li>
                        <span>Страниц</span>
                        <p>{book.pages}</p>
                      </li>
                      <li>
                        <span>Переплёт</span>
                        <p>{book.cover}</p>
                      </li>
                      <li>
                        <span>Формат</span>
                        <p>{book.format}</p>
                      </li>
                    </ul>
                    <ul className={styles.book_data_info_columns_group2}>
                      <li>
                        <span>Жанр</span>
                        <p>Компьютерная литература</p>
                      </li>
                      <li>
                        <span>Вес</span>
                        <p>{`${book.weight} г`}</p>
                      </li>
                      <li>
                        <span>ISBN</span>
                        <p>{book.ISBN}</p>
                      </li>
                      <li>
                        <span>Изготовитель</span>
                        <p>{book.producer}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.book_data_reviews}>
                  <div className={styles.book_data_reviews_title}>
                    <h5>Отзывы</h5>
                    {book.comments && (
                      <img
                        data-test-id='button-hide-reviews'
                        src={openSidebarImg}
                        alt=''
                        className={isOpenReviews ? styles.book_data_reviews_title_open : ''}
                        onClick={() => setIsOpenReviews(!isOpenReviews)}
                      />
                    )}
                  </div>

                  {book.comments && isOpenReviews ? (
                    <React.Fragment>
                      <hr />
                      {book.comments.map((comm) => (
                        <Review comment={comm} />
                      ))}
                      <button type='button' data-test-id='button-rating'>
                        Оценить книгу
                      </button>
                    </React.Fragment>
                  ) : (
                    <button type='button' data-test-id='button-rating'>
                      Оценить книгу
                    </button>
                  )}
                </div>
              </div>
            </main>
          </React.Fragment>
        ) : status === 'error' && isOpenModal ? (
          <RejectModal closeModal={closeModal} />
        ) : (
          <React.Fragment />
        )}
      </div>

      <Footer />
    </section>
  );
};
