"use client"
import { addToCart } from '@/app/services/cart/add-to-cart';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
export default function AddBtn(productId:any) {
    const queryClient = useQueryClient()
    const { data, isPending, error, isError , mutate:addProdToCart } = useMutation({
      mutationFn:addToCart,
      onSuccess:(data)=>{
          toast.success(data?.message)
          queryClient.invalidateQueries({queryKey:['get-cart']})
      },
      onError:()=>{
        toast.error("Please login first")
      }
    });
  return (
    <>
      <CardFooter className="flex justify-center">
        <Button onClick={()=>{addProdToCart(productId)}}>Add to Cart</Button>
      </CardFooter>
    </>
  );
}
