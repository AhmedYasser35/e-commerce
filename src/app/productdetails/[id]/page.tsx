import React from 'react'

import { productItem } from "@/app/types/productInterface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Carousel1 } from './../../carousel';


export default async function page(props:any) {
    let {id} = await props.params
    console.log(id)
    let response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,{
        method:"GET"
      }
    );
    let {data:singleProduct}:{data:productItem}= await response.json()
    console.log(singleProduct)
  return (
    <>
      <div className="grid md:grid-cols-3 gap-5 items-center">
        <div className="md:col-span-1">
          <Carousel1 image={singleProduct.images} />
        </div>
        <div className="md:col-span-2">
          <Card className="relative w-full h-screen p-10">
            <CardHeader>
              <CardAction>
                <Link
                href="/category"
                >
                  <Badge variant="secondary">
                    {singleProduct.category.name}
                  </Badge>
                </Link>
              </CardAction>
              <CardTitle className='text-3xl font-bold'>
                {singleProduct.title}
              </CardTitle>
              <CardDescription>
                <span className="me-1.5">{singleProduct.ratingsAverage}</span>
                <span>({singleProduct.ratingsQuantity})</span>

                <br />
                <span className="font-bold text-black text-xl">
                  {singleProduct.price} EGP
                </span>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button>Add to Cart</Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 duration-150 hover:text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
