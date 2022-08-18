import SideBar from '../General Components/SideBar';
import Footer from "../General Components/Footer";
import NavBar from "../General Components/NavBar";
import Popup from "../General Components/Popup"
import { useState, useRef } from 'react';
import "./CartPage.css";



function CartPageItem({product,currentUser,handleUser,popUpMessage})
{

    const removeItemWarning = useRef(null);

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
    };

    const [quantity,setQuantity] = useState(1);

    function handleQuantity(event)
    {
        setQuantity(event.target.value);
    }


    function removeItem()
    {
        setWarning(false);

        let count = 0;

        let profileWithNewProduct = {
            ...currentUser,
            cart: currentUser.cart.filter((item)=>{
                if(item.id==product.id)
                {
                    if(count < quantity)
                    {
                        count++;
                        return false;
                    }
                    else
                    {
                        return true
                    }
                }
                else
                {
                    return true;
                }
            }),
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

        //To reset quantity
        setQuantity(1);
    }

    function setWarning(visible)
    {
        const allWarnings = document.querySelectorAll(".cart-page-remove-item-warning")
        for(let i = 0; i < allWarnings.length; i++)
        {
            allWarnings[i].style.visibility = "hidden";
        }
        
        if(visible)
        {
            removeItemWarning.current.style.visibility = "visible";
        }
    }

   

    return (
        <div className="cart-page-cart-item-container">
            <div className="cart-page-cart-item-info-container">
                <div className="cart-page-cart-item-image-container">
                    <img className="cart-page-cart-item-image" src={product.img && require("../../img/products/"+product.img+".png")} />
                    <div className="cart-page-cart-item-brand">
                        <img className="cart-page-cart-item-brand-icon" src={require('../../img/brands/'+product.brand + "-logo-small.png")} alt="brand icon" />
                    </div>
                </div>
                <div className="cart-page-cart-item-details">
                    <div className="cart-page-cart-item-name">{product.name}</div>
                    <div className="cart-page-cart-item-specs">
                        {
                            specList[product.category].map((spec)=>
                            <li className="cart-page-cart-item-spec" key={"info-box-spec-"+spec.code}>
                                <span className="cart-page-cart-item-spec-text"><b>{spec.name}</b>: {product.specs[spec.code]}</span>
                            </li>
                            )
                        }
                    </div>
                </div>
            </div>
            

            <div className="cart-page-cart-item-price">{product.price}</div>
            {
                product.count > 1 && <div className="cart-page-cart-item-count">{product.count}×</div>
            }

            <div className="cart-page-remove-item-button-container">
                <div className="cart-page-remove-item-button" onClick={function(){setWarning(true)}}>
                    Remove from Cart
                    <img className="cart-page-remove-icon" src={require("../../img/remove-from-cart-icon.png")} />
                </div>
                {
                    product.count > 1 &&
                    <div className="cart-page-remove-item-count-container">
                        Count:
                        <input className="cart-page-remove-item-count-input" type="number" min="1" max={product.count} value={quantity} onChange={handleQuantity} onKeyDown={function(event){event.preventDefault()}}/>
                        <div className="cart-page-remove-item-count-all-container">
                        {
                            quantity != product.count && <button className="cart-page-remove-item-count-all-button" onClick={function(){setQuantity(product.count)}}>All</button>
                        }
                        </div>
                        
                    </div>
                }
            </div>
            <div className="cart-page-remove-item-warning" ref={removeItemWarning}>
                <h3 className="cart-page-remove-item-warning-label">Are you sure you want to remove this item?</h3>
                <div className="cart-page-remove-item-warning-buttons">
                    <button className="cart-page-remove-item-warning-button" onClick={function(){setWarning(false)}}>Cancel</button>
                    <button className="cart-page-remove-item-warning-button" state="remove" onClick={removeItem}>Yes, Remove</button>
                </div>
            </div>
        </div>
    )
}



function CartPage({currentUser,handleUser,productList})
{
    var loggedIn = currentUser && currentUser.userId !== 0;

    const [popUps,setPopups] = useState([]);

    

    function calculateTotal()
    {
        let total = 0;

        if(currentUser.cart!=null)
        {    
            for(let i = 0; i < currentUser.cart.length; i++)
            {
                total += parseInt(currentUser.cart[i].price);
            }
        }
        return total;
    }

    function handleCartList(inputList)
    {
        let cartList = []
        for (let i = 0; i < inputList.length; i++) {
            const item = inputList[i];

            if(cartList.some((listItem)=>listItem.id==item.id))
            {
                cartList.filter((listItem)=>listItem.id==item.id)[0].count++
            }
            else
            {
                cartList.push({
                    ...item,
                    count: 1,
                })
            }
            
        }

        return cartList;
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
    <div className="cart-page">
        <header>
            <NavBar currentUser={currentUser} handleUser={handleUser} productList={productList} />
        </header>
        
        {
            loggedIn && <SideBar currentUser={currentUser} handleUser={handleUser} />
        }
        <div className="cart-page-container">
            <div className="cart-page-cart-container">
                <h1 className="cart-page-cart-title">My Cart</h1>
                <div className="cart-page-cart-item-group">
                {
                    currentUser ? currentUser.cart.length !== 0 ? <div className="cart-page-shopping-cart-list">
                    {
                        handleCartList(currentUser.cart).map((item,index)=>
                        <CartPageItem product={item} currentUser={currentUser} handleUser={handleUser} popUpMessage={popUpMessage} key={"Item"+index}/>
                        )
                    }
                    </div>
                    :   <div className="cart-page-shopping-cart-empty">
                            <h1 className="cart-page-shopping-cart-empty-label">Shopping cart empty</h1>
                        </div>
                    : <img className="loading" src={require("../../img/loading.png")} />
                }
                </div>
                <div className="cart-page-cart-checkout-container">
                    <div className="cart-page-cart-checkout-total-container">
                        <h1>Total:</h1>
                        <h1>{currentUser ? calculateTotal() : 0}</h1>
                    </div>
                    <button className="cart-page-checkout-button" disabled={!currentUser || currentUser && currentUser.cart.length===0}>Checkout</button>
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

        <Footer />
    </div>
    );
}

export default CartPage;
