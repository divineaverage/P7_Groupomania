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
        <Route path="/Auth" element={<Auth />} />
        <Route path="/">
          <Route
            exact
            path="/createPost"
            render={() => (
              <React.Fragment>
                <AddPostForm />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <PostsList />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <Profile />
              </React.Fragment>
            )}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default app;
