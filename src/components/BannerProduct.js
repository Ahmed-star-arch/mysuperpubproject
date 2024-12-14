import React, { useEffect, useState } from 'react'
import wal1 from '../assest/banner/wal1.jpg'
import wal2 from '../assest/banner/wal2.jpeg'
import wal3 from '../assest/banner/wal3.jpg'

import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'

import { GoTriangleRight } from "react-icons/go";
import { GoTriangleLeft } from "react-icons/go";


const BannerProduct = () => {

    const [currentImage,setCurrentImage] = useState(0)
    const desktopImages = [
      
        wal3,
        wal1,
        wal2
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile
    ]
    const nextImage = () =>{
        if(desktopImages.length - 1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () =>{
        if(currentImage != 0){
            setCurrentImage(preve => preve - 1)
        }
    }


    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },3000)

        return ()=> clearInterval(interval)
    },[currentImage])

  return (
    <div className='container mx-auto px-4 rounded '>
      <div className='h-56 md:h-72 w-full bg-slate-200 relative'>
        <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
          <div className=' flex justify-between w-full text-2xl'>
           <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><GoTriangleLeft/></button> 
           <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><GoTriangleRight/></button>
           
          </div>
        </div>


         {/**desktop tablets */}
        <div className='hidden md:flex h-full w-full overflow-hidden'>
            {
                desktopImages.map((imageURl,index)=>{
                    return(
                    <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl}
                    style={{transform : `translateX(-${currentImage * 100}%)`}} >
                        <img src={imageURl} className='w-full h-full'/>
                    </div>
                    )
                })
            }
        </div>


           {/**samsung phones */}
           <div className='flex h-full w-full overflow-hidden md:hidden'>
            {
                mobileImages.map((imageURl,index)=>{
                    return(
                    <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl}
                    style={{transform : `translateX(-${currentImage * 100}%)`}} >
                        <img src={imageURl} className='w-full h-full object-cover'/>
                    </div>
                    )
                })
            }
        </div>
       
              
        </div>
      </div>
   
  )
}

export default BannerProduct
