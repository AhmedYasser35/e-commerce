"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { CartResponse } from "../types/cart-response";
import toast from "react-hot-toast";
import { delCartItem } from "../services/cart/delete-item";
import { updateCart } from "../services/cart/update-cart";
import { Button } from "@/components/ui/button";
import { clearCart } from "../services/cart/clear-cart";
import cartImg from "../../../assets/images/cart2.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const queryClient = useQueryClient();
  const { data: cartData, isLoading } = useQuery<CartResponse>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const resp = await fetch("api/cart");
      const payload = await resp.json();
      return payload;
    },
  });

  const { mutate: delItem } = useMutation({
    mutationFn: delCartItem,
    onSuccess: () => {
      toast.success("Item removed");
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
  });

  const { mutate: clear } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
  });

  const { mutate: updateItem } = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
  });

  function handleUpdate(productId: string, count: number) {
    if (count < 1) return;
    updateItem({ productId, count });
  }

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {cartData && cartData.numOfCartItems > 0 ? (
        // Mobile: Column (stacked) | Desktop: Row
        <div className="flex flex-col lg:flex-row gap-6 mt-5">
          {/* LEFT: PRODUCTS LIST */}
          <div className="w-full lg:w-3/4">
            <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-sm">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-4">Product</th>
                    <th className="px-4 py-4 text-center">Qty</th>
                    <th className="px-4 py-4">Price</th>
                    <th className="px-4 py-4">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartData.data.products.map((prod) => (
                    <tr
                      key={prod._id}
                      className="bg-white hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={prod.product.imageCover}
                          className="w-12 h-12 md:w-20 md:h-20 object-cover rounded-md border"
                          alt={prod.product.title}
                        />
                        <span className="font-semibold text-gray-800 line-clamp-2 max-w-[150px] md:max-w-none">
                          {prod.product.title}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              handleUpdate(prod.product._id, prod.count - 1)
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="font-bold min-w-[20px] text-center">
                            {prod.count}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdate(prod.product._id, prod.count + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-bold text-green-600 whitespace-nowrap">
                        {prod.price} EGP
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => delItem(prod.product._id)}
                          className="text-red-500 hover:scale-110 transition-transform"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 mx-auto"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => clear()}
              className="mt-4 text-sm font-medium text-red-600 hover:underline px-2"
            >
              Clear Cart
            </button>
          </div>

          {/* RIGHT: CHECKOUT SUMMARY (Centered Button & Bordered Box) */}
          <div className="w-full lg:w-1/4">
            <div className="p-6 border-2 border-gray-300 rounded-2xl bg-white shadow-sm flex flex-col items-center sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 w-full text-center border-b pb-4">
                Summary
              </h2>

              <div className="w-full flex justify-between mb-4 px-2">
                <span className="text-gray-500">Items:</span>
                <span className="font-bold text-gray-800">
                  {cartData.numOfCartItems}
                </span>
              </div>

              <div className="w-full flex justify-between mb-8 px-2">
                <span className="text-gray-500 font-medium">Total:</span>
                <span className="text-2xl font-extrabold text-green-600">
                  {cartData.data.totalCartPrice}{" "}
                  <span className="text-xs">EGP</span>
                </span>
              </div>

              {/* Centered Checkout Button */}
              <Link
                href={`/checkout/${cartData.cartId}`}
                className="w-full flex justify-center"
              >
                <Button className="w-full md:w-3/4 lg:w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-md active:scale-95">
                  Check Out
                </Button>
              </Link>

              <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest">
                Secure Payment Guarantee
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Image src={cartImg} alt="empty" className="w-48 opacity-40 mb-4" />
          <h2 className="text-xl font-semibold text-gray-400">
            Your cart is feeling light...
          </h2>
          <Link href="/">
            <Button className="mt-6">Shop Now</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
