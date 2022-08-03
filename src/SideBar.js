import {useEffect, useRef, useState} from "react";
import CartItem from "./CartItem";

function SideBar({currentUser, handleUser})
{
    
    function calculateTotal()
    {
        let total = 0;
        for(let i = 0; i < currentUser.cart.length; i++)
        {
            total += parseInt(currentUser.cart[i].price);
        }
        return total;
    }

    const sideBar = useRef(null);

    function toggleSideBar(event)
    {
        sideBar.current.style.transition = "right 0.5s ease-in-out";
        if(event.target.checked)
        {
        sideBar.current.style.right = "0px";
        }
        else
        {
        sideBar.current.style.right = "-" + getComputedStyle(sideBar.current).width;
        }

        console.log(sideBar.current.style.width);
    }


    return (
        <div className="side-bar" ref = {sideBar}>
        <div className="side-bar-header">
            <h1>My Cart</h1>
        </div>
        <div className="side-bar-content">
            {
                currentUser.cart && currentUser.cart.length !== 0 ? <div className="shopping-cart-list">
                                            {
                                                currentUser.cart.map((item,index)=>
                                                <CartItem ItemId={item.id} name={item.name} currentUser={currentUser} handleUser={handleUser} price={item.price} key={"Item"+index}/>
                                                )
                                            }
                                        </div>
                : <h1 className="shopping-cart-empty">Shopping cart empty</h1> 
            }
        </div>
        <div className="side-bar-footer">
            <div className="total-cost-label">
                <h2>Total:</h2><h2>{calculateTotal()}</h2>
            </div>
            <button className="checkout-button" disabled={currentUser.cart.length===0}>Checkout</button>
        </div>
        <label htmlFor="cart-toggle" className="cart-button-container">
            <img className="cart-icon" src={require("./img/cart-icon.png")}/>
            <input className="cart-checkbox" type="checkbox" id="cart-toggle" onChange={toggleSideBar} />
        </label>
        
        </div>
    )
}

export default SideBar;