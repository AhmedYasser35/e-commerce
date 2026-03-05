"use server"
import { Shipping } from "@/app/types/cart-response";
import { getAccessToken } from "@/schema/access-token";

export async function PayOrderOnline(cartId:{cartId:string}, shippingAddress:Shipping) {
  const token: any = await getAccessToken();
  if (!token) {
    throw new Error("unauthorized");
  }
  const response = await fetch(
    `${process.env.API}/orders/checkout-session/${cartId.cartId}`,
    {
      method: "POST",
      headers: {
        token: token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress,
      }),
    },
  );
  const payload = await response.json();
  console.log(payload);
  return payload;
}