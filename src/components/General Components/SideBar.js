import {useRef} from "react";
import { Link, useLocation} from "react-router-dom";
import CartItem from "./CartItem";
import "./SideBar.css";

function SideBar({currentUser, handleUser})
{
    const location = useLocation();
    
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

    const sideBar = useRef(null);


    function manageMenus(event)
    {
        const menus = document.querySelectorAll("[name='dropdown-checkbox']");
        console.log(menus);
        for(let i = 0; i < menus.length; i++)
        {
            if(menus[i]!==event.target) menus[i].checked = false;
        }
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


    return (
        <div className="side-bar-container">
            <input className="cart-checkbox" type="checkbox" name="dropdown-checkbox" id="cart-toggle" onChange={manageMenus}  />
            <div className="side-bar" ref = {sideBar}>
                <div className="side-bar-header">
                    <h1>My Cart</h1>
                </div>
                <div className="side-bar-content">
                    {
                        currentUser.cart && currentUser.cart.length !== 0 ? <div className="shopping-cart-list">
                        {
                            handleCartList(currentUser.cart).map((item,index)=>
                            <CartItem product={item} currentUser={currentUser} handleUser={handleUser} key={"Item"+index}/>
                            )
                        }
                        </div>
                        : <div className="shopping-cart-empty"><h1>Shopping cart empty</h1></div> 
                    }
                </div>
                <div className="side-bar-footer">
                    <div className="total-cost-label">
                        <h2>Total:</h2><h2>{calculateTotal()}</h2>
                    </div>
            
                    <Link to={"/checkout"} state={{prevPath: location.pathname}} className="checkout-button" disabled={currentUser.cart && currentUser.cart.length===0}>Checkout</Link>
                    
                </div>
                <label htmlFor="cart-toggle" className="cart-button-container">
                    <img className="cart-icon" src={require("../../img/cart-icon.png")} alt="cart icon"/>
                </label>
                
                <div className="side-bar-overlay"></div>

            
            </div>
        </div>
    )
}

export default SideBar;