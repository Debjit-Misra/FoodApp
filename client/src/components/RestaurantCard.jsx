import { Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = (info) => {
  // console.log(info);
  return (
    <Link to={`/restaurantMenu/${info.link.split("/").at(-1)}`}>
      <div className='relative min-w-[273px] h-[183px]  rounded-2xl overflow-hidden'>
        <img
          className='w-full h-full object-cover'
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/" +
            info?.cloudinaryImageId
          }
          alt='restaurant-image'
        />
        <div className='absolute top-0 bg-gradient-to-t from-black/90 from-2% to-transparent to-50%  w-full h-full'></div>
        <p className='absolute bottom-0 text-white text-xl font-bold ml-3 mb-2'>
          {info?.aggregatedDiscountInfoV3
            ? info?.aggregatedDiscountInfoV3?.header +
            " " +
            info?.aggregatedDiscountInfoV3?.subHeader
            : ""}
        </p>
      </div>
      <div className='mt-2 text-base font-semibold text-gray-700'>
        <h2 className='text-lg font-semibold text-gray-700'>{info.name}</h2>
        <div className='flex items-center gap-1'>
          <Star className='text-green-500 w-4 h-4' />
          <span>{info?.avgRating}</span>
          <div className='flex items-center'>
            <div className='w-1 h-1 bg-gray-700 rounded-[100%] mt-[1px]'></div>
          </div>
          <span className='font-bold'>{info?.sla?.slaString}</span>
        </div>
        <p className='line-clamp-1 text-black/50'>
          {info?.cuisines.join(", ")}
        </p>
        <p className='line-clamp-1 text-black/50'>{info?.locality}</p>
      </div>
    </Link>
  );
};

export default RestaurantCard;
