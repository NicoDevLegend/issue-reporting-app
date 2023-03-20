import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import SideBar from "./components/Sidebar";
import NavBar from "./components/Navbar";
import Loading from "./components/Loading";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  const { isLoading } = useAuth0();

  return isLoading ? (
    <Loading />
  ) : (
    <div className="App">
      <div className="d-flex vh-100">
        <SideBar />
        <div className="w-100">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
