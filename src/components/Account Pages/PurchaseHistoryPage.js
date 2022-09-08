import SideBar from '../General Components/SideBar';
import Footer from "../General Components/Footer";
import NavBar from "../General Components/NavBar";
import Popup from "../General Components/Popup"
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import "./PurchaseHistoryPage.css";



// function CartPageItem({product,currentUser,handleUser,popUpMessage})
// {

//     const removeItemWarning = useRef(null);

//     const specList = {
//         desktop: [{name:"Operating System",code:"os"},{name:"Processor",code:"processor"},{name:"RAM",code:"ram"},{name:"Storage",code:"storage"},{name:"Graphics Card",code:"graphics"}],
//         laptop: [{name:"Operating System",code:"os"},{name:"Processor",code:"processor"},{name:"RAM",code:"ram"},{name:"Storage",code:"storage"},{name:"Graphics Card",code:"graphics"},{name:"Battery life",code:"battery"}],
//         smartphone: [{name:"Operating System",code:"os"},{name:"Processor",code:"processor"},{name:"RAM",code:"ram"},{name:"Storage",code:"storage"},{name:"Screen size",code:"screen"},{name:"Camera Resolution",code:"camResolution"},{name:"Battery life",code:"battery"}],
//         tablet: [{name:"Operating System",code:"os"},{name:"Processor",code:"processor"},{name:"RAM",code:"ram"},{name:"Storage",code:"storage"},{name:"Screen size",code:"screen"},{name:"Camera Resolution",code:"camResolution"},{name:"Battery life",code:"battery"}],
//         mouse: [{name:"Connection",code:"connection"}],
//         keyboard: [{name:"Connection",code:"connection"},{name:"Key Type",code:"keyType"}],
//         monitor: [{name:"Screen size",code:"screen"},{name:"Resolution",code:"resolution"}],
//         speaker: [{name:"Connection",code:"connection"},{name:"Height",code:"height"}],
//         headphone: [{name:"Design",code:"design"},{name:"Connection",code:"connection"},{name:"Microphone",code:"microphone"},{name:"Noise Cancelling",code:"noiseCancelling"}],
//         earphone: [{name:"Design",code:"design"},{name:"Connection",code:"connection"},{name:"Microphone",code:"microphone"},{name:"Noise Cancelling",code:"noiseCancelling"}],
//         camera: [{name:"Flash",code:"flash"},{name:"Video resolution",code:"videoResolution"},{name:"Touch display",code:"touchDisplay"},{name:"Shutter speed",code:"shutterSpeed"}],
//     };

//     const [quantity,setQuantity] = useState(1);

//     function handleQuantity(event)
//     {
//         setQuantity(event.target.value);
//     }


//     function removeItem()
//     {
//         setWarning(false);

//         let count = 0;

//         let profileWithNewProduct = {
//             ...currentUser,
//             cart: currentUser.cart.filter((item)=>{
//                 if(item.id==product.id)
//                 {
//                     if(count < quantity)
//                     {
//                         count++;
//                         return false;
//                     }
//                     else
//                     {
//                         return true
//                     }
//                 }
//                 else
//                 {
//                     return true;
//                 }
//             }),
//         };
        
//         const axios = require('axios');

//         axios.put('http://localhost:8000/users/'+currentUser.id,
//             profileWithNewProduct
//         )
//         .then(resp =>{
//             console.log("Removed product from your cart");
//             popUpMessage("Product removed from your cart");
//         }).catch(error => {
//             console.log(error);
//         });

//         //To update state and trigger re-render
//         handleUser(profileWithNewProduct);

//         //To reset quantity
//         setQuantity(1);
//     }

//     function setWarning(visible)
//     {
//         const allWarnings = document.querySelectorAll(".cart-page-remove-item-warning")
//         for(let i = 0; i < allWarnings.length; i++)
//         {
//             allWarnings[i].style.visibility = "hidden";
//         }
        
//         if(visible)
//         {
//             removeItemWarning.current.style.visibility = "visible";
//         }
//     }

   

//     return (
//         <div className="cart-page-cart-item-container">
//             <div className="cart-page-cart-item-info-container">
//                 <div className="cart-page-cart-item-image-container">
//                     <img className="cart-page-cart-item-image" src={product.img && require("../../img/products/"+product.img+".png")} />
//                     <div className="cart-page-cart-item-brand">
//                         <img className="cart-page-cart-item-brand-icon" src={require('../../img/brands/'+product.brand + "-logo-small.png")} alt="brand icon" />
//                     </div>
//                 </div>
//                 <div className="cart-page-cart-item-details">
//                     <div className="cart-page-cart-item-name">{product.name}</div>
//                     <div className="cart-page-cart-item-specs">
//                         {
//                             specList[product.category].map((spec)=>
//                             <li className="cart-page-cart-item-spec" key={"info-box-spec-"+spec.code}>
//                                 <span className="cart-page-cart-item-spec-text"><b>{spec.name}</b>: {product.specs[spec.code]}</span>
//                             </li>
//                             )
//                         }
//                     </div>
//                 </div>
//             </div>
            

//             <div className="cart-page-cart-item-price">{product.price}</div>
//             {
//                 product.count > 1 && <div className="cart-page-cart-item-count">{product.count}×</div>
//             }

//             <div className="cart-page-remove-item-button-container">
//                 <div className="cart-page-remove-item-button" onClick={function(){setWarning(true)}}>
//                     Remove from Cart
//                     <img className="cart-page-remove-icon" src={require("../../img/remove-from-cart-icon.png")} />
//                 </div>
//                 {
//                     product.count > 1 &&
//                     <div className="cart-page-remove-item-count-container">
//                         Count:
//                         <input className="cart-page-remove-item-count-input" type="number" min="1" max={product.count} value={quantity} onChange={handleQuantity} onKeyDown={function(event){event.preventDefault()}}/>
//                         <div className="cart-page-remove-item-count-all-container">
//                         {
//                             quantity != product.count && <button className="cart-page-remove-item-count-all-button" onClick={function(){setQuantity(product.count)}}>All</button>
//                         }
//                         </div>
                        
//                     </div>
//                 }
//             </div>
//             <div className="cart-page-remove-item-warning" ref={removeItemWarning}>
//                 <h3 className="cart-page-remove-item-warning-label">Are you sure you want to remove this item?</h3>
//                 <div className="cart-page-remove-item-warning-buttons">
//                     <button className="cart-page-remove-item-warning-button" onClick={function(){setWarning(false)}}>Cancel</button>
//                     <button className="cart-page-remove-item-warning-button" state="remove" onClick={removeItem}>Yes, Remove</button>
//                 </div>
//             </div>
//         </div>
//     )
// }



function PurchaseHistory({currentUser,handleUser,purchaseList,productList})
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

    function handlePurchaseList(inputList)
    {
        let l = inputList.filter((purchase)=>currentUser.purchases.includes(purchase.id));
        console.log(l);
        return l;
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
                <h1 className="cart-page-cart-title">Purchase History</h1>
                <div className="cart-page-cart-item-group">
                {
                    purchaseList && currentUser ? currentUser.purchases.length !== 0 ? <div className="cart-page-shopping-cart-list">
                    {
                        handlePurchaseList(purchaseList).map((purchase)=>
                        <div className="purchase-history-item-container" key={"purchase-history"+purchase.id}>
                            <div className="purchase-history-item-date">{new Date(purchase.purchaseDate).toDateString()} {new Date(purchase.purchaseDate).toLocaleTimeString()}</div>
                            <div className="purchase-history-item-section-group">
                                <div className="purchase-history-item-personal-info-section">
                                    <h2 className="purchase-history-item-section-label">Personal Information:</h2>
                                    <ul className="purchase-history-item-personal-info-list">
                                        <li><b>First Name:</b> {purchase.firstName}</li>
                                        <li><b>Last Name:</b> {purchase.lastName}</li>
                                        <li><b>Email:</b> {purchase.email}</li>
                                        <li><b>Address:</b> {purchase.address}</li>
                                        <li><b>Phone No:</b> {purchase.phoneNumber}</li>
                                    </ul>
                                </div>
                                <div className="purchase-history-item-purchase-overview-section">
                                    <h2 className="purchase-history-item-section-label">Purchase Summary:</h2>
                                    <div className="border-line" color="black"></div>
                                    <div className="purchase-history-item-overview-list">
                                        <table>
                                            <tbody>
                                                {
                                                    purchase.purchasedProducts.map((item)=>

                                                    <tr className="purchase-history-item-overview-list-item-row" key={"purchase-history-item-overview-list-item-"+item.id}>
                                                        <Link to={"/product/"+item.id} className="purchase-history-item-overview-list-item-name">{item.name}</Link>
                                                        <td className="purchase-history-item-overview-list-item-count">{item.count}×</td>
                                                        <td className="purchase-history-item-overview-list-item-price">{item.price}</td>
                                                    </tr>
                                                    
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="border-line" color="black"></div>
                                    <h2 className="purchase-history-item-overview-total">Total: {purchase.total}</h2>
                                </div>
                                <div className="purchase-history-item-purchase-status-section">
                                    <div className="purchase-history-item-purchase-status" state={purchase.state}>{purchase.state}</div>
                                </div>
                            </div>
                            <div className="purchase-history-item-id"><b>Purchase ID:</b> {purchase.id}</div>
                        </div>
                        )
                    }
                    </div>
                    :   <div className="cart-page-shopping-cart-empty">
                            <h1 className="cart-page-shopping-cart-empty-label">You have no purchases</h1>
                        </div>
                    : <img className="loading" src={require("../../img/loading.png")} />
                }
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

export default PurchaseHistory;
