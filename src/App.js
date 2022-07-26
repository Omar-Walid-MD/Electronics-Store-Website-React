import logo from './logo.svg';
import searchIcon from "./img/search.png"
import './App.css';
import { useEffect, useState } from 'react';
import OverviewDisplay from './OverviewDisplay';
import OfferDisplay from './OfferDisplay';
import CategorySection from './CategorySection';
import BrandSection from './BrandSection';
import BranchSection from './BranchSection';

function App() {

  return (
    <div className="App">
      <header>
        <div className="nav-bar">
          <h1 className="logo">Store Title</h1>
          <div className="search-bar-container">
            <img className="search-icon" src={searchIcon} alt="search-icon" />
            <input className="search-bar" type="search" />
          </div>
          <div>
            <h3>More</h3>
          </div>
        </div>
      </header>
      <div className="page-container">
        <OverviewDisplay />
        <OfferDisplay />
        <CategorySection />
        <BrandSection />
        <BranchSection />
      </div>
    </div>
  );
}

export default App;
