import React from 'react'
import MainBanner from '../Components/MainBanner'
import Categories from '../Components/Categories'
import BestSeller from '../Components/BestSeller'
import ButtomBanner from '../Components/ButtomBanner'
import NewsLetter from '../Components/NewsLetter'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner/>
      <Categories/>
      <BestSeller/>
      <ButtomBanner/>
      <NewsLetter/>
    </div>
  )
}

export default Home
