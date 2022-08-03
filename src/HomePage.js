import './HomePage.css';
import { useEffect, useRef, useState } from 'react';
import OverviewDisplay from './OverviewDisplay';
import OfferDisplay from './OfferDisplay';
import CategorySection from './CategorySection';
import BrandSection from './BrandSection';
import BranchSection from './BranchSection';
import SideBar from './SideBar';
import LoginPage from "./LoginPage";
import Footer from "./Footer";
import NavBar from "./NavBar";

function HomePage({currentUser, handleUser})
{
    
    var loggedIn = currentUser && currentUser.userId !== 0;

    return (
    <div className="home-page">
        <header>
            <NavBar currentUser={currentUser} handleUser={handleUser} />
        </header>
        
        {
            loggedIn && <SideBar currentUser={currentUser} handleUser={handleUser} />
        }
        <div className="home-page-container">
            <OverviewDisplay />
            <OfferDisplay />
            <CategorySection />
            <BrandSection />
            <BranchSection />
        </div>

        <Footer />
    </div>
    );
}

export default HomePage;