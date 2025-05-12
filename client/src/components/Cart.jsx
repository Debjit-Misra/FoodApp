import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteItem } from "../utils/cartSlice";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Star } from "lucide-react";
import { toggleLogin } from "../utils/toggleSlice";

let veg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1024px-Veg_symbol.svg.png";
let nonVeg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png";

const Cart = () => {
  // const { cartData, setCartData } = useContext(CartContext)

  const navigate = useNavigate();


  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);
  const userData = useSelector((state) => state.authSlice.userData);

  const dispatch = useDispatch();

  // let totalPrice = 0;
  // for (let i = 0; i < cartData.length; i++) {
  //   totalPrice += cartData[i].price / 100 || cartData[i].defaultPrice / 100
  // }



  let totalPrice = cartData.reduce(
    (acc, currVal) => acc + (currVal.price / 100 || currVal.defaultPrice / 100),
    0
  );

  function handleGoToHome() {
    navigate("/")
  }

  // function handleRemoveFromCart(idx) {
  //   if (cartData.length > 1) {
  //     let newArr = [...cartData];
  //     newArr.splice(idx, 1);
  //     // setCartData(newArr);
  //     dispatch(deleteItem(newArr));
  //     // localStorage.setItem("cartData", JSON.stringify(newArr))
  //     toast.success("Item removed");
  //   } else {
  //     handleClearCart();
  //   }
  // }



  function handleClearCart() {
    dispatch(clearCart());
    // setCartData([])
    // localStorage.setItem("cartData", JSON.stringify([]))
    // localStorage.clear()
  }

  function handlePlaceOrder() {
    if (!userData) {
      toast.error("Log in krle bhai");
      dispatch(toggleLogin())
      return;
    }
    toast.success("Order Placed");
  }

  if (cartData.length <= 0) {
    return (
      <div className='w-full'>
        <div className='w-[90%] md:w-[700px] mx-auto'>
          <div className="flex flex-col gap-3 justify-center items-center">
            <img className="w-[300px] h-[300px] mt-16" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="image" />
            <p className="text-xl font-bold">Your Cart is Empty</p>
            <p className="opacity-80 -mt-2">You can go to home page to view more restaurants</p>
            <button onClick={handleGoToHome} className="w-[35%] text-sm mt-4 bg-orange-500 text-white font-bold py-3 uppercase cursor-pointer hover:shadow-[2px_2px_10px_rgba(0,0,0,0.3)]">see restaurants near you</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='w-[100%] md:w-[800px] mx-auto px-4'>
        <Link to={`/restaurantMenu/${resInfo.id}`}>
          {console.log(resInfo)}
          <div className="my-10 flex gap-6">
            <div className='w-28 h-28'>
              <img
                className='w-full h-full object-cover rounded-xl'
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                  resInfo.cloudinaryImageId
                }
                alt=''
              />
            </div>
            <div>
              <p className="text-4xl  font-semibold">{resInfo.name}</p>
              <p className="mt-2 ml-1 text-lg font-semibold">{resInfo.areaName}</p>
            </div>
          </div>
        </Link>

        <div>
          {
            cartData.map((data) => (
              <CartItemDetails key={data.id} data={data} />
            ))
          }
        </div>


        <h1>₹{totalPrice}</h1>
        <div className='w-full flex justify-between mt-3'>
          <button className='p-3 bg-green-300' onClick={handlePlaceOrder}>
            Place Order
          </button>
          <button className='p-3 bg-green-300' onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div >
  );
};

export default Cart;

function CartItemDetails({ data }) {
  const {
    id,
    name,
    price,
    defaultPrice,
    finalPrice,
    itemAttribute,
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description,
    imageId,
  } = data;
  if (description) {
    let trimDes = description.substring(0, 100) + "...";
    // console.log(trimDes);
  }
  const [isMore, setIsMore] = useState(false);

  const cartData = useSelector((state) => state.cartSlice.cartItems);

  const dispatch = useDispatch();

  function handleRemoveFromCart(idx) {
    if (cartData.length > 1) {
      let newArr = [...cartData];
      newArr.splice(idx, 1);
      // setCartData(newArr);
      dispatch(deleteItem(newArr));
      // localStorage.setItem("cartData", JSON.stringify(newArr))
      toast.success("Item removed");
    } else {
      handleClearCart();
    }
  }

  return (
    <>
      <div key={id} className='flex w-full min-h-[150px] justify-between'>
        <div className='w-[78%] '>
          <div className='w-[75%] sm:w-[95%]'>
            <img
              className='w-4 h-4 mb-1'
              src={itemAttribute?.vegClassifier === "VEG" ? veg : nonVeg}
              alt=''
            />
            <p className='font-bold text-lg'>{name}</p>
            <div className='flex gap-2 font-bold text-[15px]'>
              <p
                className={`${finalPrice ? "line-through text-gray-400" : ""}`}
              >
                ₹{price / 100 || defaultPrice / 100}
              </p>
              {finalPrice && <p>₹{finalPrice / 100}</p>}
            </div>
            {rating && (
              <div className='flex items-center mb-1'>
                <Star fill='green' stroke='green' strokeWidth={1} size={13} />
                <span className='ml-1 mr font-bold'>{rating}</span>
                <span className='font-semibold'>({ratingCountV2})</span>
              </div>
            )}

            {description ? (
              description.length > 100 ? (
                <div>
                  <span className='text-gray-500'>
                    {isMore
                      ? description
                      : description.substring(0, 135) + "..."}
                  </span>
                  <button
                    className='font-bold text-gray-500'
                    onClick={() => setIsMore(!isMore)}
                  >
                    &nbsp;{isMore ? "less" : "more"}
                  </button>
                </div>
              ) : (
                <p className='text-gray-500'>{description}</p>
              )
            ) : null}
          </div>
        </div>
        <div
          className={`w-[40%] md:w-[22%] ${!imageId ? "flex justify-center items-center h-[160px]" : ""
            }`}
        >
          <div
            className={`w-full ${imageId
              ? "h-[160px] flex flex-col items-center"
              : "flex items-center justify-center"
              }`}
          >
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
                } w-[80%] font-bold bg-white py-[6px] shadow-xl border border-gray-100 text-lg text-red-500 rounded-xl hover:bg-gray-300 uppercase cursor-pointer`}
              onClick={handleRemoveFromCart}
            >
              remove
            </button>
          </div>
        </div>
      </div>
      <hr className='my-5 text-gray-300 mt-10' />
    </>
  )
}