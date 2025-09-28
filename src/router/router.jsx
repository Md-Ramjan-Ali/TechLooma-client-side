import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashboardLayout from "../Layout/DashboardLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import MyProfile from "../Pages/Dashboard/User/MyProfile";
import AddProduct from "../Pages/Dashboard/User/AddProduct";
import AdminRoute from "../routes/AdminRoute";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupon";
import MyProducts from "../Pages/Dashboard/User/MyProducts";
import UpdateProduct from "../Pages/Dashboard/User/UpdateProduct";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ModeratorRoute from "../routes/ModeratorRoute";
import ProductReview from "../Pages/Dashboard/Moderator/ProductReview";
import PrivetRouter from "../routes/PrivetRouter/PrivetRouter";
import ProductDetails from "../Pages/Products/ProductDetails";
import ReportedContent from "../Pages/Dashboard/Moderator/ReportedContents";
import Statistics from "../Pages/Dashboard/Admin/Statistics";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Forbidden from "../Pages/Forbidden/Forbidden";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Terms from "../Pages/Terms/Terms";
import Privacy from "../Pages/Privacy/Privacy";
import UpcomingProducts from "../Pages/UpcomingProducts/UpcomingProducts";
import Settings from "../Components/Setting/Setting";

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
      {
        path: "/upcomingProducts",
       Component: UpcomingProducts,
      },
      {
        path: "/product/:id",
        element: (
          <PrivetRouter>
            <ProductDetails></ProductDetails>
          </PrivetRouter>
        ),
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/terms",
        Component: Terms,
      },
      {
        path: "/privacy",
        Component: Privacy,
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRouter>
        <DashboardLayout></DashboardLayout>
      </PrivetRouter>
    ),
    children: [
      {
        index: true,
        Component: Dashboard,
      },

      // user panel routes
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
        Component: UpdateProduct,
      },
      // moderator panel routes--------------------------------
      {
        path: "product-review",
        element: (
          <ModeratorRoute>
            <ProductReview></ProductReview>
          </ModeratorRoute>
        ),
      },
      {
        path: "report-content",
        element: (
          <ModeratorRoute>
            <ReportedContent></ReportedContent>
          </ModeratorRoute>
        ),
      },
      // admin panel routes------------------------------------
      {
        path: "statistics",
        element: (
          <AdminRoute>
            <Statistics></Statistics>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <AdminRoute>
            <ManageCoupons></ManageCoupons>
          </AdminRoute>
        ),
      },
      {
        path:"contact",
        Component:Contact,
      },
      {
        path:"settings",
        Component: Settings,
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
