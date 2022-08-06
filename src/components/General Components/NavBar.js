import searchIcon from "../../img/search.png"
import { Link, useLocation } from "react-router-dom";

function NavBar({currentUser, handleUser})
{

    const location = useLocation();

    var loggedIn = currentUser && currentUser.userId !== 0;

    function logOut(e)
    {
       

        let nullUser = {id: 0, userId: 0};
        handleUser(nullUser);

        const axios = require('axios');

        axios.put('http://localhost:8000/currentUser/0',
            nullUser
        )
        .then(resp =>{
            //console.log(resp.data);
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    function manageMenus(event)
    {
        const menus = document.querySelectorAll("[name='dropdown-checkbox']");
        for(let i = 0; i < menus.length; i++)
        {
            if(menus[i]!==event.target) menus[i].checked = false;
        }
        
    }
    

    return (
        <div className="nav-bar">
            <Link to={"/"}><img  className="store-logo" src={require("../../img/store-logo-full.png")}/></Link>
            <div className="search-bar-container">
            <img className="search-icon" src={searchIcon} alt="search-icon" />
            <input className="search-bar" type="search" />
            </div>
            <div className="nav-bar-options-container">
            
                {
                loggedIn ?  <div className="profile-menu-container">     
                                <input className="profile-checkbox" type="checkbox" name="dropdown-checkbox" id="profile-toggle" onChange={manageMenus} />
                                <label htmlFor="profile-toggle">
                                    <img className="profile-icon" src={require("../../img/profile-icon.png")}/>
                                </label>
                                <div className="profile-dropdown-container">
                                    <div className="profile-overview-info-container">
                                        <div className="profile-picture-container"></div>
                                        <h2>{currentUser.firstName + " " + currentUser.lastName}</h2>
                                        <h3>{currentUser.email}</h3>
                                    </div>
                                    <div className="border-line"></div>

                                    <div className="profile-overview-options-container">
                                        <Link to={"/edit-profile"} state={{currentUser: currentUser, prevPath: location.pathname}} className="nav-bar-link">Edit Profile</Link>
                                        <div>My Cart</div>
                                    </div>
                                    <div className="border-line"></div>

                                    <div className="profile-overview-logout-container">
                                        <button onClick={logOut}>Logout</button>
                                    </div>
                                    
                                    
                                </div>
                            </div>


                        : <div className="login-register-container">
                            <Link to={"/register"} state={{ prevPath: location.pathname }} className="account-button">Register</Link>
                            <Link to={"/login"} state={{ prevPath: location.pathname }} className="login-button account-button">Log in</Link>
                            </div>
                        
                }    

            <div className="menu-container">
                <input className="menu-checkbox" name="dropdown-checkbox" type="checkbox" id="menu-toggle" onChange={manageMenus} />
                <label htmlFor="menu-toggle">
                    <img className="menu-icon" src={require("../../img/menu-icon.png")}/>
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