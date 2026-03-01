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
  );
}
