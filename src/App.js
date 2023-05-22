import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import SideBar from "./components/Sidebar";
import NavBar from "./components/Navbar";
import Loading from "./components/Loading";
import AuthenticationGuard from "./components/AuthenticationGuard";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotificationsPage from "./pages/NotificationsPage";
import NewTicket from "./pages/NewTicket";
import CheckTicket from "./pages/CheckTicket";
import NotFound from "./pages/NotFound";

function App() {
  const { isLoading } = useAuth0();

  return isLoading ? (
    <Loading />
  ) : (
    <div className="App">
      <div className="d-flex min-vh-100">
        <SideBar />
        <div className="w-100 bg-secondary">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={<AuthenticationGuard component={Profile} />}
            />
            <Route
              path="/notifications"
              element={<AuthenticationGuard component={NotificationsPage} />}
            />
            <Route
              path="/newticket"
              element={<AuthenticationGuard component={NewTicket} />}
            />
            <Route
              path="/checkticket"
              element={<AuthenticationGuard component={CheckTicket} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
