/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable complexity */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { categoriesSelector } from '../../redux/slices/category-slice';
import { useAppSelector } from '../../redux/store';
import { SidebarDesktop } from '../sidebar-desktop';
import { SidebarTablet } from '../sidebar-tablet';

export const Sidebar = () => {
  const { categories } = useAppSelector((state) => categoriesSelector(state));
  const location = useLocation();
  const [isOpenCategories, setIsOpenCategories] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const onChangeWidth = useCallback(() => setWidth(window.innerWidth), []);

  const pathnameValidation = useCallback(
    () => categories.some((c) => location.pathname === `/${c.path}`),
    [categories, location.pathname]
  );

  const toggleCategories = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsOpenCategories(!isOpenCategories);
  };

  useEffect(() => {
    if (pathnameValidation() || location.pathname !== '/') {
      setIsOpenCategories(false);
    }
  }, [location.pathname, pathnameValidation]);

  useEffect(() => {
    window.addEventListener('resize', onChangeWidth);

    return () => {
      window.removeEventListener('resize', onChangeWidth);
    };
  }, [onChangeWidth]);

  return (
    <React.Fragment>
      {width >= 1240 ? (
        <SidebarDesktop
          toggleCategories={toggleCategories}
          isOpenCategories={isOpenCategories}
          pathnameValidation={pathnameValidation}
          categories={categories}
        />
      ) : (
        <SidebarTablet
          toggleCategories={toggleCategories}
          isOpenCategories={isOpenCategories}
          pathnameValidation={pathnameValidation}
          categories={categories}
        />
      )}
    </React.Fragment>
  );
};
