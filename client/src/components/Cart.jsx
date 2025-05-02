import React, { useContext } from 'react'
import { CartContext } from '../context/contextApi'

const Cart = () => {
  const { cartData, setCartData } = useContext(CartContext)

  function handleRemoveFromCart(idx) {
    let newArr = [...cartData]
    newArr.splice(idx, 1);
    setCartData(newArr);
    localStorage.setItem("cartData", JSON.stringify(newArr))
  }

  if (cartData.length <= 0) {
    return (
      <div className='full'>
        <div className='w-[50%] mx-auto'>
          <h1>kuch order kar bhai</h1>
        </div>
      </div>
    )
  }



  return (
    <div className='full'>
      <div className='w-[50%] mx-auto'>
        {
          cartData.map((data, idx) => {
            return (
              <div className='flex w-full h-200px justify-between my-5 p-2'>
                <div className='w-[70%]'>
                  <h2 className='text-xl font-bold'>{data.name}</h2>
                </div>
                <div className='w-[30%] h-[80%]'>
                  <img
                    className='w-full h-full object-cover rounded-xl'
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                      data.imageId
                    }
                    alt=''
                  />
                  <button
                    className='w-[80%] font-bold bg-red-400 py-[6px] shadow-xl border border-gray-100 text-lg text-white rounded-xl hover:bg-gray-300 cursor-pointer'
                    onClick={() => handleRemoveFromCart(idx)}

                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cart