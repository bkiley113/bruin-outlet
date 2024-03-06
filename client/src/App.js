import "./styles/style.scss"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import MakeAccount from "./pages/MakeAccount";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import Item from "./pages/Item";
import HeaderBar from "./components/HeaderBar";
import PageFooter from "./components/PageFooter";


const items = [
  {
    id: 1, //this will be the SKU# (i.e. GHB6008J or something like that)
    title: "UCLA MENS HOODIE",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://cdn.shoplightspeed.com/shops/616371/files/53697154/800x800x3/russell-athletic-ucla-joe-bear-bruins-pullover-hoo.jpg",
    cat: "Men",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cat: "Women",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cat: "Children",
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cat: "Accessory",
  },
];


const PageFormat = () => {
  return(
    <>
    <HeaderBar/>
    <Outlet/>
    <PageFooter/>
    </>
  );
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
        element:<Item/>
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
