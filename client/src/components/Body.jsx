import React, { useContext, useEffect, useState } from "react";
import { MoveRight, MoveLeft, LampCeiling } from "lucide-react";
import OnYourMind from "./OnYourMind";
import TopRestaurant from "./TopRestaurant";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import { Coordinates } from "../context/contextApi";
import { useSelector } from "react-redux";

const Body = () => {
  const [topRestaurantsData, setTopRestaurantsData] = useState([]);
  const [onYourMindData, setOnYourMindData] = useState([]);
  const [topResTitle, setTopResTitle] = useState([]);
  const [onlineTitle, setOnlineTitle] = useState([]);
  const [data, setData] = useState({});
  const { coord: { lat, lng } } = useContext(Coordinates)
  // console.log(topRestaurantsData);


  async function fetchData() {
    const targetUrl =
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    const response = await fetch(targetUrl);
    const result = await response.json();
    // console.log(result.data?.cards[0]?.card?.card?.imageLink);

    setTopResTitle(result?.data?.cards[1]?.card?.card?.header?.title)
    setOnlineTitle(result?.data?.cards[2]?.card?.card?.title)
    setData(result?.data)

    setOnYourMindData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);

    setTopRestaurantsData(
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  }

  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  const filterVal = useSelector((state) => state.filterSlice.filterVal)


  const filteredData = topRestaurantsData.filter((item) => {
    // console.log(item);
    // console.log(filterVal);
    // console.log(item?.info?.aggregatedDiscountInfoV3);
    if (!filterVal) return true;
    switch (filterVal) {
      case "Ratings 4.0+": return item?.info?.avgRating > 4.0
      case "Offers": return item?.info?.aggregatedDiscountInfoV3 !== undefined
      case "Rs. 300-Rs. 600": return (item?.info?.costForTwo?.split(" ")[0].slice(1) >= 300 && item?.info?.costForTwo?.split(" ")[0].slice(1) <= 600);
      case "Less than Rs. 300": return item?.info?.costForTwo?.split(" ")[0].slice(1) <= 300
      default: return;
    }
  })

  if (data.communication) {
    return (
      <div className="w-full h-[500px] flex justify-center items-center">
        <div className="flex flex-col gap-4 w-[30%] justify-center items-center">
          <div className="w-58 h-58 ">
            <img className="h-full w-full object-cover" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png`} alt="" />
          </div>
          <h1 className="font-bold text-xl">{data?.cards[0]?.card?.card?.title}</h1>
          <p className="font-semibold text-lg max-w-[80%] text-center">We don’t have any services here till now. Try changing location.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full'>
      <div className='w-[95%] sm:w-[90%] lg:w-[80%] mx-auto overflow-hidden mt-3'>
        <OnYourMind data={onYourMindData} />
        <TopRestaurant data={topRestaurantsData} title={topResTitle} />
        <OnlineFoodDelivery data={filterVal ? filteredData : topRestaurantsData} title={onlineTitle} />
      </div>
    </div>
  );
};

export default Body;
