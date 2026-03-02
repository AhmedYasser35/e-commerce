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
import AddBtn from "../addBtn/addBtn";

export function ProductCard({prod}:{prod:productItem}) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <Link href={`/productdetails/${prod._id}`}>
        <div className="absolute inset-0 z-30 aspect-video" />
        <img src={prod.imageCover} alt={prod.title} />
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">{prod.category.name}</Badge>
          </CardAction>
          <CardTitle>{prod.title.split(" ").slice(0, 2).join(" ")}</CardTitle>
          <CardDescription>
            <span className="me-1.5">{prod.ratingsAverage}</span>
            <span>({prod.ratingsQuantity})</span>

            <br />
            <span className="font-bold text-black text-xl">
              {prod.price} EGP
            </span>
          </CardDescription>
        </CardHeader>
      </Link>
        <AddBtn productId={prod._id}/>
    </Card>
  );
}
