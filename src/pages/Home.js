import React, { useEffect, useState } from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  
  return (
    <div className='bg-slate-100'>
     <CategoryList/>
     <BannerProduct/>
     <HorizontalCardProduct category={"stickers"} heading={"Top's Stickers"}/>
     <HorizontalCardProduct category={"banners"} heading={"Top's Banners"}/>
     <HorizontalCardProduct category={"hoodies"} heading={"Top's hoodies"}/>
     <HorizontalCardProduct category={"wallpapers"} heading={"Top's wallpapers"}/>

     <VerticalCardProduct category={"stickers"} heading={"Top's stickers"}/>
     <VerticalCardProduct category={"banners"} heading={"Top's banners"}/>
     <VerticalCardProduct category={"wallpapers"} heading={"Top's wallpapers"}/>
    </div>
  )
}

export default Home
