// src/pages/Home/TrendingProducts.tsx
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import TrendingProductCard from "./TrendingProductCard";

const TrendingProducts = () => {
  const axiosInstance = useAxios();

  const { data: trending = [], isLoading , refetch} = useQuery({
    queryKey: ["trending-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products/trending");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <section className="py-12 ">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#22d3ee]">
          🔥 Trending Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trending.map((product) => (
            // <ProductCard key={product._id} product={product} />
            <TrendingProductCard
              key={product._id}
              product={product}
              refetch={refetch}
            ></TrendingProductCard>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium rounded-lg transition"
          >
            Show All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
