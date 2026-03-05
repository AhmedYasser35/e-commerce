'use server'
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
import AddBtn from "../_components/addBtn/addBtn";
import { Category } from "../types/cart-response";
import Image from "next/image";
import CategoryDetails from "./[id]/page";
import BrandCard from "./brandCard";


export default async function Brands() {
      const response = await fetch(`${process.env.API}/brands`);
      const payload = await response.json();
      const data=payload.data
  console.log(payload)
  return(
<BrandCard data={data}/>
  ) ;
}
