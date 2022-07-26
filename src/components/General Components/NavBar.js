import searchIcon from "../../img/search.png"
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./NavBar.css";

function NavBar({currentUser, handleUser, productList})
{

    const location = useLocation();

    var loggedIn = currentUser && currentUser.userId !== 0;

    const [searchValue,setSearchValue] = useState("");

    const [productForInfo,setProductForInfo] = useState(null);

    const specList = {
        desktop: [{name:"Operating System",code:"os"},{name:"Processor",code:"processor"},{name:"RAM",code:"ram"},{name:"Storage",code:"storage"},{name:"Graphics Card",code:"graphics"}],
        laptop: [{name:"Operating System",code:"os"},{name:"Processor",code:"processor"},{name:"RAM",code:"ram"},{name:"Storage",code:"storage"},{name:"Graphics Card",code:"graphics"},{name:"Battery life",code:"battery"}],
        smartphone: [{name:"Operating System",code:"os"},{name:"Processor",code:"processor"},{name:"RAM",code:"ram"},{name:"Storage",code:"storage"},{name:"Screen size",code:"screen"},{name:"Camera Resolution",code:"camResolution"},{name:"Battery life",code:"battery"}],
        tablet: [{name:"Operating System",code:"os"},{name:"Processor",code:"processor"},{name:"RAM",code:"ram"},{name:"Storage",code:"storage"},{name:"Screen size",code:"screen"},{name:"Camera Resolution",code:"camResolution"},{name:"Battery life",code:"battery"}],
        mouse: [{name:"Connection",code:"connection"}],
        keyboard: [{name:"Connection",code:"connection"},{name:"Key Type",code:"keyType"}],
        monitor: [{name:"Screen size",code:"screen"},{name:"Resolution",code:"resolution"}],
        speaker: [{name:"Connection",code:"connection"},{name:"Height",code:"height"}],
        headphone: [{name:"Design",code:"design"},{name:"Connection",code:"connection"},{name:"Microphone",code:"microphone"},{name:"Noise Cancelling",code:"noiseCancelling"}],
        earphone: [{name:"Design",code:"design"},{name:"Connection",code:"connection"},{name:"Microphone",code:"microphone"},{name:"Noise Cancelling",code:"noiseCancelling"}],
        camera: [{name:"Flash",code:"flash"},{name:"Video resolution",code:"videoResolution"},{name:"Touch display",code:"touchDisplay"},{name:"Shutter speed",code:"shutterSpeed"}],
    }

    function handleSearch(e)
    {
        setSearchValue(e.target.value);
        console.log(e.target.value);

        //setProductForInfo(null);
    }

    function SearchProduct()
    {
        if(productList!==null && productList.filter((product)=>product.name.toLowerCase().includes(searchValue.toLowerCase())).length===0 && productForInfo) setProductForInfo(null);
        return productList!==null ? productList.filter((product)=>product.name.toLowerCase().includes(searchValue.toLowerCase())) : [];
    }

    const infoBox = useRef(null);

    function moveInfoBox(event,product)
    {
        const PageContainer = document.querySelector(".search-results-container");
        let maxbottom = PageContainer.getBoundingClientRect().bottom + window.pageYOffset;
        let maxRight = PageContainer.getBoundingClientRect().right + window.pageXOffset;

        let leftOffset = 0;
        let topOffset = 0;

        if(maxRight - event.clientX < infoBox.current.getBoundingClientRect().width) leftOffset = infoBox.current.getBoundingClientRect().width;
        if(maxbottom - event.clientY < infoBox.current.getBoundingClientRect().height) topOffset = infoBox.current.getBoundingClientRect().height;

        infoBox.current.style.top = event.clientY + 10 - topOffset + "px";
        infoBox.current.style.left = event.clientX + 10 - leftOffset + "px";

    }

    function handleProductForInfo(event,product)
    {
        if(product)
        {
            if(product !== productForInfo)
            {
                setProductForInfo(product);
            }

            if(infoBox.current.style.top == 0)
            {
                infoBox.current.style.top = event.clientY + 10 + "px";
                infoBox.current.style.left = event.clientX + 10 + "px";
            }
        }
        else
        {
            setProductForInfo(null);
        }
    }

    function logOut(e)
    {
       

        let nullUser = {id: 0, userId: 0};
        handleUser(nullUser);

        localStorage.setItem('currentUser', JSON.stringify(null));


    }

    function manageMenus(event)
    {
        const menus = document.querySelectorAll("[name='dropdown-checkbox']");
        for(let i = 0; i < menus.length; i++)
        {
            if(menus[i]!==event.target) menus[i].checked = false;
        }
        
    }

    function calculateRating(product)
    {
        let rating = 5;
        if(product.productReviews.length > 0)
        {
            rating = 0;
            for (let i = 0; i < product.productReviews.length; i++) {
                const review = product.productReviews[i];
                rating += review.rating;
            }
            rating = rating / product.productReviews.length;
            console.log(product.productReviews.length)
        }
        return rating;
    }


    function AddToCart(product)
    {
        if(loggedIn)
        {
            let profileWithNewProduct = {
                ...currentUser,
                cart: [...currentUser.cart,product],
            };
            
            const axios = require('axios');

            axios.put('http://localhost:8000/users/'+currentUser.id,
                profileWithNewProduct
            )
            .then(resp =>{
                console.log("Added product to your cart");
                //popUpMessage("Product Added to your cart!");
            }).catch(error => {
                console.log(error);
            });

            //To update state and trigger re-render
            localStorage.setItem('currentUser', JSON.stringify(profileWithNewProduct));
            handleUser(profileWithNewProduct);
        }
        else
        {
            //popUpMessage("You need to login to add products to your cart!");
        }
    }

    function RemoveFromCart(product)
    {
        if(loggedIn)
        {
            let profileWithNewProduct = {
                ...currentUser,
                cart: currentUser.cart.filter((item)=>item.id!==product.id),
            };
            
            const axios = require('axios');

            axios.put('http://localhost:8000/users/'+currentUser.id,
                profileWithNewProduct
            )
            .then(resp =>{
                console.log("Removed product from your cart");
                //popUpMessage("Product removed from your cart");
            }).catch(error => {
                console.log(error);
            });

            //To update state and trigger re-render
            handleUser(profileWithNewProduct);
        }
        else
        {
            console.log("You need to log in!")
        }
    }

    function InCart(product)
    {
        if(loggedIn)
        {    
            for(let i = 0; i < currentUser.cart.length; i++)
            {
                if(product.id===currentUser.cart[i].id) return true;
            }
    
        }
        return false;
    }

    function AmountInCart(product)
    {
        let count = 0;
        if(loggedIn)
        {    
            for(let i = 0; i < currentUser.cart.length; i++)
            {
                if(product.id===currentUser.cart[i].id) count++;
            }
    
        }
        return count;
    }

    // useEffect(()=>{
    //     setSearchValue("");
    // },[])
    

    return (
        <div className="nav-bar">
            <Link to={"/"}><img  className="store-logo" src={require("../../img/store-logo-full.png")}/></Link>
            <div className="search-bar-container">
                <img className="search-icon" src={searchIcon} alt="search-icon" />
                <input className="search-bar" type="search" value={searchValue} onChange={handleSearch} />

                {
                    searchValue !== "" &&

                    <div className="search-results-container">

                        {
                            SearchProduct().length !== 0
                            ?
                            <div className="search-results-grid">

                                {
                                    SearchProduct().map((product)=>

                                    <div className="search-result-container" key={product.id} onMouseOver={function(event){handleProductForInfo(event,product)}} onMouseMove={productForInfo && function(event){moveInfoBox(event,product)}} onMouseLeave={function(){handleProductForInfo(null)}}>
                                        <Link className="product-link" to={"/product/"+product.id} state={{product: product}} onClick={()=>window.location.assign("/product/"+product.id)}>
                                            <div className="search-result-image-container">
                                                <img className="search-result-image" src={product.img && require("../../img/products/"+product.img+".png")} />
                                                <div className="search-result-brand">
                                                    <img className="search-result-brand-icon" src={require('../../img/brands/'+product.brand + "-logo-small.png")} alt="brand icon" />
                                                </div>
                                            </div>
                                            <div className="search-result-info">
                                                <h3 className="search-result-name">{product.name}</h3>
                                                <div className="search-result-rating-background">
                                                    <div className="search-result-rating-fill" style={{width: calculateRating(product) * 20 + "%"}}></div>
                                                </div>
                                            </div>
                                            <h1 className="search-result-price">{product.price}</h1>
                                        </Link>
                                        
                                        <button className="product-result-option-button" onClick={function(){AddToCart(product);}} disabled={AmountInCart(product) >= 10}><img className="product-result-cart-icon" src={require("../../img/add-to-cart-icon.png")} alt="remove from cart icon" /></button>
                                
                                        {
                                            InCart(product) && <div className="product-result-cart-count">
                                                <div className="product-result-cart-count-label">{AmountInCart(product)}×</div>
                                                <img className="product-result-cart-count-icon" src={require("../../img/cart-icon.png")} alt="add to cart icon" />
                                            </div>
                                        }
                                
                                    </div>
                                    )

                                }    
                
                            </div>
                            
                            : <h2 className="search-results-empty-message">No Results for "{searchValue}"</h2>
                        }

                    </div>
                }

            </div>
            <div className="nav-bar-options-container">
            
                {
                loggedIn ?  <div className="profile-menu-container">     
                                <input className="profile-checkbox" type="checkbox" name="dropdown-checkbox" id="profile-toggle" onChange={manageMenus} />
                                <label htmlFor="profile-toggle">
                                    <div className="profile-icon-container">
                                        <img className="profile-icon" src={currentUser.image ? currentUser.image : require("../../img/profile-icon.png")}/>
                                    </div>
                                </label>
                                <div className="profile-dropdown-container">
                                    <div className="profile-overview-info-container">
                                        <div className="profile-picture-container">
                                            <img src={currentUser.image ? currentUser.image : require("../../img/profile-icon.png")}/>
                                        </div>
                                        <h2>{currentUser.firstName + " " + currentUser.lastName}</h2>
                                        <h3>{currentUser.email}</h3>
                                    </div>
                                    <div className="border-line"></div>

                                    <div className="profile-overview-options-container">
                                        <Link className="nav-bar-link" to={"/edit-profile"} state={{currentUser: currentUser, prevPath: location.pathname}}>Edit Profile</Link>
                                        <Link className="nav-bar-link" to={"/cart"} state={{currentUser: currentUser, prevPath: location.pathname}}>My Cart</Link>
                                        <Link className="nav-bar-link" to={"/purchase-history"} state={{currentUser: currentUser, prevPath: location.pathname}}>Purchase History</Link>
                                    </div>
                                    <div className="border-line"></div>

                                    <div className="profile-overview-logout-container">
                                        <button className="nav-bar-link" onClick={logOut}>Logout</button>
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
                    <div className="nav-bar-link">About us</div>
                    <div className="border-line"></div>
                    <div className="nav-bar-link">FAQ</div>
                    <div className="border-line"></div>
                    <div className="nav-bar-link">Support</div>
                    </div>
                </div>
            </div>


            <input className="info-box-checkbox" type="checkbox" checked={productForInfo || false} readOnly={true}/>
            <div className="info-box-container" ref={infoBox}>
                <h2>Specifiations:</h2>
                <ul className="info-box-spec-list">
                {
                    productForInfo && specList[productForInfo.category].map((spec)=>
                    <li className="info-box-spec-text" key={"info-box-spec-"+spec.code}><b>{spec.name}</b>: {productForInfo.specs[spec.code]}</li>
                    )
                }
                </ul>
                
            </div>
            
        </div>
    )
}

export default NavBar;