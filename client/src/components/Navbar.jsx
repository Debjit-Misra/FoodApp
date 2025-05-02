import {
  BadgePercent,
  ChevronDown,
  CircleUser,
  X,
  LifeBuoy,
  Search,
  ShoppingBag,
  ShoppingCart,
  MapPin,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CartContext, Coordinates, Visibility } from "../context/contextApi";

const Navbar = () => {
  const { visible, setVisible } = useContext(Visibility);
  // console.log(visible);
  const [searchResult, setSearchResult] = useState([]);
  const [address, setAddress] = useState("");
  const { coord, setCoord } = useContext(Coordinates);
  const { cartData, setCartData } = useContext(CartContext)

  const navItems = [
    {
      name: "Swiggy Corporate",
      icon: ShoppingBag,
      path: '/corporate'
    },
    {
      name: "Search",
      icon: Search,
      path: '/search'
    },
    {
      name: "Offers",
      icon: BadgePercent,
      path: '/offers'

    },
    {
      name: "Help",
      icon: LifeBuoy,
      path: '/help'

    },
    {
      name: "Sign In",
      icon: CircleUser,
      path: '/signin'

    },
    {
      name: "Cart",
      icon: ShoppingCart,
      path: '/cart'

    },
  ];

  function handleVisibility() {
    setVisible((prev) => !prev);
  }

  async function searchResultFunc(val) {
    if (val == "") return;
    const res = await fetch(
      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`
    );
    const data = await res.json();
    setSearchResult(data.data);
    console.log(val);
  }

  async function fetchLatAndLng(id) {
    if (id == "") return;
    handleVisibility();
    const res = await fetch(
      `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
    );
    const data = await res.json();
    setCoord({
      lat: data.data[0].geometry.location.lat,
      lng: data.data[0].geometry.location.lng,
    });
    setAddress(data.data[0].formatted_address);
    // console.log(data.data[0].geometry.location.lat);
    // console.log(data.data[0].geometry.location.lng);
  }

  return (
    <div className='relative w-full'>
      <div className='w-full'>
        <div
          onClick={handleVisibility}
          className={
            "absolute w-full h-full z-30 bg-gray-900/60 " +
            (visible ? "visible" : "invisible")
          }
        ></div>
        <div
          className={
            "absolute flex flex-col items-center bg-white p-5 w-[29%] h-full z-40 duration-500 " +
            (visible ? "left-0" : "-left-[100%]")
          }
        >
          <div className="w-[85%] mr-2 mt-4">
            <X onClick={handleVisibility} className='w-6 h-6 cursor-pointer' />
            <input
              type='text'
              placeholder="Search for area, street name"
              className='border border-gray-300 font-semibold w-full px-4 py-4 text-black mt-4 focus:outline-none focus:shadow-[0_0px_10px_rgb(0,0,0,0.2)] placeholder-gray-400'
              onChange={(e) => searchResultFunc(e.target.value)}
            />
          </div>

          <div className="w-[85%] mr-2 mt-8">
            <ul className="pl-4">
              {searchResult.map((data, index) => {
                const isLast = (index === searchResult.length - 1)
                return (
                  <li className="mb-4 cursor-pointer" onClick={() => fetchLatAndLng(data.place_id)}>
                    <div className="flex gap-2">
                      <div className="">
                        <MapPin className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className={`w-full ${isLast ? "" : "border-b border-gray-400 border-dashed "}`}>
                        <p className="font-semibold text-[16px] max-w-[90%] hover:text-orange-600">{data.structured_formatting.main_text}</p>
                        <p className='text-sm text-gray-500 mb-4 mt-1'>
                          {data.structured_formatting.secondary_text}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className='w-full sticky bg-white z-20 top-0 shadow-[0_3px_10px_rgb(0,0,0,0.1)] h-[80px] flex justify-center items-center'>
        <div className='w-[70%] flex justify-between'>
          <div className='flex items-center'>
            <Link to={"/"}>
              <img
                className='w-20'
                src='https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png'
                alt='logo'
              />
            </Link>
            <div
              className='flex items-center gap-2 group'
              onClick={handleVisibility}
            >
              <div className='flex gap-2 items-center '>
                <span className='font-bold border-b-2 border-black group-hover:text-orange-500 group-hover:border-orange-500'>
                  others
                </span>
                <span className='text-sm opacity-65 line-clamp-1 max-w-[200px] font-semibold group-hover:text-gray-600'>
                  {address}
                </span>
              </div>
              <ChevronDown className='text-xl text-orange-400 mt-1' />
            </div>
          </div>

          <div className='flex items-center font-bold gap-8 text-[16px] '>
            {navItems.map(({ name, icon: Icon, path }, i) => (
              <Link to={path}>
                <div
                  key={i}
                  className='flex gap-2 items-center hover:text-orange-500'
                >
                  <Icon className='w-5 h-5' />
                  <p>{name}</p>
                  {name === "Cart" && cartData.length > 0 && <p>{cartData.length}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* demo */}
      {/* <div className="h-screen"></div> */}
      <Outlet />
    </div>
  );
};

export default Navbar;
