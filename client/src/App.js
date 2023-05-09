import "../src/sass/app.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./components/Login/Auth"
import CreatePost from "./components/feed/CreatePost"
import Feed from "./components/feed/Feed"
import Profile from "./components/profile/Profile"

function app() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Auth" element={<Auth />} />
        <Route path="/">
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default app 