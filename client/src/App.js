import "./styles/style.scss"
import "./styles/cart.css"
import "./styles/cart_font.css"
import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useParams,
  useLocation
} from "react-router-dom";
import Login from "./pages/Login";
import MakeAccount from "./pages/MakeAccount";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Item from "./pages/Item";
import HeaderBar from "./components/HeaderBar";
import PageFooter from "./components/PageFooter";
import items from './data/items.json'


function App() {
  // const[items, setItems] = useState([]);
  // useEffect(() => {
  //   fetch('http://localhost:3001/products')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setItems(data);
  //     })
  //     .catch(error => {
  //       console.error("Failed to fetch products:", error);
  //     });
  // }, []);

  const useScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  };

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((currentCart) => {
      // Check if the item is already in the cart
      const isItemInCart = currentCart.some((cartItem) => cartItem.id === item.id);
      if (!isItemInCart) {
        // If not, add the item to the cart
        return [...currentCart, item];
      }
      // Optionally, you could update the quantity here if the item is already in the cart
      return currentCart; // If item is already in cart, just return the current state
    });
  };
  
  const removeFromCart = (itemId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== itemId));
  };
  

  const PageFormat = () => {
    useScrollToTop();
    return(
      <>
      <HeaderBar/>
      <Outlet/>
      <PageFooter/>
      </>
    );
  };
  const ItemWrapper = () => {
    const { id } = useParams();
    const num = Number(id);
    return <Item itemId={num} itemsarr={items} addToCart={addToCart}/>;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageFormat/>,
      children:[
        {
          path: "/",
          element:<HomePage itemsarr={items}/>
        },
        {
          path: "/item/:id",
          //element:<Item itemsarr={items}/>
          element:<ItemWrapper />
        },
        {
          path: "/cart",
          element:<Cart cart={cart} removeFromCart={removeFromCart}/>
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/makeaccount",
      element: <MakeAccount />,
    },
  ]);

  return (
    <div className="app">
        <div className="container">
          <RouterProvider router={router}/>
        </div>
    </div>
  );
}

export default App;
