import React from 'react'
import { CartResponse } from '../types/cart-response';
  import Image from "next/image";
  import {
    Package,
    Calendar,
    CreditCard,
    CheckCircle2,
    Clock,
    MapPin,
  } from "lucide-react";
  import { Badge } from "@/components/ui/badge";

export default async function Allorders({ id }: { id: string }) {
  console.log(id)
  const Id = id
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${Id}`,
  );
  // console.log('cart data is here',cartdata);
  const data = await response.json();
  console.log(data);


    return (
      <div className="min-h-screen bg-gray-50/50 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic">
              MY ORDERS<span className="text-green-600">.</span>
            </h1>
            <p className="text-gray-500 font-medium mt-2">
              Track and manage your previous purchases.
            </p>
          </div>

          <div className="space-y-8">
            {data.length > 0 ? (
              data.map((order: any) => (
                <div
                  key={order._id}
                  className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden transition-all hover:border-green-100"
                >
                  {/* Order Top Bar */}
                  <div className="bg-gray-50/50 p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex flex-wrap gap-6 text-sm font-bold uppercase tracking-widest text-gray-400">
                      <div className="space-y-1">
                        <p className="text-[10px]">Order ID</p>
                        <p className="text-gray-900">#{order.id}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px]">Date Placed</p>
                        <p className="text-gray-900 flex items-center gap-2">
                          <Calendar size={14} className="text-green-600" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px]">Payment</p>
                        <p className="text-gray-900 flex items-center gap-2">
                          <CreditCard size={14} className="text-green-600" />
                          {order.paymentMethodType}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tighter ${
                          order.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.isPaid ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 size={14} /> Paid
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> Pending
                          </span>
                        )}
                      </Badge>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                          Total Amount
                        </p>
                        <p className="text-2xl font-black text-gray-900">
                          {order.totalOrderPrice}{" "}
                          <span className="text-sm">EGP</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Products List inside Order */}
                  <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {order.cartItems.map((item: any) => (
                        <div
                          key={item._id}
                          className="flex gap-4 items-center p-3 rounded-2xl bg-gray-50 border border-gray-100"
                        >
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-gray-100">
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-gray-900 truncate text-sm">
                              {item.product.title}
                            </h4>
                            <p className="text-xs text-gray-400 font-bold uppercase mt-1">
                              Qty:{" "}
                              <span className="text-green-600">
                                {item.count}
                              </span>
                            </p>
                            <p className="text-sm font-black text-gray-900 mt-1">
                              {item.price} EGP
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Info Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <MapPin size={14} className="text-gray-300" />
                      <span>
                        Delivering to:{" "}
                        {order.shippingAddress.city || "Primary Address"} •{" "}
                        {order.shippingAddress.phone || "No Phone"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
                <Package size={48} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">
                  No orders found
                </h3>
                <p className="text-gray-400">Time to go shopping!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

