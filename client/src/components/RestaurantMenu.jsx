import {
  ChevronDown,
  ChevronUp,
  ChevronUpIcon,
  MoveLeft,
  MoveRight,
  SearchIcon,
  Star,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext, Coordinates } from "../context/contextApi";

let veg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1024px-Veg_symbol.svg.png";
let nonVeg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png";

const RestaurantMenu = () => {
  const { id } = useParams();
  let mainId = id.split("-").at(-1).substring(4);

  const [value, setValue] = useState(0);
  const [pickValue, setPickValue] = useState(0);

  const [currIndex, setCurrIndex] = useState(0);
  const { coord: { lat, lng } } = useContext(Coordinates)

  const [menuData, setMenuData] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topPicksData, setTopPicksData] = useState(null);

  async function fetchMenu() {
    let data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`
    );
    let res = await data.json();
    // console.log(res);
    // console.log(
    //   (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
    //     (data) => data?.card?.card?.title === "Top Picks"
    //   )
    // );

    setResInfo(res?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    setTopPicksData(
      (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data?.card?.card?.title === "Top Picks"
      )
    );
    let actualMenu =
      (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      );
    setMenuData(actualMenu);
    // console.log(topPicksData);
  }

  function handleNext() {
    setValue((prev) => prev + 50);
  }
  function handlePrev() {
    setValue((prev) => prev - 50);
  }
  function pickHandleNext() {
    setPickValue((prev) => prev + 50);
  }
  function pickHandlePrev() {
    setPickValue((prev) => prev - 50);
  }

  // console.log(menuData);

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className='w-full'>
      <div className='w-[750px] mx-auto mt-8'>
        <p className='text-[12px] text-slate-500 font-semibold'>
          <Link to={"/"}>
            <span className='hover:text-slate-700 mr-2 cursor-pointer'>
              Home
            </span>
          </Link>
          /
          <Link to={"/"}>
            <span className='hover:text-slate-700 mx-2 cursor-pointer'>
              {resInfo.city}
            </span>
          </Link>
          /<span className='text-slate-700 mx-2'>{resInfo.name}</span>
        </p>

        <h1 className='font-bold ml-2 text-2xl mt-7'>{resInfo.name}</h1>

        <div className='w-full h-[190px] bg-gradient-to-t from-gray-200/70 to-transparent mt-3 rounded-[30px] p-4'>
          <div className='flex flex-col justify-center gap-[3px] w-full h-full border border-slate-200/70 rounded-[30px] bg-white p-4 pt-0'>
            <div className='flex items-center gap-1 font-bold mt-1'>
              <Star fill='green'
                stroke='green' size={16} strokeWidth={1} />
              <span>{resInfo.avgRating}</span>
              <span>({resInfo.totalRatingsString})</span>
              <div className='flex items-center mx-1'>
                <div className='w-1 h-1 bg-gray-400 rounded-[100%] mt-[1px]'></div>
              </div>
              <span className=''>{resInfo.costForTwoMessage}</span>
            </div>

            <p className='underline font-bold text-orange-600 text-[14px]'>
              {resInfo?.cuisines?.join(", ")}
            </p>

            <div className='mt-2 flex gap-3'>
              <div className='w-[9px] flex flex-col justify-center items-center'>
                <div className='w-[7px] h-[7px] bg-gray-300 rounded-full'></div>
                <div className='w-[1px] h-[25px] bg-gray-300'></div>
                <div className='w-[7px] h-[7px] bg-gray-300 rounded-full'></div>
              </div>

              <div className='flex gap-2 flex-col font-bold'>
                <p>
                  Outlet{" "}
                  <span className='font-normal text-gray-400'>
                    {resInfo?.areaName}
                  </span>
                </p>
                <p>{resInfo?.sla?.slaString}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full overflow-hidden'>
          <div className='flex justify-between mt-8'>
            <h1 className='font-bold text-xl'>Deals for you</h1>
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
                    `w-4 h-4 ` +
                    (value <= 0 ? "text-gray-300" : "text-gray-800")
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
                    `w-4 h-4 ` +
                    (value >= 108 ? "text-gray-300" : "text-gray-800")
                  }
                />
              </div>
            </div>
          </div>
          <div
            className='flex gap-4 mt-4 duration-300'
            style={{ translate: `-${value}%` }}
          >
            {discountData.map((data, i) => (
              <Discount data={data} key={i} />
            ))}
          </div>
        </div>

        <div className='text-center mt-7 tracking-[0.3rem]'>MENU</div>

        <div className='relative w-full cursor-pointer'>
          <div className='w-full px-6 py-3 font-semibold text-[16px] bg-gray-300/40 mt-7 rounded-2xl text-gray-500 text-center'>
            Search for dishes
          </div>
          <SearchIcon className='absolute w-5 h-5 right-7 top-3 text-gray-500' />
        </div>

        {topPicksData && topPicksData.length > 0 ? (
          <div className='w-full overflow-hidden'>
            <div className='flex justify-between mt-8'>
              <h1 className='font-bold text-xl'>
                {topPicksData[0]?.card?.card?.title}
              </h1>
              <div className='flex items-center gap-1'>
                <div
                  onClick={pickHandlePrev}
                  className={
                    ` rounded-full p-2 cursor-pointer ` +
                    (pickValue <= 0 ? "bg-gray-100" : "bg-gray-300")
                  }
                >
                  <MoveLeft
                    className={
                      `w-4 h-4 ` +
                      ((pickValue <= 0 ? "bg-gray-100" : "bg-gray-300")
                        <= 0 ? "text-gray-300" : "text-gray-800")
                    }
                  />
                </div>
                <div
                  onClick={pickHandleNext}
                  className={
                    ` rounded-full p-2 cursor-pointer ` +
                    (pickValue >= 108 ? "bg-gray-100" : "bg-gray-300")
                  }
                >
                  <MoveRight
                    className={
                      `w-4 h-4 ` +
                      (pickValue >= 108 ? "text-gray-300" : "text-gray-800")
                    }
                  />
                </div>
              </div>
            </div>
            <div
              className='flex gap-4 mt-5 duration-300'
              style={{ translate: `-${pickValue}%` }}
            >
              {topPicksData[0]?.card?.card?.carousel.map(
                (
                  {
                    creativeId,
                    dish: {
                      info: { price, defaultPrice },
                    },
                  },
                  i
                ) =>
                  <div className="relative min-w-[320px] h-[340px]">
                    <img className="w-full h-full object-cover rounded-2xl" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" + (creativeId)} alt="top-picks-image" />
                    <div className="absolute bottom-4 w-full flex justify-between items-center text-white px-4">
                      <p className="font-bold">₹{defaultPrice / 100 || price / 100}</p>
                      <button className="px-10 py-2 font-bold text-green-600 bg-white rounded-xl hover:bg-gray-300 cursor-pointer">ADD</button>
                    </div>
                  </div>
              )}
            </div>
          </div>
        ) : null}
        <div>
          {menuData.map(({ card: { card } }) => (
            <MenuCard card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

function MenuCard({ card }) {
  let closeVar = false;
  if (card["@type"]) {
    closeVar = true;
  }

  const [isOpen, setIsOpen] = useState(closeVar);

  function toggleDrowDown() {
    setIsOpen((prev) => !prev);
  }

  if (card?.itemCards) {
    const { title, itemCards } = card;
    return (
      <>
        <div className='my-5 mx-3'>
          <div className='flex justify-between'>
            <h1 className={"font-bold text-" + (card["@type"] ? "xl" : "base")}>
              {title}({itemCards.length})
            </h1>
            <ChevronUp
              onClick={toggleDrowDown}
              className={`transform transition-transform duration-200 ${isOpen ? "" : "rotate-180"
                }`}
            />
          </div>
          {isOpen && <DetailMenu itemCards={itemCards} />}
        </div>

        <hr
          className={
            "my-3 text-gray-300/40 border-8"
          }
        />
      </>
    );
  } else {
    const { categories } = card;
    // console.log(categories);
    return (
      <div>
        <h1 className='font-bold text-xl'>{categories.title}</h1>
        {categories.map((data) => {
          <MenuCard card={data} />;
        })}
      </div>
    );
  }
}

function DetailMenuCard({ info }) {
  const {
    name,
    price,
    defaultPrice,
    finalPrice,
    itemAttribute: { vegClassifier },
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description,
    imageId,
  } = info;
  const [isMore, setIsMore] = useState(false);

  const { cartData, setCartData } = useContext(CartContext)

  if (description) {
    let trimDes = description.substring(0, 135) + "..."
    // console.log(trimDes);
  }


  function handleAddToCart() {
    const isAdded = cartData.find((data) => data.id === info.id)
    if (!isAdded) {
      setCartData((prev) => [...prev, info])
      localStorage.setItem("cartData", JSON.stringify([...cartData, info]))
    } else {
      alert("Already there")
    }
  }

  return (
    <>
      <div className='flex w-full min-h-[150px] justify-between'>
        <div className='w-[78%]'>
          <div className="w-[95%]">
            <img
              className='w-4 h-4 mb-1'
              src={vegClassifier === "VEG" ? veg : nonVeg}
              alt=''
            />
            <p className='font-bold text-lg'>{name}</p>
            <div className='flex gap-2 font-bold text-[15px]'>
              <p
                className={`${finalPrice ? "line-through text-gray-400" : ""
                  }`}
              >
                ₹{price / 100 || defaultPrice / 100}
              </p>
              {finalPrice && <p>₹{finalPrice / 100}</p>}
            </div>
            {rating && (
              <div className='flex items-center mb-1'>
                <Star
                  fill='green'
                  stroke='green'
                  strokeWidth={1}
                  size={13}
                />
                <span className='ml-1 mr font-bold'>{rating}</span>
                <span className='font-semibold'>({ratingCountV2})</span>
              </div>
            )}

            {description ? (
              description.length > 140 ? (
                <div>
                  <span className="text-gray-500">
                    {isMore ? description : description.substring(0, 135) + "..."}
                  </span>
                  <button
                    className="font-bold text-gray-500"
                    onClick={() => setIsMore(!isMore)}
                  >
                    &nbsp;{isMore ? "less" : "more"}
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">{description}</p>
              )
            ) : null}
          </div>
        </div>
        <div className={`w-[22%] ${!imageId ? "flex justify-center items-center h-[160px]" : ""}`}>
          <div className={`w-full ${imageId ? "h-[160px] flex flex-col items-center" : "flex items-center justify-center"}`}>
            {imageId && (
              <img
                className='h-full object-cover rounded-xl'
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                  imageId
                }
                alt=''
              />
            )}
            <button
              className={`${imageId ? "-mt-6" : ""
                } w-[80%] font-bold bg-white py-[6px] shadow-xl border border-gray-100 text-lg text-green-600 rounded-xl hover:bg-gray-300 cursor-pointer`}
              onClick={handleAddToCart}
            >
              ADD
            </button>
          </div>
        </div>

      </div>
      <hr className='my-5 text-gray-300 mt-10' />
    </>
  )
}

function DetailMenu({ itemCards }) {
  // console.log(itemCards);
  return (
    <div className='my-3'>
      {itemCards.map(
        ({
          card: {
            info
          },
        }) => {
          return (
            <DetailMenuCard info={info} />
          )
        }
      )}
    </div>
  );
}

function Discount({
  data: {
    info: { header, offerLogo, couponCode },
  },
}) {
  // console.log({ header, offerLogo, couponCode });

  return couponCode ? (
    <div className='flex items-center gap-4 min-w-[328px] h-[76px] p-3 border rounded-2xl border-gray-200'>
      <div className='w-12 h-12'>
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`}
          alt=''
        />
      </div>
      <div>
        <h2 className='font-bold text-lg'>{header}</h2>
        <p className='font-semibold text-gray-500 text-sm'>{couponCode}</p>
      </div>
    </div>
  ) : (
    ""
  );
}

export default RestaurantMenu;
