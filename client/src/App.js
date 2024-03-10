import "./styles/style.scss"
import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useParams
} from "react-router-dom";
import Login from "./pages/Login";
import MakeAccount from "./pages/MakeAccount";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Item from "./pages/Item";
import HeaderBar from "./components/HeaderBar";
import PageFooter from "./components/PageFooter";
import items from './data/items.json'

// const items = [
//   {
//     id: 1,
//     title: "UCLA MENS HOODIE",
//     desc: "navy blue men's hoodie",
//     img: "https://cdn.shoplightspeed.com/shops/616371/files/53697154/800x800x3/russell-athletic-ucla-joe-bear-bruins-pullover-hoo.jpg",
//     cat: "men",
//     price: 49.99,
//     incart: false
//   },
//   {
//     id: 2,
//     title: "UCLA WOMEN'S T SHIRT",
//     desc: "white women's tee shirt",
//     img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/8ecd522b-5522-401b-b19e-bd1a7ceec093/ucla-womensboxy-t-shirt-36Z2MB.png",
//     cat: "women",
//     price: 59.99,
//     incart: false
//   },
//   {
//     id: 3,
//     title: "UCLA KIDS SHORTSLEEVE",
//     desc: "kids bruinbear t shirt 100% cotton",
//     img: "https://cdn.shoplightspeed.com/shops/616371/files/45478023/image.jpg",
//     cat: "kids",
//     price: 69.99,
//     incart: false
//   },
//   {
//     id: 4,
//     title: "UCLA FAN HAT",
//     desc: "blue UCLA hat standard sizes, elastic band for fit",
//     img: "https://www.uclastore.com/site/product-images/95393_main.default.jpg?resizeid=3&resizeh=600&resizew=600",
//     cat: "accessory",
//     price: 79.99,
//     incart: false
//   },
// ];


const PageFormat = () => {
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

  return <Item itemId={num} itemsarr={items}/>;
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
        element:<Cart/>
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

function App() {
  return (
    <div className="app">
        <div className="container">
          <RouterProvider router={router}/>
        </div>
    </div>
  );
}



export default App;
