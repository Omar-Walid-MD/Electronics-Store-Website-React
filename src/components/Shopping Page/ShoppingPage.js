import NavBar from "../General Components/NavBar";
import SideBar from "../General Components/SideBar";
import Footer from "../General Components/Footer"
import Popup from "../General Components/Popup"
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import MultiRangeSlider from "multi-range-slider-react";
import "./ShoppingPage.css";
import "../General Components/MultiRangeSlider.css";

function ShoppingPage({productList, currentUser, handleUser})
{
    var loggedIn = currentUser && currentUser.userId !== 0;

    const location = useLocation();
    const { category, brand } = location.state || {};

    const [priceFilter,setPriceFilter] = useState({min:0,max:1000});

    const [brandFilter,setBrandFilter] = useState([])

    const [categoryFilter,setCategoryFilter] = useState([]);

    const [specFilter, setSpecFilter] = useState({})

    const [sortSettings,setSortSettings] = useState({sortBy: "price", ascending: true});

    const [popUps,setPopups] = useState([]);

    const [productForInfo,setProductForInfo] = useState(null);

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

    const categoryList = {
        desktop: "Desktop",
        laptop: "Laptop",
        smartphone: "Smartphone",
        tablet: "Tablet",
        mouse: "Mouse",
        keyboard: "Keyboard",
        monitor: "Monitor",
        speaker: "Speaker",
        headphone: "Headphone",
        earphone: "Earphone",
        camera: "Camera"
    }

    const brandList = {
        buzz: "Buzz",
        maple: "Maple",
        chromax: "Chromax",
        hyper: "Hyper",
        nuclai: "NuclAI",
        mory: "Mory",
        opal: "Opal",
        auro: "Auro",
        hotkey: "HotKey",
        pixcel: "Pixcel"
    }


    function setPriceRange(event)
    {
        const minPrice = Math.round(parseInt(event.minValue)/50)*50;
        const maxPrice = Math.round(parseInt(event.maxValue)/50)*50;

        setPriceFilter({
            min: minPrice,
            max: maxPrice
        });

    }

    function setCategories()
    {
        const selectedCheckboxes = document.querySelectorAll("input[name=shopping-category]:checked");
        setCategoryFilter([...selectedCheckboxes].map((checkbox)=>(checkbox.value)));
    }

    function setBrands()
    {
        const selectedCheckboxes = document.querySelectorAll("input[name=shopping-brand]:checked");
        setBrandFilter([...selectedCheckboxes].map((checkbox)=>(checkbox.value)));
    }

    function setSortBy(event)
    {
        setSortSettings(
            {
                sortBy: event.target.value,
                ascending: true
            }
        )
    }

    function setSortOrder(event)
    {
        let ascendingValue = true;
        if(event.target.value!=="true")
        {
            ascendingValue = false;
        }

        setSortSettings(
            {
                ...sortSettings,
                ascending: ascendingValue
            }
        )
    }

    function setAvailableCategories(inputList)
    {
        return [...new Set(inputList.filter((product)=> product.brand === brand).map((product)=> product.category))];
    }

    function setAvailableBrands(inputList)
    {
        return [...new Set(inputList.filter((product)=> product.category === category).map((product)=> product.brand))];
    }


    function setSpecFilterOptions(allProducts)
    {
        

        let specOptions = {};
        allProducts.map((product)=>specList[product.category].map((spec)=>specOptions[spec.code] = {...spec,availableValues:[]}));
        //categoryFilter.map((category)=>specList[category].map((spec)=>specOptions[spec.code] = {...spec,availableValues:[]}));
        // console.log(specOptions);
        if(allProducts)
        {
            for (let i = 0; i < allProducts.length; i++)
            {
                const product = allProducts[i];
                
                for (let s = 0; s < Object.keys(product.specs).length; s++) {

                    //console.log(Object.keys(product.specs)[s] + " : " + Object.values(product.specs)[s]);
                    if(specOptions[Object.keys(product.specs)[s]] && !specOptions[Object.keys(product.specs)[s]].availableValues.includes(Object.values(product.specs)[s]))
                        specOptions[Object.keys(product.specs)[s]].availableValues.push(Object.values(product.specs)[s]);
                    
                }
                
            }
        }

        return specOptions;
       
    }

    const specOptionSection = useRef(null);

    function setSpecs()
    {
        
        const selectedCheckboxes = specOptionSection.current.querySelectorAll(".shopping-spec-filter-checkbox:checked");

        let tempSpecFilter = {};

        [...selectedCheckboxes].map((checkbox)=>
        tempSpecFilter[checkbox.name] ? tempSpecFilter[checkbox.name].push(checkbox.id) : tempSpecFilter[checkbox.name] = [checkbox.id]);

        setSpecFilter(tempSpecFilter);
        console.log(tempSpecFilter);
    }

    function setPageOnMount()
    {
        //Set Categories and Brands from links
        if(category !== undefined && category !== null) setCategoryFilter([category]);
        if(brand !== undefined && brand !== null) setBrandFilter([brand]);

        //Set Checkboxes to match filters
        const categoryChecboxes = document.querySelectorAll("input[name=shopping-category]");

        for(let i = 0; i < categoryChecboxes.length; i++)
        {
            if(category === (categoryChecboxes[i].value)) categoryChecboxes[i].checked = true;
        }

        const brandCheckboxes = document.querySelectorAll("input[name=shopping-brand]");
        for(let i = 0; i < brandCheckboxes.length; i++)
        {
            if(brand === (brandCheckboxes[i].value)) brandCheckboxes[i].checked = true;
        }
    }

    
    function sortList(inputList)
    {
        if(sortSettings.sortBy==="price")
        {
            inputList.sort(function(a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
            });
        }
        
        else if(sortSettings.sortBy==="alphabet")
        {
            inputList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        }
        
        if(!sortSettings.ascending)
        {
            inputList.reverse();
            console.log("Descending");
        }
        
        return inputList;
        
    }
    
    function filterList(inputList)
    {
        sortList(inputList);

        return inputList.filter((product)=>(
                (product.price >= priceFilter.min && product.price <= priceFilter.max)
            &&  (categoryFilter.length > 0 ? categoryFilter.includes(product.category) : true)
            &&  (brandFilter.length > 0 ? brandFilter.includes(product.brand) : true)
        ))
    }

    function specFilterList(inputList)
    {
        let output = inputList.filter((product)=>Object.keys(specFilter).every(
            (specKey)=>product.specs[specKey] && specFilter[specKey].includes(product.specs[specKey])));                
   
        return output;
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
            console.log(product.productReviews.length)
        }
        return rating;
    }

    const infoBox = useRef(null);

    function moveInfoBox(event,product)
    {
        const PageContainer = document.querySelector(".shopping-page-container");
        let maxbottom = PageContainer.getBoundingClientRect().bottom + window.pageYOffset;
        let maxRight = PageContainer.getBoundingClientRect().right + window.pageXOffset;

        let leftOffset = 0;
        let topOffset = 0;

        if(maxRight - event.clientX < infoBox.current.getBoundingClientRect().width + 100) leftOffset = infoBox.current.getBoundingClientRect().width;
        if(maxbottom - event.clientY < infoBox.current.getBoundingClientRect().height + 100) topOffset = infoBox.current.getBoundingClientRect().height;

        infoBox.current.style.top = event.clientY + 10 - topOffset + "px";
        infoBox.current.style.left = event.clientX + 10 - leftOffset + "px";

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
        console.log(popUps);
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

        window.addEventListener('mousemoved',moveInfoBox);

        setPageOnMount();

        console.log("re rendered");

        return function()
        {
            window.removeEventListener('mousemoved',moveInfoBox);
            console.log("Unmounted");
        } 
    
    },[]);





    return (
        <div className="shopping-page">
            <header>
                <NavBar currentUser={currentUser} handleUser={handleUser} productList={productList} />
            </header>
            {
                loggedIn && <SideBar currentUser={currentUser} handleUser={handleUser}/>
            }

            <div className="shopping-page-container">

                <div className="shopping-section-container">

                    <div className="shopping-options-container">

                        <div className="shopping-option-section">


                            <h2>Price Range:</h2>
                            <div className="price-range-container">

                                <MultiRangeSlider
                                    min={0}
                                    max={1000}
                                    step={50}
                                    ruler={false}
                                    label={true}
                                    preventWheel={false}
                                    minValue={priceFilter.min}
                                    maxValue={priceFilter.max}
                                    onInput={setPriceRange}
                                />
                            </div>
                            
                        </div>
                        {
                            !category && 
                            <div className="shopping-option-section">
                                <h2>Categories:</h2>
                                <div className="shopping-option-input-group">

                                    {
                                        productList && setAvailableCategories(productList).map((availableCategory,index)=>

                                        <div className="shopping-option-checkbox-container" key={"category-option-"+index}>
                                            <input type="checkbox" value={availableCategory} name="shopping-category" id={"shopping-category-"+availableCategory} onChange={setCategories} />
                                            <label htmlFor={"shopping-category-"+availableCategory} >{categoryList[availableCategory]}</label>
                                        </div>
                                        )
                                    }
                                    {/* <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="smartphone" name="shopping-category" id="shopping-category-smartphone" onChange={setCategories} />
                                        <label htmlFor="shopping-category-smartphone" >Smartphones</label>
                                    </div>
                                    
                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="tablet" name="shopping-category" id="shopping-category-tablet" onChange={setCategories} />
                                        <label htmlFor="shopping-category-tablet" >Tablets</label>
                                    </div>

                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="mouse" name="shopping-category" id="shopping-category-mouse" onChange={setCategories} />
                                        <label htmlFor="shopping-category-mouse" >Mice</label>
                                    </div>

                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="keyboard" name="shopping-category" id="shopping-category-keyboard" onChange={setCategories} />
                                        <label htmlFor="shopping-category-keyboard" >Keyboards</label>
                                    </div>

                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="headphone" name="shopping-category" id="shopping-category-headphone" onChange={setCategories} />
                                        <label htmlFor="shopping-category-headphone" >Headphones</label>
                                    </div>

                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="earphone" name="shopping-category" id="shopping-category-earphone" onChange={setCategories} />
                                        <label htmlFor="shopping-category-earphone" >Earphones</label>
                                    </div> */}
                                </div>
                            </div>
                        }
                        

                        {
                            !brand &&
                            <div className="shopping-option-section">
                                <h2>Brands:</h2>
                                <div className="shopping-option-input-group">
                                    {
                                        productList && setAvailableBrands(productList).map((availableBrand,index)=>
                                        <div className="shopping-option-checkbox-container" key={"brand-option-"+index}>
                                            <input type="checkbox" value={availableBrand} name="shopping-brand" id={"shopping-brand-"+availableBrand} onChange={setBrands} />
                                            <label htmlFor={"shopping-brand-"+availableBrand} >{brandList[availableBrand]}</label>
                                        </div>
                                    )
                                    }
                                    {/* <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="buzz" name="shopping-brand" id="shopping-brand-buzz" onChange={setBrands} />
                                        <label htmlFor="shopping-brand-buzz" >Buzz</label>
                                    </div>

                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="maple" name="shopping-brand" id="shopping-brand-maple" onChange={setBrands} />
                                        <label htmlFor="shopping-brand-maple" >Maple</label>
                                    </div>

                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="chromax" name="shopping-brand" id="shopping-brand-chromax" onChange={setBrands} />
                                        <label htmlFor="shopping-brand-chromax" >Chromax</label>
                                    </div>

                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="hyper" name="shopping-brand" id="shopping-brand-hyper" onChange={setBrands} />
                                        <label htmlFor="shopping-brand-hyper" >Hyper</label>
                                    </div>

                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="nuclai" name="shopping-brand" id="shopping-brand-nuclai" onChange={setBrands} />
                                        <label htmlFor="shopping-brand-nuclai" >NuclAI</label>
                                    </div>

                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="mory" name="shopping-brand" id="shopping-brand-mory" onChange={setBrands} />
                                        <label htmlFor="shopping-brand-mory" >Mory</label>
                                    </div>

                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="opal" name="shopping-brand" id="shopping-brand-opal" onChange={setBrands} />
                                        <label htmlFor="shopping-brand-opal" >Opal</label>
                                    </div>

                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="auro" name="shopping-brand" id="shopping-brand-auro" onChange={setBrands} />
                                        <label htmlFor="shopping-brand-auro" >Auro</label>
                                    </div>

                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="hotkey" name="shopping-brand" id="shopping-brand-hotkey" onChange={setBrands} />
                                        <label htmlFor="shopping-brand-hotkey" >Hot-key</label>
                                    </div>

                                    <div className="shopping-option-checkbox-container">
                                        <input type="checkbox" value="pixcel" name="shopping-brand" id="shopping-brand-pixcel" onChange={setBrands} />
                                        <label htmlFor="shopping-brand-pixcel" >Pixcel</label>
                                    </div> */}
                                    
                                </div>
                            </div>
                        }
                        {
                            productList && Object.keys((filterList(productList))).length !== 0 && 

                            <div className="shopping-option-section" ref={specOptionSection}>
                            <h2>Specifications:</h2>
                            {
                                productList && Object.values(setSpecFilterOptions(filterList(productList))).map((spec,index)=>
                                
                                <div className="shopping-spec-container" key={"spec-"+index}>
                                    <input className="shopping-spec-dropdown-checkbox" type="checkbox" id={"spec-"+index} />
                                    <label className="shopping-spec-label" htmlFor={"spec-"+index}>
                                        <h3 className="shopping-spec-name">{spec.name}</h3>
                                        <img className="shopping-spec-dropdown-arrow" src={require("../../img/white-arrow-down.png")} />
                                    </label>
                                    <div className="shopping-spec-dropdown-container">
                                        <div className="shopping-spec-dropdown">
                                        {
                                            spec.availableValues.map((specValue,index)=>
                                            <div className="shopping-spec-filter" key={"sp-"+spec.code+"-"+index}>
                                                <input className="shopping-spec-filter-checkbox" type="checkbox" name={spec.code} id={specValue} onChange={setSpecs}/>
                                                <p className="shopping-spec-filter-label">{specValue}</p>
                                            </div>
                                            )
                                        }
                                        </div>
                                    </div>
                                    <div className="border-line"></div>
                                </div>
                                
                                )
                            }
                            </div>
                        }
                        

                        

                    </div>

                    <div className="shopping-results-section">
                        <div className="shopping-results-sort-container">

                            <div className="shopping-results-sort-section">
                                <h2 className="shopping-results-sort-label">Sort by:</h2>
                                <select id="sort-type" className="shopping-results-sort-input" onChange={setSortBy}>
                                    <option value="price">Price</option>
                                    <option value="alphabet">Alphabetical Order</option>
                                </select>
                            </div>

                            <div className="shopping-results-sort-section">
                                <h2 className="shopping-results-sort-label">Order:</h2>
                                <select id="sort-type" className="shopping-results-sort-input" onChange={setSortOrder}>
                                    <option value={true}>Ascending</option>
                                    <option value={false}>Descending</option>
                                </select>
                            </div>

                        </div>

                        <div className="shopping-results-container">

                        {
                            productList && specFilterList(filterList(productList)).map((product)=>
                            
                            <div className="product-result-container"  key={product.id} onMouseOver={function(event){handleProductForInfo(event,product)}} onMouseMove={productForInfo && function(event){moveInfoBox(event,product)}} onMouseLeave={function(){handleProductForInfo(null)}}>
                                <Link className="product-link" to={"/product/"+product.id} state={{product: product}}>
                                <div className="product-result-image-container">
                                    <img className="product-result-image" src={product.img && require("../../img/products/"+product.img+".png")} />
                                    <div className="product-result-brand">
                                        <img className="product-result-brand-icon" src={require('../../img/brands/'+product.brand + "-logo-small.png")} alt="brand icon" />
                                    </div>
                                </div>
                                
                                <div className="product-result-info">
                                    <h3 className="product-result-name">{product.name}</h3>
                                    <div className="product-page-review-rating-background">
                                        <div className="product-page-review-rating-fill" style={{width: calculateRating(product) * 20 + "%"}}></div>
                                    </div>
                                </div>
                                <h1 className="product-result-price">{product.price}</h1>
                                </Link>
                                {
                                    InCart(product)
                                    ? <div className="product-result-option-button" state="remove" onClick={function(){RemoveFromCart(product);}}><img className="product-result-cart-icon" src={require("../../img/remove-from-cart-icon.png")} alt="add to cart icon" /></div>
                                    : <div className="product-result-option-button" onClick={function(){AddToCart(product);}}><img className="product-result-cart-icon" src={require("../../img/add-to-cart-icon.png")} alt="remove from cart icon" /></div>
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
            </div>
            
            <Footer />
        </div>
    )
}

export default ShoppingPage;