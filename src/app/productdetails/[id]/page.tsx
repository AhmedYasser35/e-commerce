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
import AddBtn from '@/app/_components/addBtn/addBtn';


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
            <AddBtn productId={singleProduct._id}/>
          </Card>
        </div>
      </div>
    </>
  );
}
