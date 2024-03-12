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
import Results from "./pages/Results";
import Wishlist from "./pages/Wishlist.js";
import HeaderBar from "./components/HeaderBar";
import PageFooter from "./components/PageFooter";
import { AuthProvider } from './components/AuthContext.js';
//import items from './data/items.json'


function App() {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState({products: []});

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:3001/products';
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data); // Now 'fetched' stores the entire object including 'products'
      } catch (error) {
        console.error('Could not fetch the data:', error);
      }
    };

    fetchData();
  }, []);
  
  const useScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  };

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
    const num = (id);
    return <Item itemId={num} itemsarr={items.products} addToCart={addToCart}/>;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageFormat/>,
      children:[
        {
          path: "/",
          element:<HomePage itemsarr={items.products}/>
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
        {
          path: "/results",
          element: <Results itemsarr={items.products}/>,
        },
        {
          path: "/wishlist",
          element: <Wishlist itemsarr={items.products}/>,
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
    <AuthProvider>
      <div className="app">
        <div className="container">
          <RouterProvider router={router}/>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;