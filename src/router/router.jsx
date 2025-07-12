import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashboardLayout from "../Layout/DashboardLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import MyProfile from "../Pages/Dashboard/MyProfile";
import AddProduct from "../Pages/Dashboard/AddProduct";
import MyProducts from "../Pages/Dashboard/MyProducts";
import UpdateProduct from "../Pages/Dashboard/UpdateProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/products",
        Component: Products,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "add-product",
        Component: AddProduct,
      },
      {
        path: "my-products",
        Component: MyProducts,
      },
      {
        path: "update-product/:id",
        Component: UpdateProduct
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/*",
    Component: ErrorPage,
  },
]);
