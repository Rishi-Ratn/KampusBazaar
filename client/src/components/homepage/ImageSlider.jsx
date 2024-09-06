import React, { useState } from 'react';
import { Autoplay, A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/controller';
import { Link } from 'react-router-dom';

const ImageSlider = () => {
    const images = [
        'https://images.pexels.com/photos/16770561/pexels-photo-16770561/free-photo-of-scenic-view-of-green-hills-and-mountains.jpeg',
        'https://images.pexels.com/photos/20041507/pexels-photo-20041507/free-photo-of-close-up-of-sleeping-cat.jpeg',
        'https://images.pexels.com/photos/12187128/pexels-photo-12187128.jpeg',
        'https://images.pexels.com/photos/11785594/pexels-photo-11785594.jpeg'
    ];

    const SwiperPagination = ({ activeIndex }) => {
        return (
            <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-[#42c8b7]' : 'bg-slate-400'}`}
                    />
                ))}
            </div>
        );
    };

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className='bg-white dark:bg-slate-800'>
            <section className='bg-slate-300 mx-4 sm:mx-8 md:mx-20 lg:mx-36 z-10 p-4 rounded-lg shadow-lg'>
                <Swiper
                    modules={[Autoplay, A11y, Navigation, Pagination]}
                    spaceBetween={30} // Adjust the spacing as needed
                    slidesPerView={1} // Show only one slide by default
                    autoplay={{ delay: 2500 }} // Set autoplay delay
                    loop={true} // Enable loop mode
                    navigation={{ clickable: true }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    loopFillGroupWithBlank={true} // Ensure smooth loop transition
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <a href='/#'>
                                <img
                                    src={img}
                                    alt={`slide-${index + 1}`}
                                    className='w-full h-[440px] mx-auto select-none object-cover rounded-md'
                                />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <SwiperPagination activeIndex={activeIndex} />
            </section>
            <div className="flex justify-center mt-4">
                <Link to='/search'>
                <button className='text-semibold text-2xl bg-[#42c8b7] text-white px-3 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-300'>
                    Explore Now
                </button>
                </Link>
            </div>
        </div>
    );
};

export default ImageSlider;
