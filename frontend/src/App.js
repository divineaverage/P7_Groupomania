import "bootstrap/dist/css/bootstrap.min.css"
import "../src/sass/app.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./components/Login/Auth"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 