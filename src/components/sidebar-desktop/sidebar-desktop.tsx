/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import openSidebarImg from '../../assets/img/stroke.svg';
import categories from '../../assets/json/categories.json';
import { SidebarProps } from '../../interfaces/sidebar-props';
import { categorySelector, changeCategory } from '../../redux/slices/category-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './sidebar-desktop.module.scss';

export const SidebarDesktop: React.FC<SidebarProps> = ({ toggleCategories, isOpenCategories, pathnameValidation }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const reduxCategory = useAppSelector((state) => categorySelector(state));

  const changeReduxCategory = (e: React.MouseEvent) => {
    dispatch(changeCategory((e.target as HTMLDivElement).outerText));
  };

  return (
    <aside className={isOpenCategories ? styles.sidebar_active : styles.sidebar}>
      <div className={styles.sidebar_title} data-test-id='navigation-showcase' onClick={toggleCategories}>
        <h3
          className={
            pathnameValidation() || location.pathname === '/'
              ? styles.sidebar_title_text_active
              : styles.sidebar_title_text
          }
        >
          Витрина книг
        </h3>

        <img src={openSidebarImg} alt='' className={isOpenCategories ? styles.sidebar_title_open : ''} />
      </div>

      <ul className={isOpenCategories ? styles.sidebar_list : styles.sidebar_list_hide}>
        <NavLink to='/allBooks' data-test-id='navigation-books'>
          <h5
            className={
              reduxCategory === 'Все книги' && (pathnameValidation() || location.pathname === '/')
                ? styles.sidebar_list_name_active
                : styles.sidebar_list_name
            }
            onClick={changeReduxCategory}
          >
            Все книги
          </h5>
        </NavLink>
        {categories.slice(1).map((c) => (
          <li key={c.name} onClick={changeReduxCategory}>
            <NavLink to={`/${c.route}`}>
              <h5
                className={
                  reduxCategory === `${c.name}${c.value}` && pathnameValidation()
                    ? styles.sidebar_list_name_active
                    : styles.sidebar_list_name
                }
              >
                {c.name}
                <span>{c.value}</span>
              </h5>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styles.sidebar_rules}>
        <Link to='/rules'>
          <h2
            className={location.pathname === '/rules' ? styles.sidebar_rules_text_active : styles.sidebar_rules_text}
            data-test-id='navigation-terms'
          >
            Правила пользования
          </h2>
        </Link>

        <Link to='/offer'>
          <h2
            className={location.pathname === '/offer' ? styles.sidebar_rules_text_active : styles.sidebar_rules_text}
            data-test-id='navigation-contract'
          >
            Договор оферты
          </h2>
        </Link>
      </div>
      <div className={styles.sidebar_profile}>
        <h2>Профиль</h2>
        <h2>Выход</h2>
      </div>
    </aside>
  );
};
