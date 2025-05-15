import { ChevronLeft, SearchIcon, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import DishesCardSearch from "./DishesCardSearch";
import RestaurantCardSearch, { withHoc } from "./RestaurantCardSearch";
import { Coordinates } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { resetSimilarResDish, toggleDiffRes } from "../utils/toggleSlice";
import { clearCart } from "../utils/cartSlice";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [selectedResDish, setSelectedResDish] = useState(null);
  const [similarResDishes, setSimilarResDishes] = useState([]);
  console.log(selectedResDish);

  const {
    coord: { lat, lng },
  } = useContext(Coordinates);

  const PromotedRes = withHoc(RestaurantCardSearch)

  const filterOptions = ["Restaurant", "Dishes"];

  const [activeBtn, setActiveBtn] = useState("Dishes");

  const { isSimilarResDishes, city, resLocation, resId, itemId } = useSelector(
    (state) => state.toggleSlice.similarResDish
  );

  const dispatch = useDispatch();

  function handleFilterBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? activeBtn : filterName);
  }

  function handleSearchQuery(e) {
    let val = e.target.value;
    // console.log(val);
    if (e.keyCode === 13) {
      setSearchQuery(val);
      setSelectedResDish(null);
      setDishes([]);
    }
  }

  async function fetchSimilarResDishes() {
    let pathname = `/city/${city}/${resLocation}`
    let encodedPath = encodeURIComponent(pathname)
    let data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`
    );
    let res = await data.json();
    // console.log(res);
    setSelectedResDish(res?.data?.cards[1]);
    setSimilarResDishes(res?.data?.cards[2]?.card?.card?.cards);
    dispatch(resetSimilarResDish())
    // console.log(res?.data?.cards[1]);
    // console.log(res?.data?.cards[2]?.card?.card?.cards);
  }

  async function fetchDishes() {
    let data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=c4ff91ba-82e9-c3a3-1773-5a3ceaa1ea9d`
    );
    let res = await data.json();
    let finalData =
      (res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(
        (data) => data?.card?.card?.info
      );
    setDishes(finalData);
    // console.log((res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(data => data?.card?.card?.info));
  }

  async function fetchRestaurantData() {
    let data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=c4ff91ba-82e9-c3a3-1773-5a3ceaa1ea9d&selectedPLTab=RESTAURANT`
    );
    let res = await data.json();
    let finalData =
      (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(
        (data) => data?.card?.card?.info
      );
    setRestaurantData(finalData);
    // console.log(finalData);
    // console.log(res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards);
  }

  useEffect(() => {
    if (isSimilarResDishes) {
      fetchSimilarResDishes();
    }
  }, [isSimilarResDishes]);

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    // setSearchQuery("")
    fetchDishes();
    fetchRestaurantData();
  }, [searchQuery]);

  const isDiffRes = useSelector((state) => state.toggleSlice.isDiffRes);

  function handleIsDiffRes() {
    dispatch(toggleDiffRes());
  }
  function handleClearCart() {
    dispatch(clearCart());
    handleIsDiffRes();
  }

  return (
    <div className='w-full'>
      <div className='w-[90%] xl:w-[60%] mx-auto'>
        <div className='relative mt-12'>
          <input
            className='w-full font-bold text-black border border-gray-300 rounded-xl  px-10 py-3 placeholder-gray-500  focus:outline-none'
            type='text'
            placeholder='Search for restaurantand food'
            // onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => handleSearchQuery(e)}
          />
          <ChevronLeft
            onClick={() => setSearchQuery("")}
            className='absolute ml-2 mt-[1px] top-1/2 -translate-y-1/2 opacity-60'
          />

          <SearchIcon className='absolute h-5 w-5 right-4 top-1/2 -translate-y-1/2 opacity-70' />
        </div>

        {!selectedResDish && (
          <div className='flex flex-wrap gap-3 my-6'>
            {filterOptions.map((filterName) => (
              <button
                onClick={() => handleFilterBtn(filterName)}
                className={
                  "filterBtn flex items-center gap-2 font-bold " +
                  (activeBtn === filterName ? "active-search" : "")
                }
              >
                {filterName}
              </button>
            ))}
          </div>
        )}

        {searchQuery && (
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f4f5f7] px-4 py-6'>
            {selectedResDish ?
              <>
                <div>
                  <p className="mb-4 font-bold text-lg">Items added to cart</p>
                  <DishesCardSearch data={selectedResDish.card.card} />
                  <p className="mt-6 mb-4 font-bold text-lg">More dishes from this restaurant</p>
                </div>
                <br />
                {
                  similarResDishes.map((data) => <DishesCardSearch data={{ ...data.card, restaurant: selectedResDish.card.card.restaurant }} />)
                }
              </>
              : activeBtn === "Dishes"
                ? dishes.map((data) => (
                  <DishesCardSearch
                    data={data.card.card}
                    handleIsDiffRes={handleIsDiffRes}
                  />
                ))
                : restaurantData.map((data) => (
                  data?.card?.card?.info?.promoted ? <PromotedRes data={data} /> :
                    <RestaurantCardSearch data={data} />
                ))}
          </div>
        )}
        {isDiffRes && (
          <div
            className='fixed z-50 w-[520px] h-[200px] left-1/2 -translate-x-1/2 bottom-6 bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.2),_0px_0px_15px_rgba(0,0,0,0.2)] p-3 flex justify-center items-center
'
          >
            <div className='w-[90%] flex flex-col'>
              <h2 className='text-xl font-bold'>Items already in cart</h2>
              <p className='text-gray-900 mt-1'>
                Your cart contains items from other restaurant. Would you like
                to reset your cart for adding items from this restaurant?
              </p>
              <div className='flex gap-5 justify-between w-full mt-4'>
                <button
                  className='w-full border-2 border-green-600 py-2 text-green-700 font-bold text-lg uppercase hover:shadow-[0px_0px_8px_rgba(0,0,0,0.2)] cursor-pointer'
                  onClick={handleIsDiffRes}
                >
                  No
                </button>
                <button
                  className='w-full bg-green-600 py-2 text-white font-bold text-lg uppercase hover:shadow-[0px_0px_8px_rgba(0,0,0,0.2)] cursor-pointer'
                  onClick={handleClearCart}
                >
                  Yes, start afresh
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
