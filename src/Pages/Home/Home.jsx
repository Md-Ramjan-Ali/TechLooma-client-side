import React from "react";
import Banner from "../../Components/Banner/Banner";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";
import TrendingProducts from "../../Components/TrendingProducts/TrendingProducts";
import CouponSlider from "../../Components/CouponSlider/CouponSlider";
import AboutMe from "../../Components/AboutMe/AboutMe";
import CustomersReview from "../../Components/CustomersReview/CustomersReview";
import { Helmet } from "react-helmet-async";
import NewsletterSection from "../../Components/NewsletterSignup/NewsletterSignup";
import BehindTheScenes from "../../Components/BehindTheScenes/BehindTheScenes";

const Home = () => {
  return (
    <div className="text-secondary-content bg-base-content overflow-hidden">
      <Helmet>
        <title>Home | TechLooma</title>
      </Helmet>
      <Banner></Banner>
      <FeaturedProducts></FeaturedProducts>
      <TrendingProducts></TrendingProducts>
      <CouponSlider></CouponSlider>
      <AboutMe></AboutMe>
      <BehindTheScenes></BehindTheScenes>
      <NewsletterSection></NewsletterSection>
      <CustomersReview></CustomersReview>
    </div>
  );
};

export default Home;
