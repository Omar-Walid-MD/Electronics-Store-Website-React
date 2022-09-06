import { useState, useEffect } from "react";
import "./CheckOutPage.css"

function CheckOutPage({currentUser})
{

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

    useEffect(()=>{
        setRequiredFields(document.querySelectorAll(".checkout-form-input"));
    },[info])

    return (
        <div className="checkout-page">
            <div className="checkout-page-container">
                <div className="checkout-form-container">
                    <h1 className="checkout-form-title">Checkout</h1>
                        <form className="checkout-form" >

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
                                </div>
                                <div className="checkout-page-cart-overview-column">
                                    <div className="checkout-page-cart-overview-container">
                                        <h2>Cart Overview</h2>
                                        <div className="border-line"></div>
                                        <div className="checkout-page-cart-overview-list">
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
            </div>
        </div>
    )
}

export default CheckOutPage;