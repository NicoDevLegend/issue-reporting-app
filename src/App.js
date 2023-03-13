import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SideBar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
