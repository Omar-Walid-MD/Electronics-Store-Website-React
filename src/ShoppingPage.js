import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer"
import { useState, useEffect } from "react";
import "./ShoppingPage.css";

function ShoppingPage({currentUser, handleUser})
{
    var loggedIn = currentUser && currentUser.userId !== 0;

    const [priceFilter,setPriceFilter] = useState({min:0,max:1000});

    const [brandFilter,setBrandFilter] = useState([])

    const [categoryFilter,setCategoryFilter] = useState([]);


    const [filteredProductList,setFilteredProductList] = useState([]);

    function setPriceRange()
    {
        const minPrice = parseInt(document.querySelector("input[name=min-price-range]").value);
        const maxPrice = parseInt(document.querySelector("input[name=max-price-range]").value);

        setPriceFilter({
            min: minPrice,
            max: maxPrice
        });

        console.log(minPrice + " : " + maxPrice);
        console.log(typeof(minPrice))
    }

    function setCategories()
    {
        const selectedCheckboxes = document.querySelectorAll("input[name=shopping-category]:checked");
        setCategoryFilter([...selectedCheckboxes].map((checkbox)=>(checkbox.value)));
        console.log(categoryFilter);
    }

    function setBrands()
    {
        const selectedCheckboxes = document.querySelectorAll("input[name=shopping-brand]:checked");
        setBrandFilter([...selectedCheckboxes].map((checkbox)=>(checkbox.value)));
        console.log(brandFilter);
    }


    function filterList(inputList)
    {
        return inputList.filter((product)=>(
                (product.price >= priceFilter.min && product.price <= priceFilter.max)
            &&  (categoryFilter.length > 0 ? categoryFilter.includes(product.category) : true)
            &&  (brandFilter.length > 0 ? brandFilter.includes(product.brand) : true)
        ))
    }

    function OptionsScroll()
    {



        const OptionsContainer = document.querySelector(".shopping-options-container");

        const PageContainer = document.querySelector(".shopping-page-container");

        let bottom = PageContainer.getBoundingClientRect().bottom + window.pageYOffset;



        if(window.pageYOffset < bottom - 750)
        {
            const OptionsContainer = document.querySelector(".shopping-options-container");
    
            OptionsContainer.style.transform = "translateY(" + window.pageYOffset + "px)";

        }
        else
        {
            OptionsContainer.style.transform = "translateY(" + (bottom - 750) + "px)";
        }
        
    }


    
    useEffect(()=>{
        fetch('http://localhost:8000/products')
        .then(res => {
          return res.json()
        })
        .then((data)=>{
          console.log(data);
          setFilteredProductList(filterList(data));
        })

        window.addEventListener('scroll',OptionsScroll);

        return function()
        {
            window.removeEventListener('scroll',OptionsScroll);
            console.log("Unmounted");
        } 
    
    },[priceFilter,categoryFilter,brandFilter]);

    return (
        <div className="shopping-page" onClick={OptionsScroll}>
            <header>
                <NavBar currentUser={currentUser} handleUser={handleUser} />
            </header>
            {
                loggedIn && <SideBar />
            }

            <div className="shopping-page-container">


                <div className="shopping-options-container">

                <div className="shopping-option-section">
                        <h2>Price Range:</h2>
                        
                        <div className="shopping-option-input-group">

                            <div className="shopping-option-input-container">
                                Minimum:
                                <input className="shopping-option-input" type="number" name="min-price-range" value={priceFilter.min} step="10" onChange={setPriceRange}/>
                            </div>
                           

                            <div className="shopping-option-input-container">
                                Maximum:
                                <input className="shopping-option-input" type="number" name="max-price-range" value={priceFilter.max} step="10" onChange={setPriceRange}/>
                            </div>

                        </div>
                    </div>

                    <div className="shopping-option-section">
                        <h2>Categories:</h2>
                        <div className="shopping-option-input-group">
                            <div className="shopping-option-checkbox-container">
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
                            </div>
                        </div>
                    </div>

                   

                    <div className="shopping-option-section">
                        <h2>Brands:</h2>
                        <div className="shopping-option-input-group">
                            <div className="shopping-option-checkbox-container">
                                <input type="checkbox" value="buzz" name="shopping-brand" id="shopping-brand-buzz" onChange={setBrands} />
                                <label htmlFor="shopping-brand-buzz" >Buzz</label>
                            </div>

                            <div className="shopping-option-checkbox-container">
                                <input type="checkbox" value="maple" name="shopping-brand" id="shopping-brand-maple" onChange={setBrands} />
                                <label htmlFor="shopping-brand-maple" >Maple</label>
                            </div>
                            
                        </div>
                    </div>

                </div>


                    <div className="shopping-results-container">

                    {
                        filteredProductList.map((product)=>
                        
                        <div className="product-result-container" key={product.id}>
                            <div className="product-result-image">
                                <div className="product-result-brandx"></div>
                            </div>
                            <h3 className="product-result-name">{product.name}</h3>
                            <h1 className="product-result-price">{product.price}</h1>

                            <div className="product-result-option-button"><img className="product-result-cart-icon" src={require("./img/cart-icon.png")} /></div>

                        </div>
                        
                        )
                    }
                    
                    </div>

            </div>

            <Footer />
        </div>
    )
}

export default ShoppingPage;