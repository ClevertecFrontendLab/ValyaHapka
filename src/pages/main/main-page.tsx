import React from 'react';

import { Books } from '../../components/books';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Sidebar } from '../../components/sidebar';

import styles from './main-page.module.scss';

export const MainPage = () => (
  <section className={styles.main_page}>
    <Header />
    <section className={styles.main_content}>
      <Sidebar />
      <div className={styles.main_content_wrapper}>
        <Navigation />
        <Books />
      </div>
    </section>
    <Footer />
  </section>
);
