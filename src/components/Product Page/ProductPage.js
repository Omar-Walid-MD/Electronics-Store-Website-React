import NavBar from "../General Components/NavBar";
import SideBar from "../General Components/SideBar";
import Footer from "../General Components/Footer"
import Popup from "../General Components/Popup"
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import "./ProductPage.css";

function ProductPage({productList, currentUser, handleUser})
{
    var loggedIn = currentUser && currentUser.userId !== 0;

    const productIdParam = useParams().id;
    const [product,setProduct] = useState(null);

    const [productForInfo,setProductForInfo] = useState(null);

    const [productReview,setProductReview] = useState({
        user: "",
        title: "",
        body: "",
        rating: 5
    });

    const [productReviewList,setProductReviewList] = useState([]);


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


    function SimilarProducts(inputList)
    {
        return inputList.filter((item)=>item.category === product.category && item.brand === product.brand && item.id !== product.id)
    }


    function AddToCart(product)
    {
        if(loggedIn)
        {
            let profileWithNewProduct = {
                ...currentUser,
                cart: [...currentUser.cart,product],
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
            handleUser(profileWithNewProduct);
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
        const reviewFill = event.target.querySelector(".product-page-review-rating-fill")
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

        let updatedReviewObject = null;

        fetch('http://localhost:8000/reviews/'+product.id)
        .then(res => {
        return res.json()
        })
        .then((data)=>{
            console.log(data);
            updatedReviewObject = {
                ...data,
                productReviews: [...data.productReviews,review]
            }
    
            const axios = require('axios');
    
            axios.put('http://localhost:8000/reviews/'+product.id,
                updatedReviewObject
            )
            .then(resp =>{
                console.log("Added your review");
                popUpMessage("Added your review!");
                setProductReviewList(updatedReviewObject.productReviews);
            }).catch(error => {
                console.log(error);
            });
        })

       

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


    useEffect(()=>{

        window.scrollTo(0,0);
        
        if(productList) 
        {
            setProduct(productList.filter((product)=>product.id==productIdParam)[0]);
            console.log(productList.filter((product)=>product.id==productIdParam)[0]);

            fetch('http://localhost:8000/reviews/'+productIdParam)
            .then(res => {
            return res.json()
            })
            .then((data)=>{
            //   console.log(data);
            setProductReviewList(data.productReviews);
            })

            fetch('http://localhost:8000/reviews/'+productIdParam)
            .then(res => {
            return res.json()
            })
            .then((data)=>{
            //   console.log(data);
            setProductReviewList(data.productReviews);
            })
        }
        

    },[productList,productIdParam]);

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
                <div className="product-page-container">
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
                        <div className="product-overview-availability-container">
                            {
                                InCart(product)
                                ? <button className="product-page-cart-button" state="remove" onClick={function(){RemoveFromCart(product);}}>
                                    Remove from Cart
                                    <img className="product-page-cart-button-icon" src={require("../../img/remove-from-cart-icon.png")} />
                                </button>
                                : <button className="product-page-cart-button" onClick={function(){AddToCart(product);}}>
                                    Add to cart
                                    <img className="product-page-cart-button-icon" src={require("../../img/add-to-cart-icon.png")} />
                                </button>
                            }
                            
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
                                        <div className="product-page-review-rating-fill" draggable="false" style={{width: productReview.rating * 20 + "%"}}></div>
                                    </div>
                                    <div className="product-page-review-rating-label">{productReview.rating}/5</div>
                                </div>
                                <input className="product-page-review-rating-submit" type="submit" value="Send Review"></input>
                            </form>
                        </div>
                        <div className="product-page-reviews-group">
                            {
                                productReviewList && productReviewList.map((review,index)=>

                                <div className="product-page-review-container" key={"product-review-"+index}>
                                    <h2 className="product-page-review-title">{review.title}</h2>
                                    <div className="product-page-review-rating-container">
                                        <div className="product-page-review-rating-background">
                                            <div className="product-page-review-rating-fill" style={{width: productReview.rating * 20 + "%"}}></div>
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
                                    <h3 className="product-page-similar-product-name">{similarProduct.name}</h3>
                                    <h1 className="product-page-similar-product-price">{similarProduct.price}</h1>
                                    </Link>
                                    {
                                        InCart(similarProduct)
                                        ? <div className="product-page-similar-product-option-button" state="remove" onClick={function(){RemoveFromCart(similarProduct);}}><img className="product-page-similar-product-cart-icon" src={require("../../img/remove-from-cart-icon.png")} alt="add to cart icon" /></div>
                                        : <div className="product-page-similar-product-option-button" onClick={function(){AddToCart(similarProduct);}}><img className="product-page-similar-product-cart-icon" src={require("../../img/add-to-cart-icon.png")} alt="remove from cart icon" /></div>
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
           

            <Footer />
        </div>
    )
}

export default ProductPage;