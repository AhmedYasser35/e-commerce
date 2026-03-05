"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BrandDet } from "../types/productInterface";

export default function BrandCard({ data }: { data: BrandDet[] }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col mb-10">
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">
          Our Brands
        </h2>
        <div className="w-20 h-1.5 bg-green-500 mt-2 rounded-full" />
      </div>

      {/* Grid: 1 col mobile, 2 sm, 3 md, 5 xl */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {data.map((brand: BrandDet) => (
          <Link key={brand._id} href={`/brands/${brand._id}`} className="group">
            <Card className="overflow-hidden border-none shadow-none bg-transparent transition-all duration-300">
              {/* BRAND LOGO CONTAINER */}
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 flex items-center justify-center p-6 transition-all duration-300 group-hover:shadow-md group-hover:border-green-100">
                <Image
                  className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
                  height={300}
                  width={300}
                  src={brand.image}
                  alt={brand.name}
                  priority
                />

                {/* Subtle Glow Overlay */}
                <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* BRAND NAME */}
              <CardHeader className="px-2 py-4">
                <CardTitle className="text-lg font-bold text-center text-gray-800 group-hover:text-green-600 transition-colors uppercase tracking-widest">
                  {brand.name}
                </CardTitle>
                {/* Animated underline */}
                <div className="mx-auto w-0 group-hover:w-1/3 h-[2px] bg-green-500 transition-all duration-300 rounded-full mt-1" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
