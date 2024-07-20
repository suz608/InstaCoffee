import "../style/home.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';
import useProfile from "../hooks/useProfile.js"
import TopSelllers from "./TopSelllers";
import GetWeather from "./GetWeather";
import ChatWindow from "./ChatWindow"; 
import OrderHistory from "./OrderHistory";

export default function Home() {
    const { isAuthenticated, loginWithRedirect, isLoading, logout} = useAuth0();
    const [showChat, setShowChat] = useState(false);
    const [profile] = useProfile();
    const toggleChat = () => {
      setShowChat(!showChat);
    };

    const handleLogout = () => {
      logout({returnTo:window.location.origin});
    };

    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }

    // If the user has logged in and the profile is still loading, return loading.
    if(isAuthenticated && profile===null){
      return <div className="loading">Loading...</div>;
    }

    return (
        <div className="home">

        <img className="store-icon" src = "https://github.com/suz608/public-repo/blob/main/logo.png?raw=true" alt="Insta Store" id="logo"></img>
        <nav className="menu">
          <ul className="menu-items">
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/order">Order</a></li>
            <li><a href="/authdebugger">Auth Debugger</a></li>
            <li><a href="/profile">My profile</a></li>
          </ul>
        </nav>

        <div className="center-pieces">
          {!isAuthenticated ? (
            <button className="primary-btn" onClick={loginWithRedirect}>
              Login/Create account
            </button>
          ) : (
            <div>
              <p>Welcome 👋 {profile.name}</p>
              <button className="primary-btn" onClick={handleLogout}>
                Log out
              </button>
            </div>
          )}
           <GetWeather/>
          </div>

          <div className="chat-components">
            {showChat && <div className="chat-container"><ChatWindow /></div>}
            <button className="chat-toggle-button" onClick={toggleChat}>Get directions</button>
          </div>
          

        {!isAuthenticated ? (
            <TopSelllers/>
          ) : (
            <div className="main-components">
              <TopSelllers/>
              <OrderHistory/>
            </div>
          )}
      </div>
    );
  }
