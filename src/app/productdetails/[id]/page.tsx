import React from "react";
import { productItem } from "@/app/types/productInterface";
import { Badge } from "@/components/ui/badge";
import { Carousel1 } from "./../../carousel";
import AddBtn from "@/app/_components/addBtn/addBtn";
import AddBtnWishlist from "@/app/_components/addBtnWishlist/addBtnWishlist";

export default async function ProductPage(props: any) {
  const { id } = await props.params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    { method: "GET" },
  );
  const { data: singleProduct }: { data: productItem } = await response.json();

  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
        {/* LEFT: STICKY GALLERY */}
        <div className="lg:col-span-1 md:sticky md:top-24">
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
            <Carousel1 image={singleProduct.images} />
          </div>
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* STATIC CATEGORY (No Link) */}
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="cursor-default bg-gray-50 text-gray-500 border-gray-200 py-1 px-3"
              >
                {singleProduct.category.name}
              </Badge>
              {singleProduct.brand && (
                <>
                  <span className="text-gray-300">/</span>
                  <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                    {singleProduct.brand.name}
                  </span>
                </>
              )}
            </div>

            {/* TITLE & RATINGS */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                {singleProduct.title}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-md text-yellow-700">
                  <span className="font-bold text-sm">
                    {singleProduct.ratingsAverage}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 ml-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-300 text-lg">|</span>
                <span className="text-sm font-semibold text-gray-500">
                  {singleProduct.ratingsQuantity} Reviews
                </span>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* DESCRIPTION */}
            <div className="text-gray-600 leading-relaxed max-w-2xl">
              <h3 className="text-gray-900 font-bold mb-2 uppercase text-xs tracking-widest">
                Description
              </h3>
              <p>{singleProduct.description}</p>
            </div>

            {/* PRICE & ACTIONS */}
            <div className="bg-white p-6 rounded-3xl border-2 border-gray-50 shadow-sm space-y-6">
              <div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1 block">
                  Current Price
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-gray-900">
                    {singleProduct.price}
                  </span>
                  <span className="text-xl font-bold text-gray-900 uppercase">
                    EGP
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS STACKED */}
              <div className="flex flex-col gap-3 max-w-md">
                <AddBtn productId={singleProduct._id} />
                <AddBtnWishlist productId={singleProduct._id} />
              </div>

              {/* TRUST BADGES */}
              <div className="pt-4 border-t border-gray-50 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Free Shipping
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
