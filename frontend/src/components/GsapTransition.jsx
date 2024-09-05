import React, { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import BlogPost from "../pages/BlogPost";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import UserProfile from "../pages/UserProfile";
import EditBlog from "../pages/EditBlog";
import ProtectedRoute from "./ProtectedRoute"; 
import gsap from "gsap";
import toast, { Toaster } from "react-hot-toast";
import BlogGenerator from "../pages/BlogGenerator";

const GsapTransition = () => {
  const nodeRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (nodeRef.current) {
      gsap.fromTo(nodeRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
      toast.success(location.pathname);
    }
  }, [location]);

  return (
    <div ref={nodeRef}>
      <Toaster />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/generate" element={<BlogGenerator />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <BlogPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default GsapTransition;
