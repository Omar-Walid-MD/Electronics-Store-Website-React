import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom"
import "./CheckOutPage.css"

function CheckOutPage({currentUser,handleUser})
{
    const location = useLocation();
    const { prevPath } = location.state;

    const [info,setInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        creditCardNumber: "",
        creditCardCode: "",
        creditCardExpiry: "",
        password: "",
        confirmPassword: ""
    })

    const [submitted,setSubmitted] = useState("`none`");

    const [requiredFields,setRequiredFields] = useState(document.querySelectorAll(".checkout-form-input"));

    function handleInfo(event)
    {
        setInfo({
            ...info,
            [event.target.name]: event.target.value
        })
    }
    

    function handleCartList(inputList)
    {
        let cartList = []
        for (let i = 0; i < inputList.length; i++) {
            const item = inputList[i];

            if(cartList.some((listItem)=>listItem.id===item.id))
            {
                cartList.filter((listItem)=>listItem.id===item.id)[0].count++
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

    function InputEmpty(allInputs)
    {
        for(let i = 0; i < allInputs.length; i++)
        {
            if(allInputs[i].value==="") return true;
        }
        return false;
    }

    function performCheckout(e)
    {
        e.preventDefault();

        if(info.password!==currentUser.password)
        {
            setSubmitted("passwordFailed")
        }
        else
        {
            if(info.password!==info.confirmPassword)
            {
                setSubmitted("confirmPasswordFailed")
                console.log(prevPath)

            }
            else
            {
                let { password, confirmPassword, ...purchaseInfo } = info;

                purchaseInfo = {
                    ...purchaseInfo,
                    id: "purchase-"+makeId(10),
                    total: calculateTotal(),
                    purchasedProducts: handleCartList(currentUser.cart),
                    purchaseDate: Date()
                }


                let profileWithNewProduct = {
                    ...currentUser,
                    cart: [],
                    purchases: [...currentUser.purchases, purchaseInfo.id]
                };
                
                fetch('http://localhost:8000/purchases',{
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(purchaseInfo)
                }).then(()=>{
                    console.log("New Purchase Added.");

                })

                localStorage.setItem('currentUser', JSON.stringify(profileWithNewProduct));
                handleUser(profileWithNewProduct);

                setSubmitted("submitted");
                return;

            }
        }
    }

    function makeId(length) {
        let result = "";
        let chars = "123456789";
        for (var i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * 9)];
        }
        return result;
      }

    useEffect(()=>{
        setRequiredFields(document.querySelectorAll(".checkout-form-input"));
    },[info])

    return (
        <div className="checkout-page">
            <div className="checkout-page-container">
                
                {
                    submitted !== "submitted"
                    ? 
                    <div className="checkout-form-container">
                        <h1 className="checkout-form-title">Checkout</h1>
                        <form className="checkout-form" onSubmit={performCheckout} >
                            <div className="checkout-form-wrapper">
                                <div className="checkout-form-info-column">
                                    <h2 className="checkout-form-section-group-label">Personal Information:</h2>
                                    
                                    <div className="checkout-form-section-group">
                                        <div className="checkout-form-section">
                                            <h2 className="checkout-form-section-label">First Name:</h2>
                                            <input className="checkout-form-input" type="text" name="firstName" value={info.firstName} onChange={function(event){handleInfo(event)}} />
                                        </div>
                                        <div className="checkout-form-section">
                                            <h2 className="checkout-form-section-label">Last Name:</h2>
                                            <input className="checkout-form-input" type="text" name="lastName" value={info.lastName} onChange={function(event){handleInfo(event)}} />
                                        </div>
                                        <div className="checkout-form-section">
                                            <h2 className="checkout-form-section-label">Email:</h2>
                                            <input className="checkout-form-input" type="text" name="email" value={info.email} onChange={function(event){handleInfo(event)}} />
                                        </div>
                                        <div className="checkout-form-section">
                                            <h2 className="checkout-form-section-label">Address:</h2>
                                            <input className="checkout-form-input" type="text" name="address" value={info.address} onChange={function(event){handleInfo(event)}} />
                                        </div>
                                        <div className="checkout-form-section">
                                            <h2 className="checkout-form-section-label">Phone Number:</h2>
                                            <input className="checkout-form-input" type="text" name="phoneNumber" value={info.phoneNumber} onChange={function(event){handleInfo(event)}} />
                                        </div>
                                        
                                    </div>

                                    <h2 className="checkout-form-section-group-label">Payment information:</h2>

                                    <div className="checkout-form-section-group">
                                        <div className="checkout-form-section">
                                            <h2 className="checkout-form-section-label">Credit Card Number:</h2>
                                            <input className="checkout-form-input" type="text" name="creditCardNumber" value={info.creditCardNumber} onChange={function(event){handleInfo(event)}} />
                                        </div>
                                        <div className="checkout-form-section">
                                            <h2 className="checkout-form-section-label">Security Code:</h2>
                                            <input className="checkout-form-input" type="password" name="creditCardCode" value={info.creditCardCode} onChange={function(event){handleInfo(event)}} />
                                        </div>
                                        <div className="checkout-form-section">
                                            <h2 className="checkout-form-section-label">Expiration Date:</h2>
                                            <input className="checkout-form-input" type="text" name="creditCardExpiry" value={info.creditCardExpiry} onChange={function(event){handleInfo(event)}} />
                                        </div>
                                        
                                    </div>

                                    <h2 className="checkout-form-section-group-label">Account Confirmation:</h2>
                                    <div className="checkout-form-section-group">
                                        <div className="checkout-form-section">
                                            <h2 className="checkout-form-section-label">Password:</h2>
                                            <input className="checkout-form-input" type="password" name="password" value={info.password} onChange={function(event){handleInfo(event)}} />
                                        </div>
                                        <div className="checkout-form-section">
                                            <h2 className="checkout-form-section-label">Confirm Password:</h2>
                                            <input className="checkout-form-input" type="password" name="confirmPassword" value={info.confirmPassword} onChange={function(event){handleInfo(event)}} />
                                        </div>
                                        
                                    </div>

                                    {
                                        submitted==="passwordFailed" && <div className="checkout-form-password-incorrect-warning" key={"password-incorrect-warning-"+makeId(10)}>Password Incorrect</div>  
                                    }

                                    {
                                        submitted==="confirmPasswordFailed" && <div className="checkout-form-password-incorrect-warning" key={"password-mismatch-warning-"+makeId(10)}>Passwords do not match</div>  
                                    }

                                </div>
                                <div className="checkout-page-cart-overview-column">
                                    <div className="checkout-page-cart-overview-container">
                                        <h2>Cart Overview</h2>
                                        <div className="border-line"></div>
                                        <div className="checkout-page-cart-overview-list">
                                            <table>
                                                <tbody>
                                                    {
                                                        currentUser && handleCartList(currentUser.cart).map((item)=>

                                                        <tr className="checkout-page-cart-overview-list-item-row" key={"checkout-page-cart-item-"+item.id}>
                                                            <td className="checkout-page-cart-overview-list-item-name">{item.name}</td>
                                                            <td className="checkout-page-cart-overview-list-item-count">{item.count}</td>
                                                            <td className="checkout-page-cart-overview-list-item-price">{item.price}</td>
                                                        </tr>
                                                        
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <br></br>
                                        <div className="border-line"></div>
                                        <div className="checkout-page-cart-overview-total">
                                            <h2>Total:</h2>
                                            <h2>{currentUser ? calculateTotal() : 0}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input className="checkout-page-form-submit" type="submit" value="Confirm Payment" disabled={InputEmpty(requiredFields)}/>
                        </form>
                    </div>
                    : <CheckoutCompletedWindow prevPath={prevPath} />
                }
            
            </div>
        </div>
    )
}


function CheckoutCompletedWindow(prevPath)
{
    const [processingState,setProcessingState] = useState("processing")

    useEffect(()=>{

        setTimeout(() => {
            setProcessingState("completed")
        }, 5000);

    },[])

    return (
        <div className="checkout-completed-window-container">
            {
                processingState === "processing"
                ?
                <div className="checkout-processing-container">
                    <img className="checkout-processing-loading loading" src={require("../../img/loading.png")} />
                    <h1>Processing Payment...</h1>
                </div>
                :
                processingState === "completed" &&
                <div className="checkout-completed-container">
                    <img className="checkout-completed-animation" src={require("../../img/check animation.gif")}/>
                    <Link to={prevPath["prevPath"]} className="checkout-finish-button" >Finish</Link>
                </div>

            }
            
        </div>
    )
}

export default CheckOutPage;