import { Routes, Route } from "react-router-dom"
import Body from "./components/Body"
import Navbar from "./components/Navbar"
import RestaurantMenu from "./components/RestaurantMenu"
import { CartContext, Coordinates, Visibility } from "./context/contextApi"
import { useContext, useEffect, useState } from "react"
import Cart from "./components/Cart"
import { useSelector } from "react-redux"
import SignInPage from "./components/SignInBtn"

function App() {
  // const [visible, setVisible] = useState(false);
  const [coord, setCoord] = useState({ lat: 22.5743545, lng: 88.3628734 })
  // const [cartData, setCartData] = useState([])

  const visible = useSelector((state) => state.toggleSlice.searchBarToggle)

  // function get_data_from_local_storage() {
  //   let data = JSON.parse(localStorage.getItem("cartData")) || []
  //   setCartData(data)
  // }
  // useEffect(() => {
  //   get_data_from_local_storage();
  // }, [])


  return (
    // <CartContext.Provider value={{ cartData, setCartData }}>
    <Coordinates.Provider value={{ coord, setCoord }}>
      {/* <Visibility.Provider value={{ visible, setVisible }}> */}
      <div className={visible ? "overflow- max-w-screen max-h-screen" : ""}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Body />} />
            <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<h1>Comming Soon...</h1>} />
          </Route>
        </Routes>
      </div >
      {/* </Visibility.Provider> */}
    </Coordinates.Provider>
    // </CartContext.Provider>
  )
}

export default App
