// CouponSlider.tsx
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import useAxios from "../../hooks/useAxios";
import CouponCard from "./CouponCard";
import Loading from "../Loading/Loading";

const CouponSlider = () => {
  const axiosInstance = useAxios();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["valid-coupons"],
    queryFn: async () => {
      const res = await axiosInstance.get("/coupons/valid");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="py-10">
      <CouponCard coupons={coupons}></CouponCard>
    </section>
  );
};

export default CouponSlider;
