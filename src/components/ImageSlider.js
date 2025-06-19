import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import '../components/ImageSlider.css'; // Correct CSS import


const ImageSlider = ({ onCityClick }) => {
  const slides = [
    { src: '/images/Rabat.jpg', title: 'Rabat' },
    { src: '/images/Marrakech.jpg', title: 'Marrakech' },
    { src: '/images/Casablanca.jpg', title: 'Casablanca' },
    { src: '/images/Tanger.jpg', title: 'Tanger' },
    { src: '/images/Chefchaouen.jpg', title: 'Chefchaouen' },
    { src: '/images/Fes.jpg', title: 'Fes' },
    { src: '/images/Merzouga.jpg', title: 'Merzouga' },

  ];

  return (
    <section id="tranding" className="mt-10">
      <div className="container mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          loop={true}
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="tranding-slide cursor-pointer" onClick={() => onCityClick(slide.title)}>
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={slide.src} 
                  alt={slide.title} 
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white text-center py-2">
                  <h2 className="text-xl font-semibold">{slide.title}</h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ImageSlider;