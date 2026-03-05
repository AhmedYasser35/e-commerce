"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { delWishlistItem } from "../wishListServices/wishlist/delete-item";
import { WishlistResponse } from "../types/wishilst-response";

export default function Wishlist() {
  const queryClient = useQueryClient();

  const { data: wishlistData, isLoading } = useQuery<WishlistResponse>({
    queryKey: ["get-wishlist"],
    queryFn: async () => {
      const resp = await fetch("/api/wishlist");
      const payload = await resp.json();
      return payload;
    },
  });

  const { mutate: delItem } = useMutation({
    mutationFn: delWishlistItem,
    onSuccess: () => {
      toast.success("Item removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["get-wishlist"] });
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  if (isLoading)
    return (
      <div className="p-10 text-center font-medium">Loading wishlist...</div>
    );

  const hasItems = wishlistData?.data && wishlistData.data.length > 0;

  return (
    <div className="container mx-auto p-4 md:py-10">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-7 text-red-500"
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
        My Wishlist
      </h1>

      {hasItems ? (
        <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4 hidden md:table-cell">Price</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {wishlistData.data.map((prod) => (
                <tr
                  key={prod._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={prod.imageCover}
                      className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg border"
                      alt={prod.title}
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-base md:text-lg">
                        {prod.title}
                      </span>
                      <span className="md:hidden font-semibold text-green-600">
                        {prod.price} EGP
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="font-bold text-lg text-gray-700">
                      {prod.price} EGP
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                      {/* Optional: Add to Cart Button could go here */}
                      <button
                        onClick={() => delItem(prod._id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="bg-white p-6 rounded-full shadow-sm mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-12 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-500">
            Your wishlist is empty
          </h2>
          <p className="text-gray-400 mt-2">
            Save items you love to see them here!
          </p>
          <Link href="/">
            <Button className="mt-6 px-8 py-2 bg-green-600 hover:bg-green-700">
              Go Shopping
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
