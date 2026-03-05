import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default async function CategoryDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const response = await fetch(`${process.env.API}/categories/${id}`);
  const payload = await response.json();

  // Helper to make the date look pretty (e.g., March 5, 2024)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Responsive Flex: Column on mobile, Row on Tablet+ */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 lg:gap-12">
          {/* LEFT: CATEGORY IMAGE */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-4 border-white shadow-xl ring-1 ring-gray-100">
              <Image
                className="object-cover"
                fill
                src={payload.data.image}
                alt={payload.data.name}
                priority
              />
            </div>
          </div>

          {/* RIGHT: CATEGORY INFO */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-center">
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1">
                  Category Profile
                </Badge>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                  {payload.data.name}
                </h1>
                <p className="text-lg text-gray-400 font-medium mt-1 lowercase">
                  @{payload.data.slug}
                </p>
              </div>

              <hr className="border-gray-50" />

              {/* TIMESTAMPS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-green-500 font-bold">
                    Created At
                  </p>
                  <p className="text-xl text-gray-700 font-semibold">
                    {formatDate(payload.data.createdAt)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-blue-500 font-bold">
                    Last Updated
                  </p>
                  <p className="text-xl text-gray-700 font-semibold">
                    {formatDate(payload.data.updatedAt)}
                  </p>
                </div>
              </div>

              {/* ACTION/FOOTER */}
              <div className="pt-4 flex items-center gap-2 text-sm text-gray-400 italic">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
                System verified category record
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
