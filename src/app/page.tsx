import Image from "next/image";
import { productItem } from './types/productInterface';
import { Button } from "@/components/ui/button";
import { ProductCard } from "./_components/productCard/ProductCard";
import MainSlider from "./_components/mainSlider/mainSlider";
import CategorySlider from "./_components/categorySlider/page";

export default async function Home() {
  let  response = await fetch("https://ecommerce.routemisr.com/api/v1/products" , {
    method:'GET'
  }
  );
  let {data:allproducts}:{data:productItem[]} = await response.json()
  return (
    <>
      <MainSlider />
      <CategorySlider/>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {allproducts.map((prod) => (
          <ProductCard key={prod._id} prod={prod} />
        ))}
      </div>
    </>
  );
}
