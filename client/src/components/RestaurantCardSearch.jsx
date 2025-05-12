import { Star } from "lucide-react";
import React from "react";

const RestaurantCardSearch = ({ data }) => {
  const {
    card: {
      card: {
        info: {
          id,
          cloudinaryImageId,
          promoted = false,
          cuisines,
          costForTwoMessage,
          aggregatedDiscountInfoV3 = {},
          name: resName,
          avgRating,
          sla: { slaString },
        },
      },
    },
  } = data;
  console.log(aggregatedDiscountInfoV3);
  return (
    <div className='bg-white  px-4 py-6 rounded-2xl'>
      <div className=' flex justify-between items-center'>
        <div className='relative w-[25%] h-[100px]'>
          <img
            className='w-full h-full rounded-md object-cover'
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
              cloudinaryImageId
            }
            alt=''
          />
          {aggregatedDiscountInfoV3 &&
            Object.keys(aggregatedDiscountInfoV3).length > 0 && (
              <div
                className={`absolute translate-y-1/2 left-1/2 -translate-x-1/2 w-[80%] border border-gray-200 rounded-md bg-white flex flex-col items-center ${aggregatedDiscountInfoV3.subHeader ? "bottom-2 " : "bottom-1"
                  }`}
              >
                <p className='text-orange-600 font-bold text-sm'>
                  {aggregatedDiscountInfoV3?.header}
                </p>
                <p className='text-[8px] mb-1 text-orange-500 font-bold'>
                  {aggregatedDiscountInfoV3?.subHeader}
                </p>
              </div>
            )}
        </div>
        <div className='w-[70%] flex flex-col'>
          <p className='font-bold line-clamp-1'>{resName}</p>
          <div className='flex items-center text-[#676a6d] font-semibold text-sm'>
            <Star size={12} fill='#676a6d' stroke='#676a6d' className='' />
            <span className='ml-1'>{avgRating}</span>
            <span className='mx-2'>{slaString}</span>
            <span className='mx-2'>{costForTwoMessage}</span>
          </div>
          <p className='line-clamp-1 font-base text-[#838689]'>
            {cuisines.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCardSearch;
