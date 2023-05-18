import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithNavigate from "./components/Auth0Provider";
//import { UserDataContextProvider } from "./components/UserDataProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
        <App />
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
);
