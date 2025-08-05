import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import store from "./redux/store"; 
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import AuthDebugger from "./components/AuthDebugger";
import Order from "./components/Order";
import Menu from "./components/Menu";
import Profile from "./components/Profile";
import VerifyUser from "./components/VerifyUser";
import Details from "./components/Details";
import OrderSubmitted from "./components/OrderSubmitted";
import RequireLogin from "./components/RequireLogin";
import { AuthTokenProvider } from "./AuthTokenContext";

const container = document.getElementById("root");

const requestedScopes = ["profile", "email"];

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  // If the user is not authenticated, redirect to the home page
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/requirelogin" replace />;
  }

  // Otherwise, display the children (the protected page)
  return children;
}

const root = ReactDOMClient.createRoot(container);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/verify-user`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: requestedScopes.join(" "),
      }}
    >
      <AuthTokenProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/order" element={<Order />} />
              <Route path="/authdebugger" element={<RequireAuth><AuthDebugger /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/verify-user" element={<VerifyUser />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/ordersubmitted" element={<RequireAuth><OrderSubmitted /></RequireAuth>} />
              <Route path="/requirelogin" element={<RequireLogin />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>
);
