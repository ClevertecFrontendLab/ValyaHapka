/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable complexity */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import categories from '../../assets/json/categories.json';
import { burgerSelector } from '../../redux/slices/view-slice';
import { useAppSelector } from '../../redux/store';
import { SidebarDesktop } from '../sidebar-desktop';
import { SidebarTablet } from '../sidebar-tablet';

export const Sidebar = () => {
  const isBurger = useAppSelector((state) => burgerSelector(state));
  const location = useLocation();
  const [isOpenCategories, setIsOpenCategories] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const onChangeWidth = useCallback(() => setWidth(window.innerWidth), []);

  const pathnameValidation = useCallback(() => categories.some((c) => location.pathname === `/${c.route}`), [location]);

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
    if (isBurger) {
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflowY = 'hidden';

      document.body.style.height = '100%';
      document.documentElement.style.height = '100%';
    } else {
      document.body.style.overflowY = 'auto';
      document.documentElement.style.overflowY = 'auto';

      document.body.style.height = 'auto';
      document.documentElement.style.height = 'auto';
    }
  }, [isBurger]);

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
        />
      ) : (
        <SidebarTablet
          toggleCategories={toggleCategories}
          isOpenCategories={isOpenCategories}
          pathnameValidation={pathnameValidation}
        />
      )}
    </React.Fragment>
  );
};