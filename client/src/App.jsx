import { Routes, Route } from "react-router-dom"
import Body from "./components/Body"
import Navbar from "./components/Navbar"
import RestaurantMenu from "./components/RestaurantMenu"
import { CartContext, Coordinates, Visibility } from "./context/contextApi"
import { useContext, useEffect, useState } from "react"
import Cart from "./components/Cart"
import { useSelector } from "react-redux"
import SignInPage from "./components/SignInBtn"
import SearchPage from "./components/SearchPage"
import PageNotFound from "./components/PageNotFound"

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
    <Coordinates.Provider value={{ coord, setCoord }}>
      <div className={visible ? "overflow- max-w-screen max-h-screen" : ""}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Body />} />
            <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div >
    </Coordinates.Provider>
  )
}

export default App
