import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Marketing from '../../Components/Marketing/Marketing';
import FeaturedProducts from '../../Components/FeaturedProducts/FeaturedProducts';

const Home = () => {
  return (
    <div className='text-secondary-content'>
      <Banner></Banner>
      <Marketing></Marketing>
      <FeaturedProducts></FeaturedProducts>
    </div>
  );
};

export default Home;