/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Lottie from 'lottie-react';

import activeStar from '../../assets/img/active_star.svg';
import inactiveStar from '../../assets/img/star.svg';
import openSidebarImg from '../../assets/img/stroke.svg';
import Loader from '../../assets/json/loader.json';
import { BookPageContent } from '../../components/book-page-content';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { RejectModal } from '../../components/reject-modal';
import { Review } from '../../components/review';
import { FetchedBook } from '../../interfaces/books-fetch';
import { activeBookSelector, fetchBookById } from '../../redux/slices/active-book-slice';
import { categoriesSelector } from '../../redux/slices/category-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './book-page.module.scss';

export const BookPage = () => {
  const navigate = useNavigate();
  const [isOpenModal, setModal] = useState(true);
  const { bookID } = useParams();
  const [isOpenReviews, setIsOpenReviews] = useState(true);
  const dispatch = useAppDispatch();
  const { status, book } = useAppSelector((state) => activeBookSelector(state));
  const { activeCategory } = useAppSelector((state) => categoriesSelector(state));

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const fetchingData = async () => {
      dispatch(fetchBookById(bookID as string));
    };

    fetchingData();
  }, [bookID, dispatch]);

  const navigateToCategory = () => {
    navigate(`/${activeCategory.path}`);
  };

  return (
    <section className={styles.book}>
      <Header />
      <main>
        <div className={styles.book_pathline}>
          <div className={styles.book_pathline_block}>
            <span
              className={styles.book_pathline_category}
              onClick={navigateToCategory}
              data-test-id='breadcrumbs-link'
            >
              {activeCategory.name}
            </span>
            /<span data-test-id='book-name'> {book.title}</span>
          </div>
        </div>
        <div className={status === 'loaded' ? styles.loaded_data : styles.unloaded_data}>
          <main>
            <BookPageContent book={book as FetchedBook} />
            <div className={styles.book_data}>
              <div className={styles.book_data_rank}>
                <h5>??????????????</h5>
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
                  <span>?????? ?????? ????????????</span>
                )}
              </div>
              <div className={styles.book_data_info}>
                <h5>?????????????????? ????????????????????</h5>
                <hr />
                <div className={styles.book_data_info_columns}>
                  <ul className={styles.book_data_info_columns_group1}>
                    <li>
                      <span>????????????????????????</span>
                      <p>{book.publish}</p>
                    </li>
                    <li>
                      <span>?????? ??????????????</span>
                      <p>{book.issueYear}</p>
                    </li>
                    <li>
                      <span>??????????????</span>
                      <p>{book.pages}</p>
                    </li>
                    <li>
                      <span>????????????????</span>
                      <p>{book.cover}</p>
                    </li>
                    <li>
                      <span>????????????</span>
                      <p>{book.format}</p>
                    </li>
                  </ul>
                  <ul className={styles.book_data_info_columns_group2}>
                    <li>
                      <span>????????</span>
                      {status === 'loaded' && <p>{(book.categories as string[])[0]}</p>}
                    </li>
                    <li>
                      <span>??????</span>
                      <p>{`${book.weight} ??`}</p>
                    </li>
                    <li>
                      <span>ISBN</span>
                      <p>{book.ISBN}</p>
                    </li>
                    <li>
                      <span>????????????????????????</span>
                      <p>{book.producer}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.book_data_reviews}>
                <div className={styles.book_data_reviews_title}>
                  <h5>????????????</h5>
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
                      ?????????????? ??????????
                    </button>
                  </React.Fragment>
                ) : (
                  <button type='button' data-test-id='button-rating'>
                    ?????????????? ??????????
                  </button>
                )}
              </div>
            </div>
          </main>
        </div>
        <div
          className={status === 'error' && isOpenModal ? styles.rejected_data : styles.unloaded_data}
          data-test-id='error'
        >
          <RejectModal closeModal={closeModal} data-test-id='error' />
        </div>

        <div className={status === 'loading' ? styles.loading_data : styles.unloaded_data} data-test-id='loader'>
          <div className={styles.loading_data_blur} />
          <Lottie animationData={Loader} />
        </div>
      </main>

      <Footer />
    </section>
  );
};
