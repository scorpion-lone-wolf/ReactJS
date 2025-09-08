import { createBrowserRouter, data, Navigate, RouterProvider } from "react-router-dom";
import Cart from "./features/cart/Cart";
import Menu from "./features/menu/Menu";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";

import { getMenu } from "./services/apiRestaurant";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Home from "./ui/Home";
import Loader from "./ui/Loader";

// create a router using createBrowserRouter
let router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
        loader: async () => {
          try {
            return { menuData: await getMenu() };
          } catch (error) {
            console.error(error);
            throw data("Record Not Found", { status: 404 });
          }
        },
        hydrateFallbackElement: <Loader />, // This element will be shown instead of jsx elements that is defined inside Menu component
        errorElement: <Error />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order",
        children: [
          { index: true, element: <Navigate to={"new"} replace /> },
          { path: "new", element: <CreateOrder /> },
          {
            path: ":orderId",
            element: <Order />,
          },
        ],
      },
    ],
  },
]);
function App() {
  // create RouterProvider component to manage this routes
  return <RouterProvider router={router} />;
}

export default App;
