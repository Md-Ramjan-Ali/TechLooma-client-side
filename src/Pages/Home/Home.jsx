import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Marketing from '../../Components/Marketing/Marketing';
import FeaturedProducts from '../../Components/FeaturedProducts/FeaturedProducts';
import TrendingProducts from '../../Components/TrendingProducts/TrendingProducts';
import CouponSlider from '../../Components/CouponSlider/CouponSlider';
import AboutMe from '../../Components/AboutMe/AboutMe';

const Home = () => {
  return (
    <div className='text-secondary-content'>
      <Banner></Banner>
      <Marketing></Marketing>
      <FeaturedProducts></FeaturedProducts>
      <TrendingProducts></TrendingProducts>
      <CouponSlider></CouponSlider>
      <AboutMe></AboutMe>
    </div>
  );
};

export default Home;