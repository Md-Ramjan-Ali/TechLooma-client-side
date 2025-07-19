// src/pages/Home/TrendingProducts.tsx
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import TrendingProductCard from "./TrendingProductCard";
import { FaFire } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import Loading from "../Loading/Loading";

const TrendingProducts = () => {
  const axiosInstance = useAxios();

  const { data: trending = [], isLoading , refetch} = useQuery({
    queryKey: ["trending-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products/trending");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>

  return (
    <section className="py-16 text-secondary-content px-4">
      <div className="w-11/12 mx-auto">
        <div className=" bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-tl-full rounded-br-full mb-10">
          <div className="w-8/12 mx-auto py-5 text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-center flex items-center justify-center gap-2">
              <FaFire className="text-red-500" />
              Trending Products
            </h2>
            <p>
              Stay ahead of the curve with our Trending Products, where
              innovation meets popularity. These items are gaining buzz for
              their exceptional features, user engagement, and growing demand.
              Discover what's making waves in the community and why everyone's
              talking about them.
            </p>
          </div>
        </div>

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

        <div className="mt-10 text-center bg-secondary border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded- w-fit mx-auto rounded-tl-2xl rounded-br-2xl hover:bg-primary">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-4 py-2"
          >
            Browse All Products
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
