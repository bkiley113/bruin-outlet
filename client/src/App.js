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
    const item = items.products.find(product => product._id === id);

    if (!item) {
      // Return a placeholder or a loading spinner here
      return <div>Loading...</div>;
    }
    return <Item itemId={num} itemsarr={items.products}/>;
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
          element:<Cart />
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
    }
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