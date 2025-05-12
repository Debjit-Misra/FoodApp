import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../utils/cartSlice';

const AddToCardBtn = ({ info, resInfo, handleIsDiffRes }) => {

  const cartData = useSelector((state) => state.cartSlice.cartItems);


  const getResInfoFromLocalStore = useSelector(
    (state) => state.cartSlice.resInfo
  );
  const dispatch = useDispatch();

  function handleAddToCart() {
    // console.log(resInfo);
    const isAdded = cartData.find((data) => data.id === info.id);
    if (!isAdded) {
      if (
        getResInfoFromLocalStore.name === resInfo.name ||
        getResInfoFromLocalStore.length === 0
      ) {
        dispatch(addToCart({ info, resInfo }));
        toast.success("Food Added to the Cart");
      } else {
        handleIsDiffRes()
      }
    } else {
      toast.error("Already Added", {
        position: "top-right",
      });
    }
  }

  return (
    <button
      className={`absolute w-[80%] bottom-2 translate-y-1/2 font-bold bg-white py-[6px] shadow-xl border border-gray-100 text-lg text-green-600 rounded-lg hover:bg-gray-300 cursor-pointer`}
      onClick={handleAddToCart}
    >
      ADD
    </button>
  )
}

export default AddToCardBtn

