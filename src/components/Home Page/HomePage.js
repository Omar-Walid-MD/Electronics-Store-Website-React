import './HomePage.css';
import OverviewDisplay from './OverviewDisplay';
import OfferDisplay from './OfferDisplay';
import CategorySection from './CategorySection';
import BrandSection from './BrandSection';
import BranchSection from './BranchSection';
import SideBar from '../General Components/SideBar';
import Footer from "../General Components/Footer";
import NavBar from "../General Components/NavBar";

function HomePage({currentUser, handleUser, productList})
{
    
    var loggedIn = currentUser && currentUser.userId !== 0;

    return (
    <div className="home-page">
        <header>
            <NavBar currentUser={currentUser} handleUser={handleUser} productList={productList} />
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