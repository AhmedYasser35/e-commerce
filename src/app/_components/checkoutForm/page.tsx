"use client";
import { PayOrderCash } from "@/app/services/cart/payCash";
import { PayOrderOnline } from "@/app/services/cart/payOnline";
import { Shipping } from "@/app/types/cart-response";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Truck, CreditCard, MapPin, Phone, Building2 } from "lucide-react";

export default function CheckoutForm(cartId: { cartId: any }) {
  const [isOnline, setisOnline] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  async function PayCash(cartId: any, shippingAddress: Shipping) {
    const response = await PayOrderCash(cartId, shippingAddress);
    if (response.status == "success") {
      toast.success("Order will be delivered! 🚚");
      window.location.href = "/";
    } else {
      toast.error("Error processing cash order");
    }
  }

  async function PayOnline(cartId: any, shippingAddress: Shipping) {
    const response = await PayOrderOnline(cartId, shippingAddress);
    if (response.status == "success") {
      window.location.href = response.session.url;
      console.log(response.sessionl.url)
    } else {
      toast.error("Error processing online payment");
    }
  }

  const form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  async function submitForm(values: Shipping) {
    const shippingAddress = { ...values };

    if (isOnline) {
      PayOnline(cartId, shippingAddress);
    } else {
      PayCash(cartId, shippingAddress);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gray-50/50">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50">

        <div className="mb-10 text-left">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
            Shipping Details<span className="text-green-600">.</span>
          </h2>
          <p className="text-gray-500 font-medium mt-2">
            Where should we send your fresh goods?
          </p>
        </div>

        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">
          <div className="mt-4">
            <Controller
              name="details"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <FieldLabel className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 ml-1">
                    <Building2 size={14} /> Address Details
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Street name, building, apartment..."
                    className="h-12 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all"
                  />
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <FieldLabel className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 ml-1">
                    <Phone size={14} /> Phone
                  </FieldLabel>
                  <Input
                    type="text"
                    {...field}
                    id={field.name}
                    placeholder="Enter your phone"
                    className="h-12 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all"
                  />
                </div>
              )}
            />

            {/* City Field */}
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <FieldLabel className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 ml-1">
                    <MapPin size={14} /> City
                  </FieldLabel>
                  <Input
                    type="text"
                    {...field}
                    id={field.name}
                    placeholder="Enter your city"
                    className="h-12 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all"
                  />
                </div>
              )}
            />
          </div>

          <div className="flex flex-col gap-4 mt-10">
            <Button
              onClick={() => setisOnline(false)}
              disabled={isLoading}
              type="submit"
              className="h-14 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white font-bold flex gap-3 transition-all active:scale-[0.98]"
            >
              <Truck size={20} />
              Pay Cash
            </Button>

            <Button
              onClick={() => setisOnline(true)}
              disabled={isLoading}
              type="submit"
              className="h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold flex gap-3 shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
            >
              <CreditCard size={20} />
              Pay Online
            </Button>
          </div>

          <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] pt-6">
            Secure Checkout System
          </p>
        </form>
      </div>
    </div>
  );
}
