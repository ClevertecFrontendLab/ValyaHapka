/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import activeStar from '../../assets/img/active_star.svg';
import avatar from '../../assets/img/goku.png';
import inactiveStar from '../../assets/img/star.svg';
import openSidebarImg from '../../assets/img/stroke.svg';
import { bookTemplate } from '../../assets/json/book-template';
import { books } from '../../assets/json/books';
import { BookPageContent } from '../../components/book-page-content';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { FullBook } from '../../interfaces/full-book';

import styles from './book-page.module.scss';

export const BookPage = () => {
  const { bookID } = useParams();
  const [book, setBook] = useState<FullBook>(bookTemplate);
  const [isOpenReviews, setIsOpenReviews] = useState(true);

  const activeStars = [...new Array(book.rank)].map(() => <img src={activeStar} alt='' />);
  const inactiveStars = [...new Array(5 - (book.rank as number))].map(() => <img src={inactiveStar} alt='' />);

  const foundedBookById = useMemo(() => books.find((b: FullBook) => +(bookID as string) === b.id), [bookID]);

  useEffect(() => {
    setBook(foundedBookById as FullBook);
  }, [foundedBookById, book, bookID]);

  return (
    <section className={styles.book}>
      <Header />
      <div className={styles.book_pathline}>
        <div className={styles.book_pathline_block}>
          <span>{`Бизнес книги / ${book.name}`}</span>
        </div>
      </div>
      <main>
        <BookPageContent book={book} />
        <div className={styles.book_data}>
          <div className={styles.book_data_rank}>
            <h5>Рейтинг</h5>
            <hr />
            {book.rank ? (
              <div className={styles.book_data_rank_stars}>
                {activeStars}
                {inactiveStars}
                <span>{book.rank}</span>
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
                  <p>Питер</p>
                </li>
                <li>
                  <span>Год издания</span>
                  <p>2019</p>
                </li>
                <li>
                  <span>Страниц</span>
                  <p>288</p>
                </li>
                <li>
                  <span>Переплёт</span>
                  <p>Мягкая обложка</p>
                </li>
                <li>
                  <span>Формат</span>
                  <p>70x100</p>
                </li>
              </ul>
              <ul className={styles.book_data_info_columns_group2}>
                <li>
                  <span>Жанр</span>
                  <p>Компьютерная литература</p>
                </li>
                <li>
                  <span>Вес</span>
                  <p>370 г</p>
                </li>
                <li>
                  <span>ISBN</span>
                  <p>978-5-4461-0923-4</p>
                </li>
                <li>
                  <span>Изготовитель</span>
                  <p>ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29</p>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.book_data_reviews}>
            <div className={styles.book_data_reviews_title}>
              <h5>Отзывы</h5>
              {book.rank && (
                <img
                  data-test-id='button-hide-reviews'
                  src={openSidebarImg}
                  alt=''
                  className={isOpenReviews ? styles.book_data_reviews_title_open : ''}
                  onClick={() => setIsOpenReviews(!isOpenReviews)}
                />
              )}
            </div>

            {book.rank && isOpenReviews ? (
              <React.Fragment>
                <hr />
                <ul className={styles.book_data_reviews_block}>
                  <li className={styles.book_data_reviews_block_feedback}>
                    <div className={styles.book_data_reviews_block_feedback_person}>
                      <img src={avatar} alt='' />
                      <div className={styles.book_data_reviews_block_feedback_person_text}>
                        <span>Валентин Хапка</span>
                        <span>20 июня 2018</span>
                      </div>
                    </div>
                    {book.rank && (
                      <div className={styles.book_data_rank_stars}>
                        {activeStars}
                        {inactiveStars}
                      </div>
                    )}
                  </li>
                  <li className={styles.book_data_reviews_block_feedback}>
                    <div className={styles.book_data_reviews_block_feedback_person}>
                      <img src={avatar} alt='' />
                      <div className={styles.book_data_reviews_block_feedback_person_text}>
                        <span>Валентин Хапка</span>
                        <span>20 июня 2018</span>
                      </div>
                    </div>
                    {book.rank && (
                      <div className={styles.book_data_rank_stars}>
                        {activeStars}
                        {inactiveStars}
                      </div>
                    )}
                    <p>
                      Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не
                      оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение
                      современных методик предоставляет широкие возможности для позиций, занимаемых участниками в
                      отношении поставленных задач. Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики
                      выводы будут в равной степени предоставлены сами себе. Вот вам яркий пример современных тенденций
                      — глубокий уровень погружения создаёт предпосылки для своевременного выполнения сверхзадачи. И нет
                      сомнений, что акционеры крупнейших компаний, инициированные исключительно синтетически, превращены
                      в посмешище, хотя само их существование приносит несомненную пользу обществу.
                    </p>
                  </li>
                  <li className={styles.book_data_reviews_block_feedback}>
                    <div className={styles.book_data_reviews_block_feedback_person}>
                      <img src={avatar} alt='' />
                      <div className={styles.book_data_reviews_block_feedback_person_text}>
                        <span>Валентин Хапка</span>
                        <span>20 июня 2018</span>
                      </div>
                    </div>
                    {book.rank && (
                      <div className={styles.book_data_rank_stars}>
                        {activeStars}
                        {inactiveStars}
                      </div>
                    )}
                  </li>
                </ul>
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

      <Footer />
    </section>
  );
};
