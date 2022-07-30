import logo from './logo.svg';
import searchIcon from "./img/search.png"
import './App.css';
import { useEffect, useRef, useState } from 'react';
import OverviewDisplay from './OverviewDisplay';
import OfferDisplay from './OfferDisplay';
import CategorySection from './CategorySection';
import BrandSection from './BrandSection';
import BranchSection from './BranchSection';
import SideBar from './SideBar';

function App() {

  

  var loggedIn = false;

  return (
    <div className="App">
      <header>
        <div className="nav-bar">
          <h1 className="logo">Store Title</h1>
          <div className="search-bar-container">
            <img className="search-icon" src={searchIcon} alt="search-icon" />
            <input className="search-bar" type="search" />
          </div>
          <div className="nav-bar-options-container">
            
            <div className="profile-container">
              {
                loggedIn ? <img className="profile-icon" src={require("./img/profile-icon.png")}/>
                        : <div className="login-register-container">
                            <a className="account-button">Register</a>
                            <a className="login-button account-button">Log in</a>
                          </div>
                        
              }    
            </div>

            <div className="menu-container">
            <input className="menu-checkbox" type="checkbox" id="menu-toggle" />
            <label htmlFor="menu-toggle">
              <img className="menu-icon" src={require("./img/menu-icon.png")}/>
            </label>
              <div className="dropdown-menu-container">
                <div className="dropdown-menu-option">Option</div>
                <div className="dropdown-menu-option">Option</div>
                <div className="dropdown-menu-option">Option</div>
              </div>
            </div>
          </div>
          
        </div>
        
      </header>
      
      
      <SideBar />
      <div className="page-container">
        <OverviewDisplay />
        <OfferDisplay />
        <CategorySection />
        <BrandSection />
        <BranchSection />
      </div>

      <footer>
        <div className="footer-container"></div>
      </footer>
    </div>
  );
}

export default App;
