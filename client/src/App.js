import React from "react";
import "../src/sass/app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Login/Auth";
import AddPostForm from "./components/feed/AddPostForm";
import PostsList from "./components/feed/Feed";
import Profile from "./components/profile/Profile"

function app() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Auth />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/CreatePost" element={<AddPostForm />} />
        <Route path="/Feed" element={<PostsList />} />
        <Route path="/Profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
  );
}

export default app;
