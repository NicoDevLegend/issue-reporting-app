import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SideBar from "./components/Sidebar";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div className="App">     
      <div className="d-flex vh-100">
        <SideBar />
        <div className="w-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
