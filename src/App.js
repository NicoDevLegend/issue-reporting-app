import "./App.css";
import Auth0ProviderWithNavigate from "./components/Auth0Provider";
import Loading from "./components/Loading";
import SideBar from "./components/Sidebar";
import NavBar from "./components/Navbar";
//import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  /* const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  } */

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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </Auth0ProviderWithNavigate>
  );
}

export default App;
