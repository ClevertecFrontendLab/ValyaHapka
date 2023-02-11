/* eslint-disable react/jsx-no-useless-fragment */

import React, { useCallback, useEffect, useState } from 'react';

import catIcon from '../../assets/img/cat_icon.svg';
import { FullBook } from '../../interfaces/full-book';
import { Slider } from '../slider-desktop';
import { SliderTablet } from '../slider-tablet';

import styles from './book-page-content.module.scss';

interface BookPageContentProps {
  book: FullBook;
}

export const BookPageContent: React.FC<BookPageContentProps> = ({ book }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [activeImg, setActiveImg] = useState<string>();

  const onChangeWidth = useCallback(() => setWidth(window.innerWidth), []);

  useEffect(() => {
    window.addEventListener('resize', onChangeWidth);
    if (book.img) {
      setActiveImg(book.img[0]);
    }

    return () => {
      window.removeEventListener('resize', onChangeWidth);
    };
  }, [book.img, onChangeWidth, width]);

  return (
    <React.Fragment>
      {width >= 957 ? (
        <div className={styles.book_wrapper}>
          <div className={styles.book_wrapper_content}>
            {book.img ? (
              <div className={styles.book_wrapper_content_images}>
                {book.img.length > 1 ? (
                  <Slider imgs={book.img} setImg={setActiveImg} activeImg={activeImg} />
                ) : (
                  <div className={styles.book_wrapper_content_images_img}>
                    <img
                      src={activeImg}
                      alt={book.name}
                      className={styles.book_wrapper_content_images_img_bookImg}
                      data-test-id='slide-big'
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.book_wrapper_content_images}>
                <div className={styles.book_wrapper_content_images_img}>
                  <img src={catIcon} alt={book.name} className={styles.book_wrapper_content_images_img_cat} />
                </div>
              </div>
            )}

            <div className={styles.book_wrapper_content_subinfo}>
              <h1>{book.name}</h1>
              <div className={styles.book_wrapper_content_subinfo_author}>
                {book.author.length === 1 ? (
                  <span>
                    {book.author[0]}, <span> {book.year}</span>
                  </span>
                ) : (
                  <React.Fragment>
                    <span>{book.author[0]},</span>{' '}
                    <span>
                      {book.author[1]}, <span> {book.year}</span>
                    </span>
                  </React.Fragment>
                )}
              </div>

              <button
                type='button'
                className={
                  book.booking.status && book.booking.date
                    ? styles.book_wrapper_content_subinfo_booking_booked
                    : book.booking.status
                    ? styles.book_wrapper_content_subinfo_booking_person
                    : styles.book_wrapper_content_subinfo_booking
                }
              >
                {book.booking.status && book.booking.date
                  ? `Занята до ${book.booking.date}`
                  : book.booking.status
                  ? 'Забронирована'
                  : 'Забронировать'}
              </button>

              <div className={styles.book_wrapper_content_subinfo_about}>
                <h5>О книге</h5>
                <p>
                  Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были
                  кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального
                  Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на
                  это свое время? Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это
                  просто. А грокать алгоритмы — это веселое и увлекательное занятие.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.book_wrapper}>
          <div className={styles.book_wrapper_content}>
            {book.img ? (
              <SliderTablet imgs={book.img} setImg={setActiveImg} />
            ) : (
              <div className={styles.book_wrapper_content_img}>
                <img src={catIcon} alt={book.name} className={styles.book_wrapper_content_img_cat} />
              </div>
            )}

            <div className={styles.book_wrapper_content_subinfo}>
              <h1>{book.name}</h1>
              <div className={styles.book_wrapper_content_subinfo_author}>
                {book.author.length === 1 ? (
                  <span>
                    {book.author[0]}, <span> {book.year}</span>
                  </span>
                ) : (
                  <React.Fragment>
                    <span>{book.author[0]},</span>{' '}
                    <span>
                      {book.author[1]}, <span> {book.year}</span>
                    </span>
                  </React.Fragment>
                )}
              </div>

              <button
                type='button'
                className={
                  book.booking.status && book.booking.date
                    ? styles.book_wrapper_content_subinfo_booking_booked
                    : book.booking.status
                    ? styles.book_wrapper_content_subinfo_booking_person
                    : styles.book_wrapper_content_subinfo_booking
                }
              >
                {book.booking.status && book.booking.date
                  ? `Занята до ${book.booking.date}`
                  : book.booking.status
                  ? 'Забронирована'
                  : 'Забронировать'}
              </button>
            </div>
          </div>
          <div className={styles.book_wrapper_content_subinfo_about}>
            <h5>О книге</h5>
            <p>
              Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
              решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
              изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
              время? Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А
              грокать алгоритмы — это веселое и увлекательное занятие.
            </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
