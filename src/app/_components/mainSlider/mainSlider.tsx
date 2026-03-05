"use client";
import React from "react";
import img1 from "../../../../assets/images/grocery-banner.png";
import img2 from "../../../../assets/images/grocery-banner-2.jpeg";
import img3 from "../../../../assets/images/slider-image-1.jpeg";
import img4 from "../../../../assets/images/slider-image-2.jpeg";
import img5 from "../../../../assets/images/slider-image-3.jpeg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function MainSlider() {
  const mainSlides = [img3, img4, img5];

  return (
    <div className="container mx-auto px-4 mt-8">
      {/* On Mobile: Everything is one column (Slider top, Banners bottom)
         On Desktop: 4-column Grid (3/4 Slider, 1/4 Banners)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* MAIN SLIDER SECTION */}
        <div className="lg:col-span-3 overflow-hidden rounded-3xl shadow-lg border border-gray-100">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            effect="fade"
            loop={true}
            className="h-full w-full"
          >
            {mainSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <Image
                  className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover"
                  src={slide}
                  alt={`Banner ${index + 1}`}
                  priority
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* SIDE BANNERS SECTION */}
        <div className="flex flex-row lg:flex-col gap-4">
          <div className="flex-1 group relative overflow-hidden rounded-3xl shadow-md border border-gray-100">
            <Image
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              src={img1}
              alt="Promotion 1"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          <div className="flex-1 group relative overflow-hidden rounded-3xl shadow-md border border-gray-100">
            <Image
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              src={img2}
              alt="Promotion 2"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}
