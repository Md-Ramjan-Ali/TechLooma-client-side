import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Marketing from '../../Components/Marketing/Marketing';

const Home = () => {
  return (
    <div className='text-secondary-content'>
      <Banner></Banner>
      <Marketing></Marketing>
    </div>
  );
};

export default Home;