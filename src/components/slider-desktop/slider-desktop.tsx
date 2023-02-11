/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import { FreeMode, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import { SwiperProps } from '../../interfaces/swiper-props';

import styles from './slider-desktop.module.scss';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

export const Slider: React.FC<SwiperProps> = React.memo(({ imgs, setImg, activeImg }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  return (
    <div className={styles.container}>
      <Swiper
        spaceBetween={10}
        watchSlidesProgress={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Thumbs]}
        className={styles.container_myswiper}
        data-test-id='slide-big'
      >
        {(imgs as string[]).map((img) => (
          <SwiperSlide className={styles.container_myswiper_slide}>
            <img src={img} alt='' className={styles.container_myswiper_bookImg} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        scrollbar={{ hide: true }}
        spaceBetween={30}
        slidesPerView={(imgs?.length as number) <= 5 ? imgs?.length : 5}
        watchSlidesProgress={true}
        freeMode={true}
        modules={[FreeMode, Thumbs, Scrollbar]}
        className={styles.container_myswiper}
      >
        {(imgs as string[]).map((img) => (
          <SwiperSlide className={styles.container_myswiper_slide} data-test-id='slide-mini'>
            <img src={img} alt='' className={styles.container_myswiper_slide_img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});