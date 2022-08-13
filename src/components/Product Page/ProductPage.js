import NavBar from "../General Components/NavBar";
import SideBar from "../General Components/SideBar";
import Footer from "../General Components/Footer"
import Popup from "../General Components/Popup"
import { useState, useEffect, useRef } from "react";
import { Link,useLocation } from 'react-router-dom';
import "./ProductPage.css";

function ProductPage({productList, currentUser, handleUser})
{
    var loggedIn = currentUser && currentUser.userId !== 0;

    const location = useLocation();
    const { product } = location.state || {};

    const [popUps,setPopups] = useState([]);

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

    function moveInfoBox(event)
    {
        const ZoomBox = document.querySelector(".product-overview-image-zoom-container");
        const ImageContainer = document.querySelector(".product-overview-image-container");

        let offsetX = event.offsetX;
        let offsetY = event.offsetY;
        let x = offsetX/ImageContainer.offsetWidth*100;
        let y = offsetY/ImageContainer.offsetHeight*100;
        ImageContainer.style.backgroundPositon = x + "%" + y +"%";

        let width = 150;

        // if(event.clientY + width <= ImageContainer.getBoundingClientRect().bottom
        //     && event.clientY - width >= ImageContainer.getBoundingClientRect().top
        //     && event.clientX + width <= ImageContainer.getBoundingClientRect().right
        //     && event.clientX - width >= ImageContainer.getBoundingClientRect().left)
        // {
        // }

        // let xMid = (ImageContainer.getBoundingClientRect().left+ImageContainer.getBoundingClientRect().right)/2;
        // let yMid = (ImageContainer.getBoundingClientRect().top+ImageContainer.getBoundingClientRect().bottom)/2;
        
        
        // ZoomBox.style.top = event.clientY - 150 + "px";
        // ZoomBox.style.left = event.clientX - 150 + "px";
 
        // ZoomLayer.style.top =  (event.clientY - 0.9 * ZoomLayer.clientHeight + Math.sign(yMid - event.clientY) * 0.25 * ZoomLayer.clientHeight) + "px";
        // ZoomLayer.style.left = (event.clientX - 0.9 * ZoomLayer.clientWidth + Math.sign(xMid - event.clientX) * 0.25 * ZoomLayer.clientWidth) + "px";
        

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
                popUpMessage("Product Added to your cart!");
            }).catch(error => {
                console.log(error);
            });

            //To update state and trigger re-render
            handleUser(profileWithNewProduct);
        }
        else
        {
            popUpMessage("You need to login to add products to your cart!");
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
                popUpMessage("Product removed from your cart");
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

    function popUpMessage(message)
    {
        setPopups([]);
        setPopups([{id: makeId(5), message: message}]);
    }

    function makeId(length)
    {
        let result = "";
        let chars = "123456789";
        for (var i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * 9)];
        }
        return result;
    }

    return (
        <div className="product-page">
            <header>
                <NavBar currentUser={currentUser} handleUser={handleUser} productList={productList} />
            </header>
            {
                loggedIn && <SideBar currentUser={currentUser} handleUser={handleUser}/>
            }

            <div className="product-page-container">
                <div className="product-overview-container">
                    <div className="product-overview-image-container" onMouseMove={moveInfoBox}>
                        <img className="product-overview-image" src={product.img && require("../../img/products/"+product.img+".png")} />
                        {/* <div className="product-overview-image-zoom-container">
                            <img className="product-overview-image-zoom-layer" src={product.img && require("../../img/products/"+product.img+".png")} />
                        </div> */}
                    </div>
                    <div className="product-overview-info-container">
                        <h1 className="product-overview-info-name">{product.name}</h1>
                        <h2 className="product-overview-info-spec-list-label">Specifiations:</h2>
                            <ul className="product-overview-info-spec-list">
                            {
                                product && specList[product.category].map((spec)=>
                                <li  key={"product-overview-info-spec-"+spec.code}><b>{spec.name}</b>: {product.specs[spec.code]}</li>
                                )
                            }
                            </ul>
                    </div>
                    <div className="product-overview-availability-container">
                        {
                            InCart(product)
                            ? <button className="product-page-cart-button" state="remove" onClick={function(){RemoveFromCart(product);}}>
                                Remove from Cart
                                <img className="product-page-cart-button-icon" src={require("../../img/remove-from-cart-icon.png")} />
                            </button>
                            : <button className="product-page-cart-button" onClick={function(){AddToCart(product);}}>
                                Add to cart
                                <img className="product-page-cart-button-icon" src={require("../../img/add-to-cart-icon.png")} />
                            </button>
                        }
                        
                    </div>
                </div>
                <div className="product-page-reviews-container">
                    <h1>Reviews:</h1>
                    <div className="product-page-reviews-group">
                        <div className="product-page-review-container">
                            <h2 className="product-page-review-title">Good product</h2>
                            <div className="product-page-review-rating-container">
                                <div className="product-page-review-rating-background">
                                    <div className="product-page-review-rating-fill"></div>
                                </div>
                                <div className="product-page-review-rating-label">4/5</div>
                            </div>
                            <p className="product-page-review-body">This product is great. I bought it and liked it.</p>
                            <p className="product-page-review-username">By <b>username</b> </p>
                        </div>

                        <div className="product-page-review-container">
                            <h2 className="product-page-review-title">Good product</h2>
                            <div className="product-page-review-rating-container">
                                <div className="product-page-review-rating-background">
                                    <div className="product-page-review-rating-fill"></div>
                                </div>
                                <div className="product-page-review-rating-label">4/5</div>
                            </div>
                            <p className="product-page-review-body">This product is great. I bought it and liked it.</p>
                            <p className="product-page-review-username">By <b>username</b> </p>
                        </div>

                    </div>
                </div>

                <div className="product-page-similar-products-container">
                    <h1>Similar products:</h1>
                    <div className="product-page-similar-products-group">
                        <div className="product-page-similar-product-container">
                            
                        </div>
                    </div>
                </div>
                <div className="popups-container">
                {
                    
                    popUps.map((popup)=>(
                        <Popup popup={popup} key={"popup-"+popup.id}/>
                    ))
                }
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default ProductPage;