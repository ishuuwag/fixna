import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@asgardeo/auth-react";

declare global {
  interface Window {
    config: {
      cliendId: string;
      redirectUrl: string;
      asgardeoUrl: string;
      registrationUrl: string;
    };
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        config={{
          signInRedirectURL:
            process.env.REACT_APP_REDIRECT_URL ?? window.config.redirectUrl,
          signOutRedirectURL:
            process.env.REACT_APP_REDIRECT_URL ?? window.config.redirectUrl,
          clientID: process.env.REACT_APP_CLIENT_ID ?? window.config.cliendId,
          baseUrl:
            process.env.REACT_APP_ASGARDEO_URL ?? window.config.asgardeoUrl,
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
