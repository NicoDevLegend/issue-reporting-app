import "./App.css";
import Auth0ProviderWithHistory from "./components/Auth0Provider";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SideBar from "./components/Sidebar";
import NavBar from "./components/Navbar";

function App() {
  return (
    <Auth0ProviderWithHistory>
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
    </Auth0ProviderWithHistory>
  );
}

export default App;
