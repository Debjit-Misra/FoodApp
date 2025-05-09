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
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchBar, toggleLogin } from "../utils/toggleSllice.js";
import SignInBtn from "./SignInBtn.jsx";

const Navbar = () => {
  // const { visible, setVisible } = useContext(Visibility);
  // access data from redux store using useSelector
  const visible = useSelector((state) => state.toggleSlice.searchBarToggle);
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);
  const dispatch = useDispatch();

  // console.log(visible);
  const [searchResult, setSearchResult] = useState([]);
  const [address, setAddress] = useState("");
  const { coord, setCoord } = useContext(Coordinates);
  // const { cartData, setCartData } = useContext(CartContext)
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const userData = useSelector((state) => state.authSlice.userData);
  // console.log(cartData);

  const navItems = [
    // {
    //   name: "Swiggy Corporate",
    //   icon: ShoppingBag,
    //   path: "/corporate",
    // },
    {
      name: "Search",
      icon: Search,
      path: "/search",
    },
    // {
    //   name: "Offers",
    //   icon: BadgePercent,
    //   path: "/offers",
    // },
    // {
    //   name: "Help",
    //   icon: LifeBuoy,
    //   path: "/help",
    // },
    {
      name: "Sign In",
      icon: CircleUser,
      path: "/signin",
    },
    {
      name: "Cart",
      icon: ShoppingCart,
      path: "/cart",
    },
  ];

  function handleLogin() {
    dispatch(toggleLogin());
  }

  function handleVisibility() {
    // setVisible((prev) => !prev);
    console.log("hi");
    dispatch(toggleSearchBar());
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
    <>
      {/* Search Toggle */}
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
            "absolute flex flex-col items-center bg-white p-5 w-full md:w-[29%] h-full z-40 duration-500 " +
            (visible ? "left-0" : "-left-[100%]")
          }
        >
          <div className='w-[85%] mr-2 mt-4'>
            <X onClick={handleVisibility} className='w-6 h-6 cursor-pointer' />
            <input
              type='text'
              placeholder='Search for area, street name'
              className='border border-gray-300 font-semibold w-full px-4 py-4 text-black mt-4 focus:outline-none focus:shadow-[0_0px_10px_rgb(0,0,0,0.2)] placeholder-gray-400'
              onChange={(e) => searchResultFunc(e.target.value)}
            />
          </div>

          <div className='w-[85%] mr-2 mt-8'>
            <ul className='pl-4'>
              {searchResult.map((data, index) => {
                const isLast = index === searchResult.length - 1;
                return (
                  <li
                    className='mb-4 cursor-pointer'
                    onClick={() => fetchLatAndLng(data.place_id)}
                  >
                    <div className='flex gap-2'>
                      <div className=''>
                        <MapPin className='w-4 h-4 text-gray-600' />
                      </div>
                      <div
                        className={`w-full ${isLast
                          ? ""
                          : "border-b border-gray-400 border-dashed "
                          }`}
                      >
                        <p className='font-semibold text-[16px] max-w-[90%] hover:text-orange-600'>
                          {data.structured_formatting.main_text}
                        </p>
                        <p className='text-sm text-gray-500 mb-4 mt-1'>
                          {data.structured_formatting.secondary_text}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Login Toggle */}
      {
        loginVisible && <div className='w-full'>
          <div
            onClick={handleLogin}
            className={
              "absolute w-full h-full z-[30] bg-gray-900/60 " +
              (loginVisible ? "visible" : "invisible")
            }
          ></div>
          <div
            className={
              "absolute flex flex-col pl-12 bg-white p-5 w-full md:w-[37%] h-full z-40 duration-500 " +
              (loginVisible ? "right-0" : "-right-[100%]")
            }
          >
            <div className='w-[75%] h-full mt-4 '>
              <X
                onClick={handleLogin}
                className='w-6 h-6 cursor-pointer text-gray-600'
              />
              <div className='w-full h-[90px] mt-6 flex justify-between ml-1'>
                <div className='flex flex-col justify-between'>
                  <h2 className='text-3xl font-semibold'>Login</h2>
                  <span className='font-semibold -mt-3'>
                    or&nbsp;
                    <span className='text-orange-600'>create an account</span>
                  </span>
                  <div className='w-8 h-[1px] bg-black'></div>
                </div>
                <div className='w-[27%]'>
                  <img
                    className='object-center'
                    src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r'
                    alt=''
                  />
                </div>
              </div>

              <SignInBtn />

              <div className='w-full mt-1 text-[12px] font-semibold text-gray-600'>
                <span className="">By clicking on Login, I accept the </span>
                <span className="text-black font-bold">Terms & Conditions</span>&nbsp;
                <span>&</span>&nbsp;
                <span className="text-black font-bold">Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>
      }

      <div className='relative w-full'>
        <div className='w-full sticky bg-white z-20 top-0 shadow-[0_3px_20px_rgb(0,0,0,0.1)] h-[80px] flex justify-center items-center'>
          <div className='w-full px-3 md:w-[80%] flex justify-between'>
            <div className='flex items-center'>
              <Link to={"/"}>
                <div className='w-20 -ml-4 sm:ml-0'>
                  <img
                    className="w-full"
                    src='https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png'
                    alt='logo'
                  />
                </div>
              </Link>
              <div
                className='flex items-center gap-2 group'
                onClick={handleVisibility}
              >
                <div className='flex gap-3 items-center '>
                  <span className='font-bold border-b-2 border-black group-hover:text-orange-500 group-hover:border-orange-500'>
                    Home
                  </span>
                  <span className='text-sm opacity-65 line-clamp-1 max-w-[200px] font-semibold group-hover:text-gray-600'>
                    {address}
                  </span>
                </div>
                <ChevronDown className='text-xl text-orange-400 mt-1' />
              </div>
            </div>

            <div className='flex items-center font-bold gap-6 md:gap-10 text-[16px] '>
              {navItems.map(({ name, icon: Icon, path }, i) =>
                name === "Sign In" ? (
                  <div onClick={handleLogin}>
                    <div
                      key={i}
                      className='flex gap-2 items-center hover:text-orange-500'
                    >
                      {userData ? (
                        <div className='w-6 h-6'>
                          <img
                            className='h-full w-full rounded-3xl'
                            src={userData.photo}
                            alt=''
                          />
                        </div>
                      ) : (
                        <Icon className='w-5 h-5' />
                      )}
                      <p className="text[#02060C] hidden md:block">{userData ? userData.name : name}</p>
                      {name === "Cart" && cartData.length > 0 && (
                        <p className="">{cartData.length}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={path}>
                    <div
                      key={i}
                      className='flex gap-2 items-center group'
                    >
                      <Icon className='w-5 h-5 group-hover:text-orange-500 ' />
                      <p className="hidden md:block text-[#02060C] group-hover:text-orange-500">{name}</p>
                      {name === "Cart" && cartData.length > 0 && (
                        <p>{cartData.length}</p>
                      )}
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
        {/* demo */}
        {/* <div className="h-screen"></div> */}
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
