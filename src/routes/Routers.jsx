import React from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "../pages/scrollToTop";
import { Toaster } from "react-hot-toast";
import Home from '../pages/Home/index'
import Login from '../pages/Home/index'

import ProtectedRoute from './ProtectedRoute'
const Routers = () => {
  return (
    <React.Suspense>
      {/* <Navbar /> */}
      <Toaster />
      <ScrollToTop />
      <Routes>
        
        <Route
          path="/"
          element={
            // <ProtectedRoute>
              <Home/>
            // </ProtectedRoute>
          }
        />
      </Routes>
    </React.Suspense>
  );
};

export default Routers;
