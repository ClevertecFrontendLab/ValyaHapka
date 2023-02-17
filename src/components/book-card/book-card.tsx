/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Link } from 'react-router-dom';

import activeStar from '../../assets/img/active_star.svg';
import catIcon from '../../assets/img/cat_icon.svg';
import inactiveStar from '../../assets/img/star.svg';
import { IBooks } from '../../interfaces/books-fetch';
import { categoriesSelector } from '../../redux/slices/category-slice';
import { viewSelector } from '../../redux/slices/view-slice';
import { useAppSelector } from '../../redux/store';

import cardStyles from './book-card.module.scss';
import listViewStyles from './book-card-list.module.scss';

export const BookCard: React.FC<IBooks> = React.memo(
  ({ title, image, booking, authors, issueYear, rating, id, delivery }) => {
    const view = useAppSelector((state) => viewSelector(state));
    const { activeCategory } = useAppSelector((state) => categoriesSelector(state));

    const activeStars = [...new Array(Math.floor(rating as number))].map(() => <img src={activeStar} alt='' />);
    const inactiveStars = [...new Array(5 - Math.floor(rating as number))].map(() => <img src={inactiveStar} alt='' />);

    const path = `/books/${activeCategory.path}/${id}`;

    const img = `https://strapi.cleverland.by${image?.url}`;

    const changedTitle = (bookTitle: string) => {
      if (bookTitle.length >= 50) {
        return bookTitle.split('', 47).join('').padEnd(50, '.');
      }

      return bookTitle;
    };

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
    };

    if (view) {
      return (
        <Link to={path}>
          <div className={cardStyles.card} data-test-id='card'>
            <div className={cardStyles.card_img}>
              {image ? (
                <img src={img} alt='' className={cardStyles.card_img_bookImg} />
              ) : (
                <img src={catIcon} alt='' className={cardStyles.card_img_cat} />
              )}
            </div>

            <div className={cardStyles.card_rank} onClick={handleClick}>
              {rating ? (
                <React.Fragment>
                  <React.Fragment>{activeStars}</React.Fragment>
                  <React.Fragment>{inactiveStars}</React.Fragment>
                </React.Fragment>
              ) : (
                <span>ещё нет оценок</span>
              )}
            </div>
            <div className={cardStyles.card_info}>
              <h2>{changedTitle(title)}</h2>
              {(authors as string[]).length === 1 ? (
                <span>
                  {(authors as string[])[0]}, <span>{issueYear}</span>
                </span>
              ) : (
                <React.Fragment>
                  <span>{(authors as string[])[0]}</span>
                  <br />
                  <span>
                    {(authors as string[])[1]}, <span>{issueYear}</span>
                  </span>
                </React.Fragment>
              )}
            </div>
            <button
              type='button'
              className={
                delivery?.handed
                  ? cardStyles.card_booking_booked
                  : booking?.order && !delivery?.handed
                  ? cardStyles.card_booking_person
                  : cardStyles.card_booking
              }
              onClick={handleClick}
            >
              {delivery?.handed
                ? `Занята до ${delivery?.dateHandedTo}`
                : booking?.order && !delivery?.handed
                ? 'Забронирована'
                : 'Забронировать'}
            </button>
          </div>
        </Link>
      );
    }

    return (
      <Link to={path}>
        <div className={listViewStyles.card}>
          <div className={listViewStyles.card_img}>
            {image ? (
              <img src={img} alt='' className={listViewStyles.card_img_bookImg} />
            ) : (
              <img src={catIcon} alt='' />
            )}
          </div>
          <div className={listViewStyles.card_content}>
            <div className={listViewStyles.card_content_info}>
              <h2>{title}</h2>
              {(authors as string[]).length === 1 ? (
                <span>
                  {(authors as string[])[0]}, <span>{issueYear}</span>
                </span>
              ) : (
                <React.Fragment>
                  <span>{(authors as string[])[0]}, </span>
                  <span>
                    {(authors as string[])[1]}, <span>{issueYear}</span>
                  </span>
                </React.Fragment>
              )}
            </div>
            <div className={listViewStyles.card_content_buttons}>
              <div className={listViewStyles.card_content_buttons_rank} onClick={handleClick}>
                {rating ? (
                  <React.Fragment>
                    <React.Fragment>{activeStars}</React.Fragment>
                    <React.Fragment>{inactiveStars}</React.Fragment>
                  </React.Fragment>
                ) : (
                  <span>ещё нет оценок</span>
                )}
              </div>
              <button
                type='button'
                className={
                  delivery?.handed
                    ? listViewStyles.card_content_buttons_booking_booked
                    : booking?.order && !delivery?.handed
                    ? listViewStyles.card_content_buttons_booking_person
                    : listViewStyles.card_content_buttons_booking
                }
                onClick={handleClick}
              >
                {delivery?.handed
                  ? `Занята до ${delivery?.dateHandedTo}`
                  : booking?.order && !delivery?.handed
                  ? 'Забронирована'
                  : 'Забронировать'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }
);
