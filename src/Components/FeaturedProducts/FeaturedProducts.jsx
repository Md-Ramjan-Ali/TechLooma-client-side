import { useQuery } from "@tanstack/react-query";
import { FaFireAlt } from "react-icons/fa";
import FeatureCard from "./FeatureCard";
import useAxios from "../../hooks/useAxios";

const FeaturedProducts = () => {
  const axiosInstance = useAxios();


  const { data: featured = [], refetch } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products/featured");
      return res.data;
    },
  });

  return (
    <section className="py-16 bg-[#0f0f0f] text-white px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <FaFireAlt className="inline-block text-[#22d3ee] mr-2" />
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((product) => (
            <FeatureCard product={product} refetch={refetch}></FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
