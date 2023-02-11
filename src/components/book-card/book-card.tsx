/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Link } from 'react-router-dom';

import activeStar from '../../assets/img/active_star.svg';
import catIcon from '../../assets/img/cat_icon.svg';
import inactiveStar from '../../assets/img/star.svg';
import { FullBook } from '../../interfaces/full-book';
import { viewSelector } from '../../redux/slices/view-slice';
import { useAppSelector } from '../../redux/store';

import cardStyles from './book-card.module.scss';
import listViewStyles from './book-card-list.module.scss';

export const BookCard: React.FC<FullBook> = React.memo(({ name, img, booking, author, year, rank, id }) => {
  const view = useAppSelector((state) => viewSelector(state));

  const activeStars = [...new Array(rank)].map(() => <img src={activeStar} alt='' />);
  const inactiveStars = [...new Array(5 - (rank as number))].map(() => <img src={inactiveStar} alt='' />);

  const path = `/books/${id}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  if (view) {
    return (
      <Link to={path}>
        <div className={cardStyles.card} data-test-id='card'>
          <div className={cardStyles.card_img}>
            {img ? (
              <img src={img[0]} alt={name} />
            ) : (
              <img src={catIcon} alt={name} className={cardStyles.card_img_cat} />
            )}
          </div>

          <div className={cardStyles.card_rank} onClick={handleClick}>
            {rank ? (
              <React.Fragment>
                <React.Fragment>{activeStars}</React.Fragment>
                <React.Fragment>{inactiveStars}</React.Fragment>
              </React.Fragment>
            ) : (
              <span>ещё нет оценок</span>
            )}
          </div>
          <div className={cardStyles.card_info}>
            <h2>{name}</h2>
            {author.length === 1 ? (
              <span>
                {author[0]}, <span>{year}</span>
              </span>
            ) : (
              <React.Fragment>
                <span>{author[0]}</span>
                <br />
                <span>
                  {author[1]}, <span>{year}</span>
                </span>
              </React.Fragment>
            )}
          </div>
          <button
            type='button'
            className={
              booking.status && booking.date
                ? cardStyles.card_booking_booked
                : booking.status
                ? cardStyles.card_booking_person
                : cardStyles.card_booking
            }
            onClick={handleClick}
          >
            {booking.status && booking.date
              ? `Занята до ${booking.date}`
              : booking.status
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
          {img ? <img src={img[0]} alt={name} /> : <img src={catIcon} alt={name} />}
        </div>
        <div className={listViewStyles.card_content}>
          <div className={listViewStyles.card_content_info}>
            <h2>{name}</h2>
            {author.length === 1 ? (
              <span>
                {author[0]}, <span>{year}</span>
              </span>
            ) : (
              <React.Fragment>
                <span>{author[0]}, </span>
                <span>
                  {author[1]}, <span>{year}</span>
                </span>
              </React.Fragment>
            )}
          </div>
          <div className={listViewStyles.card_content_buttons}>
            <div className={listViewStyles.card_content_buttons_rank} onClick={handleClick}>
              {rank ? (
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
                booking.status && booking.date
                  ? listViewStyles.card_content_buttons_booking_booked
                  : booking.status
                  ? listViewStyles.card_content_buttons_booking_person
                  : listViewStyles.card_content_buttons_booking
              }
              onClick={handleClick}
            >
              {booking.status && booking.date
                ? `Занята до ${booking.date}`
                : booking.status
                ? 'Забронирована'
                : 'Забронировать'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
});
