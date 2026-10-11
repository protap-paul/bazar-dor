import AllProducts from "@/components/AllProducts";
import Hero from "@/components/Hero";
import PriceFallers from "@/components/PriceFallers";
import PriceRisers from "@/components/PriceRisers";
import { Product } from "@/lib/utils";

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function Home() {
  const products = await getProducts();
  return (
    <div>
      <Hero />
      <PriceRisers products={products} />
      <PriceFallers products={products} />
      <AllProducts products={products} />
    </div>
  );
}
