"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Category } from "../types/cart-response";

export default function CategoryCard({ data }: { data: Category[] }) {
  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter italic">
        Shop by Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.map((cat: Category) => (
          <Link key={cat._id} href={`/categories/${cat._id}`} className="group">
            <Card className="overflow-hidden border-none shadow-none bg-transparent transition-all duration-300">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-gray-100">
                <Image
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  height={500}
                  width={400}
                  src={cat.image}
                  alt={cat.name}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader className="px-2 py-4">
                <CardTitle className="text-lg font-bold text-center text-gray-800 group-hover:text-green-600 transition-colors uppercase tracking-tight">
                  {cat.name}
                </CardTitle>
                <div className="mx-auto w-0 group-hover:w-1/2 h-[2px] bg-green-500 transition-all duration-300" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
