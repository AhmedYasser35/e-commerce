"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { CartResponse } from "../types/cart-response";
import toast from "react-hot-toast";
import { delCartItem } from "../services/cart/delete-item";
import { updateCart } from "../services/cart/update-cart";

export default function cart() {
  const queryClient = useQueryClient();
  const {
    data: cartData,
    isLoading,
    isError,
  } = useQuery<CartResponse>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const resp = await fetch("api/cart");
      const payload = await resp.json();
      return payload;
    },
  });

  const { mutate: delItem, isPending } = useMutation({
    mutationFn: delCartItem,
    onSuccess: () => {
      toast.success("item deleted");
      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
    onError: () => {
      toast.error("error");
    },
  });


  const { mutate: updateItem, isPending:updateLoading } = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      toast.success("item updated");
      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
        

      });
    },
    onError: () => {
      toast.error("error");
    },
  });
  function handleUpdate(productId:string,count:number){
    updateItem({ productId, count });
  }
  console.log(cartData);
  return (
    <>
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Product
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Qty
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Price
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartData?.data.products.map((prod) => {
              return (
                <tr
                  key={prod._id}
                  className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
                >
                  <td className="p-4">
                    <img
                      src={prod.product.imageCover}
                      className="w-16 md:w-24 max-w-full max-h-full"
                      alt={prod.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-heading">
                    {prod.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <form className="max-w-xs mx-auto">
                      <label htmlFor="counter-input-1" className="sr-only">
                        Choose quantity:
                      </label>
                      <div className="relative flex items-center">
                        <button
                          onClick={() => {
                            handleUpdate(prod.product._id, prod.count - 1);
                          }}
                          type="button"
                          id="decrement-button-2"
                          data-input-counter-decrement="counter-input-2"
                          className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                        >
                          <svg
                            className="w-3 h-3 text-heading"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 12h14"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="counter-input-2"
                          data-input-counter
                          className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                          value={prod.count}
                          required
                        />
                        <button
                          onClick={() => {
                            handleUpdate(prod.product._id, prod.count + 1);
                          }}
                          type="button"
                          id="increment-button-2"
                          data-input-counter-increment="counter-input-2"
                          className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                        >
                          <svg
                            className="w-3 h-3 text-heading"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 12h14m-7 7V5"
                            />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </td>
                  <td className="px-6 py-4 font-semibold text-heading">
                    {prod.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => {
                        delItem(prod.product._id);
                      }}
                      className="font-medium text-fg-danger hover:underline cursor-pointer"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
