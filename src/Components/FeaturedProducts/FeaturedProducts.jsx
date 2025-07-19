import { useQuery } from "@tanstack/react-query";
import { FaCrown, FaFireAlt, FaStar, FaTrophy } from "react-icons/fa";
import FeatureCard from "./FeatureCard";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading/Loading";

const FeaturedProducts = () => {
  const axiosInstance = useAxios();

  const { data: featured = [], refetch, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products/featured");
      return res.data;
    },
  });

  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <section className="py-16 text-secondary-content px-4">
      <div className="w-11/12 mx-auto">
        <div className=" bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-tl-full rounded-br-full mb-10">
          <div className="w-8/12 mx-auto py-5 text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-center flex items-center justify-center gap-3">
              <FaCrown className="text-primary" />
              Featured Products
            </h2>
            <p>
              Explore our handpicked Featured Products, selected for their
              outstanding quality, innovation, and user satisfaction. These
              products represent the best our platform has to offer, carefully
              curated to meet your needs. Stay inspired with top-rated solutions
              trusted by our growing tech community.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((product) => (
            <FeatureCard
              key={product._id}
              product={product}
              refetch={refetch}
            ></FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
