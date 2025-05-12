import React from 'react'
import { useDispatch } from 'react-redux';
import { clearCart } from '../utils/cartSlice';

const ItemAlreadyInCartPopUp = ({ handleIsDiffRes }) => {
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart())
    handleIsDiffRes()
  }
  return (
    <div
      className='fixed z-50 w-[520px] h-[200px] left-1/2 -translate-x-1/2 bottom-6 bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.2),_0px_0px_15px_rgba(0,0,0,0.2)] p-3 flex justify-center items-center
'
    >
      <div className='w-[90%] flex flex-col'>
        <h2 className='text-xl font-bold'>Items already in cart</h2>
        <p className='text-gray-900 mt-1'>
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </p>
        <div className='flex gap-5 justify-between w-full mt-4'>
          <button className='w-full border-2 border-green-600 py-2 text-green-700 font-bold text-lg uppercase hover:shadow-[0px_0px_8px_rgba(0,0,0,0.2)] cursor-pointer' onClick={handleIsDiffRes}>No</button>
          <button className='w-full bg-green-600 py-2 text-white font-bold text-lg uppercase hover:shadow-[0px_0px_8px_rgba(0,0,0,0.2)] cursor-pointer' onClick={handleClearCart}>
            Yes, start afresh
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemAlreadyInCartPopUp