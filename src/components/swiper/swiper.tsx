import  { FC, useState } from 'react';
import SwiperCore, { A11y, Controller, FreeMode, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import { Url } from '../../models/constants';
import { BookId } from '../../models/interfaces';

import './styles.css';

import 'swiper/css/scrollbar';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

type ImageState = 'loading' | 'loaded' | 'error';

SwiperCore.use([Navigation, Pagination, A11y, Controller, Scrollbar]);

export const Slider:FC<{ book: BookId}> = ({ book }) =>{
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const [imageStates, setImageStates] = useState<ImageState[]>([]);
  const handleImageLoad = (index: number) => {
    const newImageStates = [...imageStates];
    
    newImageStates[index] = 'loaded';
    setImageStates(newImageStates);
  };
  const handleImageError = (index: number) => {
    const newImageStates = [...imageStates];

    newImageStates[index] = 'error';
    setImageStates(newImageStates);
  };

  return (
    <div className="container1">
        <Swiper
          tag="section"
          pagination={{ clickable: true }}
          initialSlide={0}
          centeredSlides={true}
          data-test-id='slide-big'
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs, Pagination, A11y, Scrollbar]}
          className="mySwiper2"
          navigation={true}
          loop={true}
        >
          {book.images?.map((e, index) => (
            
            <SwiperSlide key={(444 + index).toString()}>
            {imageStates[index] === 'loaded' ? (
              <img
                src={`${Url.BASE_URL}${e.url}`}
                alt={`book ${e}`}
                className="img-big"
              />
            ) : imageStates[index] === 'error' ? (
              <div>не загрузилась</div>
            ) : (
              <div className='loading__spinner' />
            )}
            <img
              src={`${Url.BASE_URL}${e.url}`}
              alt={`book ${e}`}
              className="img-big"
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
              style={{ display: 'none' }}
            />
          </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          navigation={true}
          scrollbar={{ draggable: true, el: '.sc' }}
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs, Scrollbar]}
          className="mySwiper"
          loop={true}
        >
          {book.images?.map((e, index) => (
          <SwiperSlide 
          data-test-id='slide-mini'
         key={(444 + index).toString()}>
                       {imageStates[index] === 'loaded' ? (
                         <img
                           src={`${Url.BASE_URL}${e.url}`}
                           alt={`book ${e}`}
                           className="img"
                         />
                       ) : imageStates[index] === 'error' ? (
                         <div>не загрузилась</div>
                       ) : (
                       
                        <div className='loading__spinner' />
                  
                       )}
                       <img
                         src={`${Url.BASE_URL}${e.url}`}
                         alt={`book ${e}`}
                         className="img"
                         onLoad={() => handleImageLoad(index)}
                         onError={() => handleImageError(index)}
                         style={{ display: 'none' }}
                       />
                     </SwiperSlide>
          ))}
        </Swiper> 
      <div className="sc" />
    </div>
  );
}
