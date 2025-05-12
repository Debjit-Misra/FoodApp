import React from "react";
import { MoveRight, Star } from "lucide-react";
import { nonVeg, veg } from "../utils/links";
import AddToCardBtn from "./AddToCardBtn";
import {
  setSimilarResDish,
} from "../utils/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { clearCart } from "../utils/cartSlice";

const DishesCardSearch = ({ data, handleIsDiffRes }) => {
  const {
    info,
    restaurant: { info: resInfo },
    hideRestaurantDetails = false,
  } = data;
  const { imageId = "", name, price, isVeg = 0, id: itemId } = info;
  const {
    id,
    name: resName,
    avgRating,
    sla: { slaString },
    slugs: { city, restaurant: resLocation },
  } = resInfo;

  const { id: cartResId } = useSelector((state) => state.cartSlice.resInfo);

  const dispatch = useDispatch();

  function handleSameRes() {
    if (cartResId === id || !cartResId) {
      dispatch(
        setSimilarResDish({
          isSimilarResDishes: true,
          city: city,
          resLocation: resLocation,
          resId: id,
          itemId: itemId,
        })
      );
    }
  }

  return (
    <>
      <div className='bg-white  px-4 pt-4 pb-6 rounded-2xl'>
        {!hideRestaurantDetails && (
          <>
            <Link to={`/restaurantMenu/${resLocation}-rest${id}`}>
              <div className='flex items-center justify-between'>
                <div className=''>
                  <p className='text-[#4d5054] text-sm font-bold'>
                    By&nbsp;{resName}
                  </p>
                  <div className='flex items-center text-[#676a6d] text-[12px] font-semibold'>
                    <Star
                      size={12}
                      fill='#676a6d'
                      stroke='#676a6d'
                      className=''
                    />
                    <span className='ml-1'>{avgRating}</span>
                    <span className='mx-1'>.</span>
                    <span className=''>{slaString}</span>
                  </div>
                </div>
                <MoveRight className='text-[#8b8e91]' />
              </div>
              <div className='border-1 border-dashed mt-3 text-[#d3d7db]'></div>
            </Link>
          </>
        )}
        <div className='flex justify-between mt-4'>
          <div className='w-[60%] '>
            <div className='w-5 h-5'>
              {isVeg ? <img src={veg} alt='' /> : <img src={nonVeg} alt='' />}
            </div>
            <p className='text-lg text-[#414449] font-bold mt-1'>{name}</p>
            <p className='font-bold text-[#414449]'>₹{price / 100}</p>
            <button className='py-1 px-2 text-sm font-semibold text-[#676a6d] border border-[#8b8e91] mt-2 rounded-2xl'>
              More Details
            </button>
          </div>
          <div
            className={`w-[40%] ${!imageId ? "flex justify-center items-center h-[160px]" : ""
              }`}
          >
            <div
              className={`w-full relative  ${imageId
                ? "flex flex-col items-center"
                : "flex items-center justify-center"
                }`}
            >
              {imageId && (
                <img
                  className='h-[140px] w-full object-cover rounded-xl '
                  src={
                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                    imageId
                  }
                  alt=''
                />
              )}
              <div onClick={handleSameRes} className='w-[80%]'>
                <AddToCardBtn
                  info={info}
                  resInfo={resInfo}
                  handleIsDiffRes={handleIsDiffRes}
                />
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default DishesCardSearch;
