import "./App.css";
import { Auth0ProviderWithNavigate } from "./components/Auth0Provider";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { CallbackPage } from "./pages/callback-page";
import SideBar from "./components/Sidebar";
import NavBar from "./components/Navbar";

function App() {
  return (
    <Auth0ProviderWithNavigate>
      <div className="App">
        <div className="d-flex vh-100">
          <SideBar />
          <div className="w-100">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/callback" element={<CallbackPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Auth0ProviderWithNavigate>
  );
}

export default App;
