import "../Shopping Page/ShoppingPage.css";


function Popup({popup})
{
    return (
        <div className="popup-message-container">
            <h3 className="popup-message">{popup.message}</h3>
        </div>
    )
}

export default Popup;