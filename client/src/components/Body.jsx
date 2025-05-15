import React, { useContext, useEffect, useState } from "react";
import { MoveRight, MoveLeft, LampCeiling } from "lucide-react";
import OnYourMind from "./OnYourMind";
import TopRestaurant from "./TopRestaurant";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import { Coordinates } from "../context/contextApi";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";
import useRestaurantData from "../hooks/useRestaurantData";

const Body = () => {

  const [topRestaurantsData, topResTitle, onYourMindData, onlineTitle, data]
    = useRestaurantData()

  const filterVal = useSelector((state) => state.filterSlice.filterVal);

  const filteredData = topRestaurantsData?.filter((item) => {
    // console.log(item);
    // console.log(filterVal);
    // console.log(item?.info?.aggregatedDiscountInfoV3);
    if (!filterVal) return true;
    switch (filterVal) {
      case "Ratings 4.0+":
        return item?.info?.avgRating > 4.0;
      case "Offers":
        return item?.info?.aggregatedDiscountInfoV3 !== undefined;
      case "Rs. 300-Rs. 600":
        return (
          item?.info?.costForTwo?.split(" ")[0].slice(1) >= 300 &&
          item?.info?.costForTwo?.split(" ")[0].slice(1) <= 600
        );
      case "Less than Rs. 300":
        return item?.info?.costForTwo?.split(" ")[0].slice(1) <= 300;
      default:
        return;
    }
  });

  if (data.communication) {
    return (
      <div className='w-full h-[500px] flex justify-center items-center'>
        <div className='flex flex-col gap-4 w-[30%] justify-center items-center'>
          <div className='w-58 h-58 '>
            <img
              className='h-full w-full object-cover'
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png`}
              alt=''
            />
          </div>
          <h1 className='font-bold text-xl'>
            {data?.cards[0]?.card?.card?.title}
          </h1>
          <p className='font-semibold text-lg max-w-[80%] text-center'>
            We don’t have any services here till now. Try changing location.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      {topRestaurantsData.length ? (
        <div className='w-[95%] sm:w-[90%] lg:w-[80%] mx-auto overflow-hidden mt-3'>
          {onYourMindData?.length ? (
            <>
              <OnYourMind data={onYourMindData} />
              <TopRestaurant data={topRestaurantsData} title={topResTitle} />
            </>
          ) : (
            ""
          )}

          <OnlineFoodDelivery
            data={filterVal ? filteredData : topRestaurantsData}
            title={onlineTitle}
          />
        </div>
      ) : (
        <Shimmer />
      )}
    </div>
  );
};

export default Body;

