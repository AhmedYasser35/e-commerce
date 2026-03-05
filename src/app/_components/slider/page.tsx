"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { Category } from "@/app/types/productInterface";
import Link from "next/link";

export default function CategorySlider({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="py-8 bg-gray-50/50 rounded-3xl my-10 px-4">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">
          Explore Categories
        </h2>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        spaceBetween={15}
        // Responsive Breakpoints
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 15 },
          768: { slidesPerView: 4, spaceBetween: 15 },
          1024: { slidesPerView: 6, spaceBetween: 20 },
          1280: { slidesPerView: 7, spaceBetween: 20 },
        }}
        className="pb-10"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat._id}>
            <Link href={`/categories/${cat._id}`} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-full border-4 border-white shadow-sm transition-all duration-300 group-hover:border-green-500 group-hover:shadow-md">
                <Image
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={cat.image}
                  alt={cat.name}
                  width={200}
                  height={200}
                />
              </div>
              <h3 className="mt-3 text-center text-sm font-bold text-gray-700 group-hover:text-green-600 transition-colors truncate px-1">
                {cat.name}
              </h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
