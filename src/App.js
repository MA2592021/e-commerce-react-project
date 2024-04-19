import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayOut from "./Pages/LayOut/LayOut";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/Login/Login";
import UserContextProvider from "./Context/UserContext";
import Products from "./Pages/Products/Products";
import Categories from "./Pages/Categories/Categories";
import Cart from "./Pages/Cart/Cart";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import Details from "./Components/Details/Details";
import CartContextProvider from "./Context/CartContext";
import Checkout from "./Components/Checkout/Checkout";
import AllOrders from "./Components/AllOrders/AllOrders";
import Brands from "./Pages/Brands/Brands";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";

function App() {
  const routers = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: <Home />,
        },

        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              {" "}
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },

        {
          path: "details/:id",
          element: (
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          ),
        },
        {
          path: "resetPassword",
          element: <ResetPassword />,
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },

        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <CartContextProvider>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>;
        </UserContextProvider>
      </QueryClientProvider>
    </CartContextProvider>
  );
}

export default App;
