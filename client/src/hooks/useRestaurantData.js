import { useContext, useEffect, useState } from "react";
import { Coordinates } from "../context/contextApi";

function useRestaurantData() {
  const [topRestaurantsData, setTopRestaurantsData] = useState([]);
  const [onYourMindData, setOnYourMindData] = useState([]);
  const [topResTitle, setTopResTitle] = useState([]);
  const [onlineTitle, setOnlineTitle] = useState([]);
  const [data, setData] = useState({});
  const {
    coord: { lat, lng },
  } = useContext(Coordinates);
  // console.log(topRestaurantsData);

  async function fetchData() {
    const targetUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    const response = await fetch(targetUrl);
    const result = await response.json();
    // console.log(result.data?.cards[0]?.card?.card?.imageLink);

    setTopResTitle(result?.data?.cards[1]?.card?.card?.header?.title);
    setOnlineTitle(result?.data?.cards[2]?.card?.card?.title);
    setData(result?.data);
    let topResData = result?.data?.cards?.find(
      (data) => data?.card?.card?.id === "top_brands_for_you"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    let topResData2 = result?.data?.cards?.find(
      (data) => data?.card?.card?.id === "restaurant_grid_listing_v2"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setTopRestaurantsData(topResData2 || topResData);

    let mindData = result?.data?.cards.find(
      (data) => data?.card?.card?.id === "whats_on_your_mind"
    )?.card?.card?.imageGridCards?.info;

    setOnYourMindData(mindData);
  }

  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  return [topRestaurantsData, topResTitle, onYourMindData, onlineTitle, data];
}

export default useRestaurantData;
