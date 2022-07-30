import { useRef } from "react";

function CartItem({ItemId,name,price,editList})
{

    const removeItemWarning = useRef(null);

    function removeItem()
    {
        setWarning(false);
        editList(prevList => prevList.filter((item)=>item.id!==ItemId));
    }

    function setWarning(visible)
    {
        const allWarnings = document.querySelectorAll(".remove-item-warning")
        for(let i = 0; i < allWarnings.length; i++)
        {
            allWarnings[i].style.visibility = "hidden";
        }
        
        if(visible)
        {
            removeItemWarning.current.style.visibility = "visible";
        }
        // let visibility = removeItemWarning.current.style.visibility;
        // if(visibility==="visible") removeItemWarning.current.style.visibility = "hidden";
        // else 
    }

    return (
        <div className="cart-item-container">
            <div className="cart-item-name">{name}</div>
            <div className="cart-item-price">{price}</div>

            <div className="remove-item-button" onClick={function(){setWarning(true)}}><img className="remove-icon" src={require("./img/x.png")} /></div>
            {/* <input className="remove-item-checkbox" type="checkbox" id={"remove-"+ItemId} /> */}
            <div className="remove-item-warning" ref={removeItemWarning}>
                <h3 className="remove-item-warning-label">Are you sure you want to remove this item?</h3>
                <div className="remove-item-warning-buttons">
                    <button className="remove-item-warning-button" onClick={function(){setWarning(false)}}>Cancel</button>
                    <button className="remove-item-warning-button" onClick={removeItem}>Yes, Remove</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem;