import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: {
    id: string;
  };
};

export default async function BrandDetails({ params }: Props) {
  const { id } = await params;
  const response = await fetch(`${process.env.API}/brands/${id}`);
  const payload = await response.json();

  // Clean date formatter
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      <div className="max-w-5xl mx-auto">
        {/* Main Card Container */}
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          {/* LEFT: BRAND LOGO */}
          <div className="w-full md:w-1/3">
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-white border-8 border-gray-50 shadow-2xl ring-1 ring-gray-100 flex items-center justify-center p-8">
              <Image
                className="object-contain transition-transform duration-500 hover:scale-110"
                fill
                src={payload.data.image}
                alt={payload.data.name}
                priority
              />
            </div>
          </div>

          {/* RIGHT: BRAND SPECS */}
          <div className="w-full md:w-2/3">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-50" />

              <div className="relative z-10 space-y-8">
                <div>
                  <Badge
                    variant="outline"
                    className="mb-4 px-4 py-1 border-green-200 text-green-600 bg-green-50/50 cursor-default"
                  >
                    Official Brand Partner
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
                    {payload.data.name}
                  </h1>
                  <p className="text-xl text-gray-400 font-medium mt-2 flex items-center gap-2">
                    <span className="text-green-500">#</span>
                    {payload.data.slug}
                  </p>
                </div>

                <div className="h-px bg-gray-100 w-full" />

                {/* INFO GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">
                      Partnership Date
                    </p>
                    <p className="text-2xl text-gray-800 font-bold">
                      {formatDate(payload.data.createdAt)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">
                      Record Updated
                    </p>
                    <p className="text-2xl text-gray-800 font-bold">
                      {formatDate(payload.data.updatedAt)}
                    </p>
                  </div>
                </div>

                {/* TRUST FOOTER */}
                <div className="pt-6 flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <div className="w-8 h-px bg-gray-200" />
                  Authentic Brand Record
                  <div className="w-8 h-px bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
