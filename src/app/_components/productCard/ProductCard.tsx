import { productItem } from "@/app/types/productInterface";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import AddBtn from "../addBtn/addBtn";
import AddBtnWishlist from "../addBtnWishlist/addBtnWishlist";

export function ProductCard({ prod }: { prod: productItem }) {
  return (
    <Card className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-md">
      <Link href={`/productdetails/${prod._id}`} className="block">
        {/* IMAGE */}
        <div className="aspect-square w-full p-4 overflow-hidden">
          <img
            src={prod.imageCover}
            alt={prod.title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* CONTENT */}
        <CardHeader className="p-4 pt-0">
          <Badge
            variant="secondary"
            className="w-fit mb-2 bg-gray-100 text-gray-600 border-none"
          >
            {prod.category.name}
          </Badge>

          <CardTitle className="text-base font-bold text-gray-800 line-clamp-1">
            {prod.title.split(" ").slice(0, 3).join(" ")}
          </CardTitle>

          <CardDescription className="mt-2">
            <div className="flex items-center gap-1 text-yellow-500 mb-1">
              <span className="text-sm font-bold">{prod.ratingsAverage} ★</span>
              <span className="text-gray-400 text-xs">
                ({prod.ratingsQuantity})
              </span>
            </div>

            <div className="text-lg font-bold text-black">{prod.price} EGP</div>
          </CardDescription>
        </CardHeader>
      </Link>

      {/* STACKED BUTTONS SECTION */}
      <div className="p-4 pt-0 flex flex-col gap-2">
        <div className="w-full">
          <AddBtn productId={prod._id} />
        </div>
        <div className="w-full">
          <AddBtnWishlist productId={prod._id} />
        </div>
      </div>
    </Card>
  );
}
