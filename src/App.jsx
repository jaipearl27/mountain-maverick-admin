import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "sonner";

///// pages /////

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login/Login";

import Layout from "./components/Layout/Layout";
// import ComingSoon from "./pages/NotFound/ComingSoon";
import NotFound from "./pages/NotFound/NotFound";
import Blogs from "./pages/Blogs/Blogs";
import AddBlogs from "./pages/Blogs/AddBlogs";
import UpdateBlog from "./pages/Blogs/UpdateBlog";
import AddReviews from "./pages/Reviews/AddReviews";
import Reviews from "./pages/Reviews/Reviews";
import UpdateReview from "./pages/Reviews/UpdateReview";

const isUserLoggedIn = localStorage.getItem("isusrlgd");

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: isUserLoggedIn ? <Layout /> : <Navigate to="/login" />,

      children: [
        {
          path: "/",
          element: <Dashboard />,
        },

        {
          path: "/*",
          element: <NotFound />,
        },
        {
          path: "/blogs",
          element: <Blogs />,
        },
        {
          path: "/blogs/add",
          element: <AddBlogs />,
        },
        {
          path: "/blogs/update/:blogId",
          element: <UpdateBlog />,
        },

        {
          path: "/reviews",
          element: <Reviews />,
        },
        {
          path: "/reviews/add",
          element: <AddReviews />,
        },
        {
          path: "/reviews/update/:reviewId",
          element: <UpdateReview />,
        },

      ],
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <Toaster richColors containerClassName="overflow-auto" />
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
