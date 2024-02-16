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
        element:<HomePage/>
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
