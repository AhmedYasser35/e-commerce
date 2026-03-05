"use client";
import { PayOrderCash } from "@/app/services/cart/payCash";
import { PayOrderOnline } from "@/app/services/cart/payOnline";
import { Shipping } from "@/app/types/cart-response";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";



import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";


export default function CheckoutForm(cartId:{cartId:any}) {

  const [isOnline, setisOnline] = useState(true)

  async function PayCash(cartId: any, shippingAddress: Shipping) {
   const response = await PayOrderCash(cartId, shippingAddress);
   console.log(response)
   if(response.status=='success'){
    toast.success("order will be delivered");
    window.location.href='/'
}else{
  toast.error('error')
}
   }

  async function PayOnline(cartId: any, shippingAddress: Shipping) {
    const response = await PayOrderOnline(cartId, shippingAddress);
    console.log(response);
    if (response.status == "success") {
      window.location.href = response.session.url;
    } else {
      toast.error("error");
    }
  }


  const [isLoading, setisLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  async function submitForm(values:Shipping) {
    console.log(values);
    const shippingAddress={
        ...values
    }
    // setisLoading(true);

    // setisLoading(false);
    if(isOnline){

      PayOnline(cartId, shippingAddress);
    }else{
      PayCash(cartId, shippingAddress);
    }
  }
  return (
    <>
      <div className="w-1/2 bg-gray-300 p-10 m-auto mt-20">
        <h2 className="text-green-600 font-bold text-4xl">shipping details</h2>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="mt-4">
            <Controller
              name="details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>details:</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Email"
                    className="bg-white"
                  />
                </Field>
              )}
            />
          </div>

          <div className="mt-4">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>phone:</FieldLabel>
                  <Input
                    type="text"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your phone"
                    className="bg-white"
                  />
                </Field>
              )}
            />
          </div>

          <div className="mt-4">
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>city:</FieldLabel>
                  <Input
                    type="text"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your city"
                    className="bg-white"
                  />
                </Field>
              )}
            />
          </div>

          <Button
            onClick={() => {
              setisOnline(false);
            }}
            disabled={isLoading}
            type="submit"
            className="mt-7 w-full"
          >
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ) : (
              "Pay Cash"
            )}
          </Button>

          <Button
            onClick={() => {
              setisOnline(true);
            }}
            disabled={isLoading}
            type="submit"
            className="mt-7 w-full"
          >
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ) : (
              "Pay Online"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
