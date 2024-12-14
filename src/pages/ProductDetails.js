import React, { useCallback, useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import {useNavigate, useParams} from 'react-router-dom'
import { FaFaceGrinStars } from "react-icons/fa6";
import { FaRegGrinStars } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency'
import VerticalCardProduct from '../components/VerticalCardProduct'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCard';
import Context from '../context';

const ProductDetails = () => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : "",
    heightvalues : ""
  })
  const params = useParams()
  const [loading,setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")

  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })
  const [zoomImage,setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

  const navigate = useNavigate()


  const fetchProductDetails = async()=>{
    setLoading(true)
   
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)
    
    const dataReponse = await response.json()

    setData(dataReponse?.data)
    setActiveImage(dataReponse?.data?.productImage[0])
   

  }



  console.log("data",data)

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageURL)=>{
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) =>{
    setZoomImage(true)
    const { left , top, width , height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top , width , height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }

  const handleAddToCart = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")

  }



  return (
    <div  className='container mx-auto p-4'>
      <div className='bg-white min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/**product image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

         <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
         <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' 
         onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>
                {/**product zoom */}
                {
                  zoomImage && (
                    <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                    <div
                         className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-250'
                                 style={{
                                   background : `url(${activeImage})`,
                                   backgroundRepeat : 'no-repeat',
                                   backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
         
                                 }}
                     >
     
                    </div>
               </div>
                  )
                }
         

         </div>

          <div className='h-full'>
            {
              loading ? (
               <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {
                    productImageListLoading.map((el,index)=>{
                      return(
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                        </div>
                      )
                    })
                }
               </div>
                
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {
                    data?.productImage?.map((imgURL,index)=>{
                      return(
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={imgURL}>
                          <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' 
                          onMouseEnter={()=>handleMouseEnterProduct(imgURL)}  onClick={()=>handleMouseEnterProduct(imgURL)}/>
                        </div>
                      )
                    })
                }
               </div>
              )

            }
          </div>
          

        </div>
        {/**product details */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
        <p className=' bg-slate-200 animate-pulse h-4 w-full rounded-full inline-block '></p>
        <h2 className='text-2xl lg:text-4xl font-medium h-4 w-full'></h2>
        <p className='capitalize text-slate-400 bg-slate-200 animate-pulse h-6 lg:h-8 w-full'></p>

           <div className='text-yellow-300 flex items-center gap-1'>
         

           </div>

           <div className='items-center gap-2 text-2xl font-medium my-1'>
           <p className='text-red-600'></p>
           <p className='text-purple-600 '></p>
           </div>

           <div className='flex items-center gap-3 my-2'>
           <button className='h-6 bg-slate-200 rounded animate-pulse' ></button>
           <button className='h-6 bg-slate-200 rounded animate-pulse'></button>
           </div>
            
            <div>
              <p className='text-slate-600 font-medium my-1'> </p>
              <p></p>
            </div>


            </div>
          ) : (
            <div className='flex flex-col gap-1'>
        <p className='  h-6 lg:h-8 w-full rounded-full inline-block'>{data?.brandName}</p>
        <h2 className='text-2xl lg:text-4xl font-medium '>{data?.category}</h2>
        <p className='capitalize text-slate-400 '>{data?.category}</p>

           <div className='text-yellow-300 flex items-center gap-1'>
             <FaFaceGrinStars/>
             <FaFaceGrinStars/>
             <FaFaceGrinStars/>
             <FaFaceGrinStars/>
             <FaRegGrinStars/>

           </div>

           <div className='items-center gap-2 text-2xl font-medium my-1'>
           <p className='text-red-600'>{displayINRCurrency(data?.sellingPrice)}</p>
           <p className='text-purple-600 '>{data?.heightvalues}</p>
           </div>

           <div className='flex items-center gap-3 my-2'>
           <button className='border-2 border-yellow-600 rounded px-3 py-1 min-w-[120px] text-yellow-400 font-medium hover:bg-yellow-600 hover:text-white' 
           onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
           <button className='border-2 border-yellow-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-yellow-600 hover:text-yellow-600 hover:bg-white' 
           onClick={(e)=>handleAddToCart(e,data?._id)} >Add To Cart</button>
           </div>
           
            <div>
              <p className='text-slate-600 font-medium my-1'>Description : </p>
              <p>{data?.description}</p>
            </div>


            </div>
          )
        }

      </div>

        {
          data.category && (
            <CategoryWiseProductDisplay category={data?.category} heading={"recommended product"}/>

          )
        }
     


    </div>
  )
}

export default ProductDetails