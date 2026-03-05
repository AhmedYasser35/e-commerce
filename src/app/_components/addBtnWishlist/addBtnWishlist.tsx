"use client";
import { addToWishlist } from "@/app/wishListServices/wishlist/add-to-wishlist";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
export default function AddBtnWishlist(productId: any) {
  const queryClient = useQueryClient();
  const {
    data,
    isPending,
    error,
    isError,
    mutate: addProdToWishlist,
  } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["get-wishlist"] });
    },
    onError: () => {
      toast.error("Please login first");
    },
  });
  return (
    <>
      <CardFooter className="flex justify-center">
        <Button
          onClick={() => {
            addProdToWishlist(productId);
          }}
        >
          Add to wishlist
        </Button>
      </CardFooter>
    </>
  );
}
