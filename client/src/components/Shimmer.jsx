import React from "react";

const Shimmer = () => {
  return (
    <div className='w-full'>
      <div className='w-full h-[320px] bg-[#171a29] flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-5'>
          <div className='w-20 h-20 loader p-4 opacity-80'>
            <img
              className=''
              src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa'
              alt=''
            />
          </div>
          <h2 className='ml-1 text-white text-2xl font-bold'>
            Looking for great food near ...
          </h2>
        </div>
      </div>

      <div className='w-[80%] mx-auto'>
        <div className="w-[99%] pt-6 pb-10 mx-auto flex flex-wrap gap-6">
          {Array(12).fill().map((_, index) => (
            <div
              key={index}
              className="shimmer-box w-[280px] h-[182px] bg-gray-200 rounded-xl overflow-hidden relative"
            >
              <div className="shimmer absolute inset-0"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;

export function MenuShimmer() {

  return (
    <div className="w-[95%] md:w-[750px] mx-auto">
      <div
        className="shimmer-box w-full h-4 rounded- overflow-hidden relative"
      >
        <div className="shimmer absolute inset-0"></div>
      </div>
      <div className="w-[99%] mt-10 mx-auto flex flex-wrap gap-6 justify-center">
        {Array(2).fill().map((_, index) => (

          <div
            key={index}
            className="shimmer-box w-[45%] h-[250px] bg-gray-200 overflow-hidden relative"
          >
            <div className="shimmer absolute inset-0"></div>
          </div>

        ))}
      </div>
    </div>
  )
}