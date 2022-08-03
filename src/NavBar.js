import searchIcon from "./img/search.png"
import { Link } from "react-router-dom";

function NavBar({currentUser, handleUser})
{
    var loggedIn = currentUser && currentUser.userId !== 0;

    function logOut()
    {
        let nullUser = {id: 0, userId: 0};
        handleUser(nullUser);

        const axios = require('axios');

        axios.put('http://localhost:8000/currentUser/0',
            nullUser
        )
        .then(resp =>{
            console.log(resp.data);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="nav-bar">
            <h1 className="logo">Store Title</h1>
            <div className="search-bar-container">
            <img className="search-icon" src={searchIcon} alt="search-icon" />
            <input className="search-bar" type="search" />
            </div>
            <div className="nav-bar-options-container">
            
                {
                loggedIn ?  <div className="profile-menu-container">     
                                <input className="profile-checkbox" type="checkbox" id="profile-toggle" />
                                <label htmlFor="profile-toggle">
                                    <img className="profile-icon" src={require("./img/profile-icon.png")}/>
                                </label>
                                <div className="profile-dropdown-container">
                                    <div className="profile-overview-info-container">
                                        <div className="profile-picture-container"></div>
                                        <h2>{currentUser.firstName + " " + currentUser.lastName}</h2>
                                        <h3>{currentUser.email}</h3>
                                    </div>
                                    <div className="border-line"></div>

                                    <div className="profile-overview-options-container">
                                        <a>Edit Profile</a>
                                        <a>My Cart</a>
                                    </div>
                                    <div className="border-line"></div>

                                    <div className="profile-overview-logout-container">
                                        <button onClick={logOut}>Logout</button>
                                    </div>
                                    
                                    
                                </div>
                            </div>


                        : <div className="login-register-container">
                            <Link to={"/register"} className="account-button">Register</Link>
                            <Link to={"/login"} className="login-button account-button">Log in</Link>
                            </div>
                        
                }    

            <div className="menu-container">
                <input className="menu-checkbox" type="checkbox" id="menu-toggle" />
                <label htmlFor="menu-toggle">
                    <img className="menu-icon" src={require("./img/menu-icon.png")}/>
                </label>
                    <div className="dropdown-menu-container">
                    <div className="dropdown-menu-option" onClick={function(){console.log("hi")}}>Option</div>
                    <div className="dropdown-menu-option">Option</div>
                    <div className="dropdown-menu-option">Option</div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default NavBar;