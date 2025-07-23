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
    <section className="py-10 text-secondary-content px-2">
      <div className="max-w-screen-xl mx-auto">
        <div className=" bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-tl-full rounded-br-full mb-10">
          <div className="w-10/12 mx-auto py-5 text-center space-y-3">
            <h2 className="text-xl md:text-4xl font-bold text-center flex items-center justify-center gap-2">
              <FaFire className="text-red-500" />
              Trending Products
            </h2>
            <p>
              Stay ahead with our Trending Products — popular for their
              innovation, features, and rising demand in the tech community.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trending.map((product) => (
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
