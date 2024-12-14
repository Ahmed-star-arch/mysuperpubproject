import React, {useState} from 'react'
import loginIcons from '../assest/signin.gif'
import { Link, useNavigate } from 'react-router-dom'
import imageTobase64 from '../helpers/imageTobase64'
import SummaryApi from '../common'
import { toast } from 'react-toastify'

const SignUp = () => {

    const [data,setData]= useState({
        email : "",
        password : "",
        name : "",
        Confirmpassword : "",
        profilpic :"",

    })
    const navigate = useNavigate()

    const handleOnChange = (e) =>{
        const { name , value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUploadPic = async(e) =>{
        const file = e.target.files[0]
        const imagePic = await imageTobase64(file)

        
        setData((preve)=>{
            return{
                ...preve, 
                profilpic : imagePic
            }

        })

    }


    const handleSubmit = async(e) => {
        e.preventDefault()

        if(data.password === data.Confirmpassword){
           
            const dataResponse = await fetch(SummaryApi.signUP.url,{
                method : SummaryApi.signUP.method,
                headers : {
                    "content-type" : "application/json"
                },
                body :JSON.stringify(data)
            })
            const dataApi = await dataResponse.json()

            if(dataApi.success) {
                toast.success(dataApi.message)
                navigate("/login")
            }

            if(dataApi.error) {
                toast.error(dataApi.message)
            }


            console.log("data", dataApi)
        }else{
            toast.error("please check ur password again")
            
        }

        }

  


  return (
<section id='signup'>
    <div className=' mx-auto container p-4'>

        <div className='bg-white p-5  w-full max-w-sm mx-auto'>
            <div className='w-20 h-20 mx-auto full '>
                <div>
                <img src={data.profilpic || loginIcons} alt = 'login icons'/>
                </div>
                <form>
                    <label>
                        <div className='text-xs bg-opacity-80
                         text-green-600 hover:text-green-200 hover:underline'>
                            Upload Photo
                        </div>
                        <input type='file' className='hidden' onChange={handleUploadPic}/>
                    </label>
                </form>
            </div>
            
            <form className='pt-6'onSubmit={handleSubmit}>
            <div className='grid'>
                    <label>Name : </label>
                    <div className='bg-slate-100 p-2'>
                    <input 
                    type='text' placeholder='enter your name' 
                    name='name'
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent'/>
                    </div>
                </div>


                <div className='grid'>
                    <label>Email : </label>
                    <div className='bg-slate-100 p-2'>
                    <input 
                    type='email' placeholder='enter email' 
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent'/>
                    </div>
                </div>

                <div>
                    <label>Password : </label>
                    <div className='bg-slate-100 p-2'>
                        <input 
                        type='password' 
                        placeholder='enter ur password'
                        name='password'
                        value={data.password}
                        onChange={handleOnChange} 
                        required
                        className='w-full h-full outline-none bg-transparent'/>
                    </div>
                    
                </div>

                    <div>
                    <label>Confirm Password : </label>
                    <div className='bg-slate-100 p-2'>
                        <input 
                        type='password' 
                        placeholder='confirm ur password'
                        name='Confirmpassword'
                        value={data.Confirmpassword}
                        onChange={handleOnChange} 
                        required
                        className='w-full h-full outline-none bg-transparent'/>
                    </div>
                    
                </div>
               
                    

                <button className='bg-green-700 hover:bg-green-300 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4 '>Sign up</button>


            </form>

            <p className='my-4'>Already have account ? <Link to={"/login"} className='text-green-300 hover:text-green-200 hover:underline'>Login</Link></p>


        </div>




    </div>

 </section>
  )
}

export default SignUp
