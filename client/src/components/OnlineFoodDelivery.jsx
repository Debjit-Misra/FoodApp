import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setFilterValue } from "../utils/filterSlice";

const OnlineFoodDelivery = ({ data = [], title }) => {

  const filterOptions = ["Ratings 4.0+", "Offers", "Rs. 300-Rs. 600", "Less than Rs. 300"]

  const [activeBtn, setActiveBtn] = useState(null)
  const dispatch = useDispatch()

  function handleFilterBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? null : filterName)
  }
  dispatch(setFilterValue(activeBtn))

  return (
    <div className='mt-7'>
      <h2 className='font-bold text-2xl'>{title}</h2>

      <div className='flex flex-wrap gap-3 mt-4 ml-3'>
        {filterOptions.map((filterName, i) => (
          <button key={i} onClick={() => handleFilterBtn(filterName)} className={'filterBtn flex items-center gap-2 ' + (activeBtn === filterName ? "active" : "")}>
            {filterName}
            <span className={`w-4 h-4 hidden`}>
              <X className="w-full h-full" />
            </span>
          </button>
        ))}
      </div>

      <div className='px-2 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6'>
        {data.map(({ info, cta: { link } }) => (
          <div key={info?.id} className='duration-300 hover:scale-95'>
            <RestaurantCard {...info} link={link} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineFoodDelivery;

