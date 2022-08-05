import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './AddProductPage.css';

function EditProductPage()
{
    //Submitted types: "none","success","passwordFailed","emailFailed"

    const location = useLocation();
    const { productToEdit } = location.state;

    

    const [NameValue,setNameValue] = useState(productToEdit.name);

    const [categoryValue,setCategoryValue] = useState(productToEdit.category);

    const [brandValue,setBrandValue] = useState(productToEdit.brand);

    const [priceValue,setPriceValue] = useState(productToEdit.price);

    const requiredValues = [NameValue, categoryValue, brandValue, priceValue];

    const navigate = useNavigate();

    function handleNameValue(event)
    {
        setNameValue(event.target.value);
    }
    function handleCategoryValue(event)
    {
        setCategoryValue(event.target.value);
        console.log(event.target.value);
    }
    function handleBrandValue(event)
    {
        setBrandValue(event.target.value);
    }

    function handlePriceValue(event)
    {
        setPriceValue(event.target.value);
    }


    function inputEmpty()
    {
        for(let i = 0; i < requiredValues.length; i++)
        {
            if(requiredValues[i]==="") return true;
        }
        return false; 
    }

    function AddProduct(e)
    {
        e.preventDefault();
           
            let newProduct = {
                id: productToEdit.id,
                name: NameValue,
                category: categoryValue,
                brand: brandValue,
                price: priceValue,
            };
            
            const axios = require('axios');

            axios.put('http://localhost:8000/products/'+productToEdit.id,
                newProduct
            )
            .then(resp =>{
                console.log("Saved changes");
            }).catch(error => {
                console.log(error);
            });
            
            return

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
        console.log("Product to edit");
        console.log(productToEdit);
      },[])


    return (
        <div className="add-product-page">
            <div className="add-product-page-container">
                <div className="add-product-form-container">
                    <h1 className="add-product-form-title">Edit product</h1>
                    <form className="add-product-form" onSubmit={AddProduct}>
                        <div className="add-product-form-section-group">
                            <div className="add-product-form-section">
                                <h2 className="add-product-form-section-label">Product Name:</h2>
                                <input className="add-product-form-input" type="text" value={NameValue} onChange={handleNameValue} />
                            </div>
                            <div className="add-product-form-section">
                                <h2 className="add-product-form-section-label">Product Category:</h2>
                                <select id="category-select" className="add-product-form-input" value={categoryValue} onChange={handleCategoryValue}>
                                    <option value="">Choose Category</option>
                                    <option value="desktop">Desktop</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="smartphone">Smartphone</option>
                                    <option value="tablet">Tablet</option>
                                    <option value="mouse">Mouse</option>
                                    <option value="keyboard">Keyboard</option>
                                    <option value="monitor">Monitor</option>
                                    <option value="speaker">Speaker</option>
                                    <option value="headphone">Headphone</option>
                                    <option value="earphone">Earphone</option>
                                    <option value="camera">Camera</option>
                                </select>
                            </div>

                            <div className="add-product-form-section">
                                <h2 className="add-product-form-section-label">Product Brand:</h2>
                                <select id="brand-select" className="add-product-form-input"  value={brandValue} onChange={handleBrandValue}>
                                    <option value="">Choose Brand</option>
                                    <option value="buzz">Buzz</option>
                                    <option value="maple">Maple</option>
                                    <option value="chromax">Chromax</option>
                                    <option value="hyper">Hyper</option>
                                    <option value="nuclai">NuclAI</option>
                                    <option value="mory">Mory</option>
                                    <option value="auro">Auro</option>
                                    <option value="opal">Opal</option>
                                    <option value="hot-key">Hot-Key</option>
                                    <option value="pixcel">Pixcel</option>
                                </select>
                            </div>
                            
                            <div className="add-product-form-section">
                                <h2 className="add-product-form-section-label">Product Price:</h2>
                                <input className="add-product-form-input" type="number" value={priceValue} onChange={handlePriceValue} />
                            </div>

                        </div>
                        
                        <input className="add-product-form-submit" type="submit" value="Save changes" disabled={inputEmpty()}/>
                        
                    </form>
                </div>
                <div className="home-button-container">
                    <Link to={"/products"} className="home-button">Back to List</Link>
                </div>
            </div>
        </div>
    )
}

export default EditProductPage;