import {useEffect, useRef, useState} from "react";
import CartItem from "./CartItem";

function SideBar()
{
    const [totalPrice,setTotalPrice] = useState(0);

    const [cartList,setCartList] = useState([
        {
            name: "Mobile Phone",
            price: 49.99,
            id: 0,
        },
        {
            name: "Mobile Phone",
            price: 29.99,
            id: 1,
        },
        {
            name: "Mobile Phone",
            price: 59.99,
            id: 2,
        },
    ]);
    
    function calculateTotal()
    {
        
        setTotalPrice(0);
        for(let i = 0; i < cartList.length; i++)
        {
            setTotalPrice(x => x+=cartList[i].price);
        }

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


    useEffect(()=>{
        calculateTotal();
    },[cartList]);

    return (
        <div className="side-bar" ref = {sideBar}>
        <div className="side-bar-header">
            <h1>My Cart</h1>
        </div>
        <div className="side-bar-content">
            {
                cartList.length != 0 ? <div className="shopping-cart-list">
                                            {
                                                cartList.map((item,index)=>
                                                <CartItem ItemId={item.id} name={item.name} price={item.price} editList={setCartList} key={"Item"+index}/>
                                                )
                                            }
                                        </div>
                : <h1 className="shopping-cart-empty">Shopping cart empty</h1> 
            }
        </div>
        <div className="side-bar-footer">
            <div className="total-cost-label">
                <h2>Total:</h2><h2>{totalPrice}</h2>
            </div>
            <button className="checkout-button" disabled={cartList.length==0}>Checkout</button>
        </div>
        <label htmlFor="cart-toggle" className="cart-button-container">
            <img className="cart-icon" src={require("./img/cart-icon.png")}/>
            <input className="cart-checkbox" type="checkbox" id="cart-toggle" onChange={toggleSideBar} />
        </label>
        
        </div>
    )
}

export default SideBar;