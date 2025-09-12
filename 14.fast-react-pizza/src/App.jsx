import {
  createBrowserRouter,
  data,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Cart from "./features/cart/Cart";
import Menu from "./features/menu/Menu";
import CreateOrder, { isValidPhone } from "./features/order/CreateOrder";
import Order from "./features/order/Order";

import { Provider } from "react-redux";
import { createOrder, getMenu, getOrder } from "./services/apiRestaurant";
import { store } from "./store";
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
          {
            path: "new",
            element: <CreateOrder />,
            action: async ({ request }) => {
              const formData = await request.formData();
              const data = Object.fromEntries(formData);
              const order = {
                ...data,
                priority: data.priority === "on",
                cart: JSON.parse(data.cart),
              };
              const error = {};
              if (!isValidPhone(order.phone)) {
                error.phone = "please enter your correct phone number";
              }
              if (Object.keys(error).length > 0) return error;

              const newOrder = await createOrder(order);
              return redirect(`/order/${newOrder.id}`);
            },
          },
          {
            path: ":orderId",
            element: <Order />,
            loader: async ({ params }) => {
              let order = await getOrder(params.orderId);
              return { order: order };
            },
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
]);
function App() {
  // create RouterProvider component to manage this routes
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
