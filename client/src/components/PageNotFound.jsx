import React from 'react'
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  function handleGoToHome() {
    navigate("/")
  }
  return (
    <div className='w-full'>
      <div className='w-[90%] md:w-[700px] mx-auto'>
        <div className="flex flex-col gap-3 justify-center items-center">
          <img className="w-[300px] h-[300px] mt-10 mb-4" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/v1677828825/portal/m/seo_error_cat.png" alt="image" />
          <p className="text-xl font-bold">Page not found</p>
          <p className="opacity-80 -mt-2 max-w-[50%] text-center">Uh-oh! Looks like the page you are trying to access, doesn't exist. Please start afresh.</p>
          <button onClick={handleGoToHome} className="text-sm mt-4 bg-black text-white font-bold px-8 py-3 rounded-xl  uppercase cursor-pointer hover:shadow-[2px_2px_10px_rgba(0,0,0,0.3)]">Home</button>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound