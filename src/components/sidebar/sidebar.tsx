/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable complexity */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { categoriesSelector, changeCategory } from '../../redux/slices/category-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { SidebarDesktop } from '../sidebar-desktop';
import { SidebarTablet } from '../sidebar-tablet';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => categoriesSelector(state));
  const location = useLocation();
  const [isOpenCategories, setIsOpenCategories] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const onChangeWidth = useCallback(() => setWidth(window.innerWidth), []);

  const changeReduxCategory = (e: React.MouseEvent, p: string) => {
    const category = {
      name: (e.target as HTMLDivElement).outerText,
      path: p,
    };

    dispatch(changeCategory(category));
  };

  const pathnameValidation = useCallback(
    () => categories.some((c) => location.pathname === `/${c.path}` || location.pathname === '/all'),
    [categories, location.pathname]
  );

  const toggleCategories = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsOpenCategories(!isOpenCategories);
  };

  useEffect(() => {
    if (pathnameValidation()) {
      setIsOpenCategories(false);
    }
  }, [location.pathname, pathnameValidation]);

  useEffect(() => {
    window.addEventListener('resize', onChangeWidth);

    return () => {
      window.removeEventListener('resize', onChangeWidth);
    };
  }, [onChangeWidth]);

  useEffect(() => {
    function findNameByPath() {
      const foundCategory = categories.find((c) => `/${c.path}` === location.pathname);

      if (foundCategory !== undefined) {
        return foundCategory.name;
      }

      return 'Все книги';
    }

    const category = {
      name: findNameByPath(),
      path: location.pathname.slice(1),
    };

    dispatch(changeCategory(category));
  }, [categories, dispatch, location.pathname]);

  return (
    <React.Fragment>
      {width >= 1240 ? (
        <SidebarDesktop
          toggleCategories={toggleCategories}
          isOpenCategories={isOpenCategories}
          pathnameValidation={pathnameValidation}
          categories={categories}
          changeReduxCategory={changeReduxCategory}
        />
      ) : (
        <SidebarTablet
          toggleCategories={toggleCategories}
          isOpenCategories={isOpenCategories}
          pathnameValidation={pathnameValidation}
          categories={categories}
          changeReduxCategory={changeReduxCategory}
        />
      )}
    </React.Fragment>
  );
};
