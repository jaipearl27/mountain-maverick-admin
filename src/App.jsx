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

import Treks from "./pages/Treks/Treks";
import AddTrek from "./pages/Treks/AddTrek";
import UpdateTrek from "./pages/Treks/UpdateTrek";
import Tours from "./pages/Tours/Tours";
import AddTour from "./pages/Tours/AddTour";
import UpdateTour from "./pages/Tours/UpdateTour";
import Gallery from "./pages/gallery/Gallery";
import AddGallery from "./pages/gallery/AddGallery";
import UpdateGallery from "./pages/gallery/UpdateGallery";

const isUserLoggedIn = localStorage.getItem("ismtnusrlgd");

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
          path: "/treks",
          element: <Treks />,
        },
        {
          path: "/treks/add",
          element: <AddTrek />,
        },
        {
          path: "/treks/update/:id",
          element: <UpdateTrek />,
        },

        {
          path: "/tours",
          element: <Tours />,
        },
        {
          path: "/tours/add",
          element: <AddTour />,
        },
        {
          path: "/tours/update/:id",
          element: <UpdateTour />,
        },

        {
          path: "/gallery",
          element: <Gallery />,
        },

        
        {
          path: "/gallery/add",
          element: <AddGallery />,
        },

          
        {
          path: "/gallery/update/:id",
          element: <UpdateGallery />,
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
