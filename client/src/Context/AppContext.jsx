import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const currency =import.meta.env.VITE_CURRENCY

  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, SetProducts] = useState([]);
  const [cartItems, SetcartItems] = useState({});
  const [searchQuery, SetSearchQuery] = useState({});

  //Fetch all Products
  const fetchProducts =async () => {
     SetProducts(dummyProducts);
  };

  //Add Product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    SetcartItems(cartData);
    toast.success("Added to Cart");
  };

  //update cart Item quantity
  const updateCartItem = (itemid, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemid] = quantity;
    SetcartItems(cartData);
    toast.success("Cart Updated");
  };
  //remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] == 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Remove from cart");
    SetcartItems(cartData);
  };

  //Get cartitem count
  const getCartCount=()=>{
    let totalCount = 0;
    for(const item in cartItems){
      totalCount += cartItems[item];
    }
    return totalCount
  }

  //Get cart total amount
  const getCartAmount =()=>{
    let totalAmount =0
    for(const item in cartItems){
      let itemInfo = products.find((product)=>product._id===item)
      if(cartItems[item]>0){
        totalAmount += itemInfo.offerPrice* cartItems[item]
      }
    }
    return Math.floor(totalAmount)
  }

  useEffect(() => {
    fetchProducts()
  },[]);


  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    SetSearchQuery,
    getCartCount,
    getCartAmount
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
