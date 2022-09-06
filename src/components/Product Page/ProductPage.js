import NavBar from "../General Components/NavBar";
import SideBar from "../General Components/SideBar";
import Footer from "../General Components/Footer"
import Popup from "../General Components/Popup"
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import "./ProductPage.css";

function ProductPage({productList, currentUser, handleUser, branchList})
{
    var loggedIn = currentUser && currentUser.userId !== 0;

    const productIdParam = useParams().id;
    const [product,setProduct] = useState(null);

    const [productForInfo,setProductForInfo] = useState(null);

    const [quantity,setQuantity] = useState(2);

    const [productReview,setProductReview] = useState({
        user: "",
        title: "",
        body: "",
        rating: 5
    });


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

    function handleQuantity(event)
    {
        setQuantity(event.target.value);
    }

    function clampQuantity(event)
    {
        if(event.target.value <= 1) setQuantity(1);
        else if(event.target.value >= 10) setQuantity(10);
    }
    

    function SimilarProducts(inputList)
    {
        return inputList.filter((item)=>item.category === product.category && item.brand === product.brand && item.id !== product.id)
    }


    function AddToCart(product,quantity=1)
    {
        if(loggedIn)
        {
            let productWithQuantity = []
            for (let i = 1; i <= quantity; i++) {
                productWithQuantity.push(product)
            }

            let profileWithNewProduct = {
                ...currentUser,
                cart: [...currentUser.cart,...productWithQuantity],
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
            localStorage.setItem('currentUser', JSON.stringify(profileWithNewProduct));
            handleUser(profileWithNewProduct);

            setQuantity(1);
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
            localStorage.setItem('currentUser', JSON.stringify(profileWithNewProduct));
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

    function AmountInCart(product)
    {
        let count = 0;
        if(loggedIn)
        {    
            for(let i = 0; i < currentUser.cart.length; i++)
            {
                if(product.id===currentUser.cart[i].id) count++;
            }
    
        }
        return count;
    }
    
    const infoBox = useRef(null);

    function moveInfoBox(event,product)
    {
        const PageContainer = document.querySelector(".product-page");
        let maxbottom = PageContainer.getBoundingClientRect().bottom + window.pageYOffset;
        let maxRight = PageContainer.getBoundingClientRect().right + window.pageXOffset;

        let leftOffset = 0;
        let topOffset = 0;

        if(maxRight - event.clientX < infoBox.current.getBoundingClientRect().width + 100) leftOffset = infoBox.current.getBoundingClientRect().width;
        if(maxbottom - event.clientY < infoBox.current.getBoundingClientRect().height + 100) topOffset = infoBox.current.getBoundingClientRect().height;

        infoBox.current.style.top = event.clientY + 10 - topOffset + "px";
        infoBox.current.style.left = event.clientX + 10 - leftOffset + "px";

    }

    function handleReview(event)
    {
        setProductReview({...productReview,[event.target.name]: event.target.value});
    }

    function handleReviewRating(event)
    {
        const reviewBackground = event.target.getBoundingClientRect();
        const reviewFill = event.target.querySelector(".product-page-review-form-rating-fill")
        if(event.buttons == 1)
        {
            let newWidth = Math.min(Math.max(Math.round(((event.pageX-reviewBackground.left)/reviewBackground.width * 100)/20)*20,20),100);
            setProductReview({...productReview,rating:newWidth/20});
        }
    }

    function submitReview(event)
    {
        event.preventDefault();

        //Set username before submit
        let review = {...productReview,user:currentUser.firstName + " " + currentUser.lastName};

        let updatedProductWithReview = {...product,productReviews: [...product.productReviews, review]};

    
        const axios = require('axios');

        axios.put('http://localhost:8000/products/'+product.id,
            updatedProductWithReview
        )
        .then(resp =>{
            console.log("Added your review");
            popUpMessage("Added your review!");
            setProduct(updatedProductWithReview);
        }).catch(error => {
            console.log(error);
        });

    }

    function handleProductForInfo(event,product)
    {
        if(product)
        {
            if(product !== productForInfo)
            {
                setProductForInfo(product);
            }

            if(infoBox.current.style.top == 0)
            {
                infoBox.current.style.top = event.clientY + 10 + "px";
                infoBox.current.style.left = event.clientX + 10 + "px";
            }
        }
        else
        {
            setProductForInfo(null);
        }
    }

    function calculateRating(product)
    {
        let rating = 5;
        if(product.productReviews.length > 0)
        {
            rating = 0;
            for (let i = 0; i < product.productReviews.length; i++) {
                const review = product.productReviews[i];
                rating += review.rating;
            }
            rating = rating / product.productReviews.length;
        }
        return rating;
    }

    function setAvailabilityWindow(enabled)
    {
        document.querySelector(".product-availability-window-checkbox").checked = enabled;
    }

    function popUpMessage(message)
    {
        setPopups([]);
        setPopups([{id: makeId(5), message: message}]);
    }


    const [currentBranch,setCurrentBranch] = useState();

    const pointerGroup = useRef(null);
    const infoContainer = useRef(null);

    function pointerPosition(input,dimension)
    {
        let map = document.querySelector(".product-availability-window-branches-map");
        if(map)
        { 
            let x = 0;
            if(dimension==="y")
            {
                x = parseInt(getComputedStyle(map).height.slice(0,-2));
            }
            else if(dimension==="x")
            {
                x = parseInt(getComputedStyle(map).width.slice(0,-2));
            }
            return input * x/100;
        }
        else
        {
            return 0;
        }
    }


    function selectBranch(index)
    {
        setCurrentBranch(branchList[index]);
    }

    function selectBranchFromList(index)
    {   
        setCurrentBranch(branchList[index]);
        pointerGroup.current.children[index].querySelector(".product-availability-window-branches-radio").checked = true;
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


    useEffect(()=>{

        window.scrollTo(0,0);
        
        if(productList) 
        {
            setProduct(productList.filter((product)=>product.id==productIdParam)[0]);
            
            setQuantity(1);
            setProductForInfo(null);
        }

    },[productList,productIdParam]);

    useEffect(()=>{
        if(branchList)
        {
            setCurrentBranch(branchList[0]);
        }    
    },[branchList]);

    return (
        <div className="product-page">
            <header>
                <NavBar currentUser={currentUser} handleUser={handleUser} productList={productList} />
            </header>
            {
                loggedIn && <SideBar currentUser={currentUser} handleUser={handleUser}/>
            }

            {
                product ?
                <div className="product-page-container" onKeyDown={function(event){if(event.key === "Escape")setAvailabilityWindow(false);}}>
                    <div className="product-overview-container">
                        <div className="product-overview-image-container" onMouseOver={moveInfoBox}>
                            <img className="product-overview-image" src={product.img && require("../../img/products/"+product.img+".png")} />
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
                        
                        <div className="product-overview-options-container">
                            <button className="product-overview-availability-button product-page-cart-button" onClick={function(){setAvailabilityWindow(true);}}>
                                Check availability
                                <img className="product-overview-availability-shop-icon" src={require("../../img/shop-icon.png")} />
                            </button>
                            <div className="product-overview-quantity-selector">
                                <h2 className="product-overview-quantity-label">Quantity:</h2>
                                <input className="product-overview-quantity-input" type="number" min="1" max={10-AmountInCart(product)} value={quantity} onChange={handleQuantity} onBlur={clampQuantity}/>
                            </div>
                            <button className="product-page-cart-button" onClick={function(){AddToCart(product,quantity);}} disabled={AmountInCart(product) >= 10} >
                                Add to cart
                                <img className="product-page-cart-button-icon" src={require("../../img/add-to-cart-icon.png")} />
                            </button>
                            {
                                InCart(product) && <h3 className="product-page-in-cart-message">You have {AmountInCart(product)} {AmountInCart(product) === 1 ? "unit" : "units"}  of this product in your cart</h3>
                            }
                            {/* {
                                InCart(product)
                                ? <button className="product-page-cart-button" state="remove" onClick={function(){RemoveFromCart(product);}}>
                                    Remove from Cart
                                    <img className="product-page-cart-button-icon" src={require("../../img/remove-from-cart-icon.png")} />
                                </button>
                                : <button className="product-page-cart-button" onClick={function(){AddToCart(product,quantity);}}>
                                    Add to cart
                                    <img className="product-page-cart-button-icon" src={require("../../img/add-to-cart-icon.png")} />
                                </button>
                            } */}
                            
                        </div>
                    </div>
                    <div className="product-page-reviews-container">
                        <h1>Reviews:</h1>
                        <div className="product-page-review-form-container">
                            <h2>Leave a Review:</h2>
                            <form className="product-page-review-form" onSubmit={submitReview}>
                                <input className="product-page-review-form-input" type="text" placeholder="Review Title" name="title" value={productReview.title} onChange={handleReview}/>
                                <div className="product-page-review-form-textarea-container">
                                    <textarea className="product-page-review-form-textarea product-page-review-form-input" placeholder="Review Body" name="body" value={productReview.body} onChange={handleReview}></textarea>
                                </div>
                                <div className="product-page-review-form-rating">
                                    <div className="product-page-review-rating-background" draggable="false" onMouseMove={handleReviewRating}>
                                        <div className="product-page-review-form-rating-fill product-page-review-rating-fill" draggable="false" style={{width: productReview.rating * 20 + "%"}}></div>
                                    </div>
                                    <div className="product-page-review-rating-label">{productReview.rating}/5</div>
                                </div>
                                <input className="product-page-review-rating-submit" type="submit" value="Send Review"></input>
                            </form>
                        </div>
                        <div className="product-page-reviews-group">
                            {
                                product && product.productReviews.map((review,index)=>

                                <div className="product-page-review-container" key={"product-review-"+index}>
                                    <h2 className="product-page-review-title">{review.title}</h2>
                                    <div className="product-page-review-rating-container">
                                        <div className="product-page-review-rating-background">
                                            <div className="product-page-review-rating-fill" style={{width: review.rating * 20 + "%"}}></div>
                                        </div>
                                        <div className="product-page-review-rating-label">{review.rating}/5</div>
                                    </div>
                                    <p className="product-page-review-body">{review.body}</p>
                                    <p className="product-page-review-username">By <b>{review.user}</b> </p>
                                </div>
                                )
                            }
                        </div>
                    </div>

                    <div className="product-page-similar-products-container">
                        <h1>Similar products:</h1>
                        <div className="product-page-similar-products-group">
                            {
                            productList && SimilarProducts(productList).map((similarProduct)=>
                                
                                <div className="product-page-similar-product-container" key={similarProduct.id} onMouseOver={function(event){handleProductForInfo(event,similarProduct)}} onMouseMove={productForInfo && function(event){moveInfoBox(event,similarProduct)}} onMouseLeave={function(){handleProductForInfo(null)}}>
                                    <Link className="product-link" to={"/product/"+similarProduct.id} state={{product: similarProduct}}>
                                    <div className="product-page-similar-product-image-container">
                                        <img className="product-page-similar-product-image" src={similarProduct.img && require("../../img/products/"+similarProduct.img+".png")} />
                                        <div className="product-page-similar-product-brand">
                                            <img className="product-page-similar-product-brand-icon" src={require('../../img/brands/'+similarProduct.brand + "-logo-small.png")} alt="brand icon" />
                                        </div>
                                    </div>
                                    <div className="product-page-similar-product-info">
                                        <h3 className="product-page-similar-product-name">{similarProduct.name}</h3>
                                        <div className="product-page-review-rating-background">
                                            <div className="product-page-review-rating-fill" style={{width: calculateRating(similarProduct) * 20 + "%"}}></div>
                                        </div>
                                    </div>
                                    <h1 className="product-page-similar-product-price">{similarProduct.price}</h1>
                                    </Link>
                                    {
                                        // InCart(similarProduct)
                                        // ? <div className="product-page-similar-product-option-button" state="remove" onClick={function(){RemoveFromCart(similarProduct);}}><img className="product-page-similar-product-cart-icon" src={require("../../img/remove-from-cart-icon.png")} alt="add to cart icon" /></div>
                                        // : <div className="product-page-similar-product-option-button" onClick={function(){AddToCart(similarProduct);}}><img className="product-page-similar-product-cart-icon" src={require("../../img/add-to-cart-icon.png")} alt="remove from cart icon" /></div>
                                    }

                                    <button className="product-page-similar-product-option-button" onClick={function(){AddToCart(similarProduct);}} disabled={AmountInCart(similarProduct) >= 10}><img className="product-result-cart-icon" src={require("../../img/add-to-cart-icon.png")} alt="remove from cart icon" /></button>
                                    
                                    {
                                        InCart(similarProduct) && <div className="product-result-cart-count">
                                            <div className="product-result-cart-count-label">{AmountInCart(similarProduct)}×</div>
                                            <img className="product-result-cart-count-icon" src={require("../../img/cart-icon.png")} alt="add to cart icon" />
                                        </div>
                                    }

                                </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="popups-container">
                    {
                        
                        popUps.map((popup)=>(
                            <Popup popup={popup} key={"popup-"+popup.id}/>
                        ))
                    }
                    </div>


                    <input className="info-box-checkbox" type="checkbox" checked={productForInfo || false} readOnly={true}/>
                    <div className="info-box-container" ref={infoBox}>
                        <h2>Specifiations:</h2>
                        <ul className="info-box-spec-list">
                        {
                            productForInfo && specList[productForInfo.category].map((spec)=>
                            <li className="info-box-spec-text" key={"info-box-spec-"+spec.code}><b>{spec.name}</b>: {productForInfo.specs[spec.code]}</li>
                            )
                        }
                        </ul>
                        
                    </div>
                </div>

                :

                <div className="product-page-container">
                    <img className="loading" src={require("../../img/loading.png")} />
                </div>
            }
            <input className="product-availability-window-checkbox" type="checkbox" />
            <div className="product-availability-window-container">
                <div className="product-availability-window-overlay" onClick={function(){setAvailabilityWindow(false);}}></div>
                <div className="product-availability-window">
                    <div className="product-availability-window-branch-list">
                        {
                            product && branchList && branchList.map((branch)=>

                            <div className="product-availability-window-branch-container" key={"av-window-branch-"+branch.id} onClick={function(event){selectBranchFromList(branch.id)}}>
                                <div className="product-availability-window-branch-info">
                                    <h2>{branch.name}</h2>
                                    <h3 className="product-availability-window-branch-address">{branch.address}</h3>
                                </div>
                                <h2 className="product-availability-window-branch-state branch-state" state={product.availability[branch.id]}>{product.availability[branch.id]}</h2>
                            </div>
                            
                            )
                        }
                        
                    </div>
                    <div className="product-availability-window-map-container">
                        {
                            currentBranch &&

                            <div className="product-availability-window-current-branch-info">
                                <div className="product-availability-window-current-branch-details">
                                    <h2>{currentBranch.name}</h2>
                                    <h3 className="product-availability-window-branch-address">{currentBranch.address}</h3>
                                </div>
                                <img className="product-availability-window-branch-image" src={require("../../img/branches/"+currentBranch.img)} alt="branch" />
                            </div>

                        }
                        <div className="product-availability-window-branches-map">
                            <img className="product-availability-window-branches-map-image" src={require("../../img/branches/city-map.png")} alt="map"/>
                            <div className="product-availability-window-branches-map-pointer-group" ref={pointerGroup}>
                                {
                                    product && branchList && branchList.map((pointer,index)=>(
                                        
                                        <label className="product-availability-window-branches-map-pointer" key={index} htmlFor={"branch-" + index} style={{top: pointerPosition(pointer.y,"y") + "px", left: pointerPosition(pointer.x,"x") + "px"}}>
                                            <input className="product-availability-window-branches-radio" type="radio" name="branches" id={"branch-" + index} onClick={function(){selectBranch(index)}} />
                                            <img className="product-availability-window-branches-map-pointer-image" src={require("../../img/pointer.png")} alt="pointer" />

                                                <div className="product-availability-window-branches-map-pointer-state branch-state" state={product.availability[pointer.id]}>{product.availability[pointer.id]}</div>
                                            
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <button className="product-availability-window-close-button" onClick={function(){setAvailabilityWindow(false);}} >×</button>
                </div>
            </div>
           
            <Footer />
        </div>
    )
}

export default ProductPage;