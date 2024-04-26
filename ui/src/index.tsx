import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        config={{
          signInRedirectURL:
            process.env.REACT_APP_REDIRECT_URL ??
            "https://fixna.us-cdp2.choreoapps.dev",
          signOutRedirectURL:
            process.env.REACT_APP_REDIRECT_URL ??
            "https://fixna.us-cdp2.choreoapps.dev",
          clientID:
            process.env.REACT_APP_CLIENT_ID ?? "Vhfy5n6BodmKviKxQXKYsa4eW7sa",
          baseUrl:
            process.env.REACT_APP_ASGARDEO_URL ??
            "https://api.asgardeo.io/t/logicppna	",
          scope: ["openid", "profile"],
        }}
      >
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
