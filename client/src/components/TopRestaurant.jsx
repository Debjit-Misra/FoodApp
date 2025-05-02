import { MoveLeft, MoveRight, Star } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import RestaurantCard from "./RestaurantCard";

const TopRestaurant = ({ data = [], title }) => {
  const [value, setValue] = useState(0);
  // const [data, setData] = useState([]);

  // async function fetchData() {
  //   const targetUrl =
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.6210377&lng=88.2851179&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  //   const response = await fetch(targetUrl);
  //   const result = await response.json();
  //   console.log(
  //     result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
  //       ?.restaurants
  //   );
  //   setData(
  //     result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
  //       ?.restaurants
  //   );
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  function handleNext() {
    setValue((prev) => prev + 50);
  }
  function handlePrev() {
    setValue((prev) => prev - 50);
  }

  return (
    <div className='mt-10'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-2xl ml-4'>
          {title}
        </h1>
        <div className='flex items-center gap-1'>
          <div
            onClick={handlePrev}
            className={
              ` rounded-full p-2 cursor-pointer ` +
              (value <= 0 ? "bg-gray-100" : "bg-gray-300")
            }
          >
            <MoveLeft
              className={
                `w-4 h-4 ` + (value <= 0 ? "text-gray-300" : "text-gray-800")
              }
            />
          </div>
          <div
            onClick={handleNext}
            className={
              ` rounded-full p-2 cursor-pointer ` +
              (value >= 108 ? "bg-gray-100" : "bg-gray-300")
            }
          >
            <MoveRight
              className={
                `w-4 h-4 ` + (value >= 108 ? "text-gray-300" : "text-gray-800")
              }
            />
          </div>
        </div>
      </div>
      <div
        className='flex gap-2 mt-4 duration-300 p-5'
        style={{ translate: `-${value}%` }}
      >
        {data.map(({ info, cta: { link } }) => (
          <div key={info?.id} className='duration-300 hover:scale-95'>
            <RestaurantCard {...info} link={link} />
          </div>
        ))}
      </div>
      <hr className='border text-gray-200 mt-8' />
    </div>
  );
};

export default TopRestaurant;
