import React, { useEffect, useState } from 'react'
import { MoveLeft, MoveRight } from 'lucide-react';

const OnYourMind = ({ data }) => {
  // const [data, setData] = useState([]);
  const [value, setValue] = useState(0);

  function handleNext() {
    value >= 108 ? "" : setValue((prev) => prev + 27);
    // console.log(value);
  }
  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 27);
  }
  return (
    <>
      <div className='flex justify-between'>
        <h1 className='font-bold text-2xl ml-4'>What's on your mind?</h1>
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
        className='flex mt-2 duration-300'
        style={{ transform: `translateX(-${value}%)` }}
      >
        {data.map((item) => (
          <img
            key={item.id}
            className='w-32'
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
            alt=''
          />
        ))}
      </div>
      <hr className="border text-gray-200 mt-8" />
    </>
  )
}

export default OnYourMind