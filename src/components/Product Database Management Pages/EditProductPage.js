import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './AddProductPage.css';

function EditProductPage()
{
    //Submitted types: "none","success","passwordFailed","emailFailed"

    const location = useLocation();
    const { productToEdit } = location.state;

    const navigate = useNavigate();


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


    const [product,setProduct] = useState({
        ...productToEdit,
        specs: productToEdit.specs || {},

    });

    const [requiredFields,setRequiredFields] = useState(document.querySelectorAll(".add-product-form-input"));

    function handleProduct(event)
    {
        let property = event.target.name;
        let value = event.target.value;

        if(property==="category")
        {
            if(value!=="")
            {
                let specsTable = {};
                for(let i = 0; i < specList[value].length; i++)
                {
                    specsTable[specList[value][i].code] = "";
                }
        
                setProduct({
                    ...product,
                    category: value,
                    specs: specsTable,
                    
                });
                console.log("Done");
            }
            else
            {
                setProduct({
                    ...product,
                    category: value,
                    specs:{},
                });
            }
        }
        else
        {
            setProduct({
                ...product,
                [property]: value
            });
        }
        
        console.log(product);
    }

    function handleSpecs(event)
    {
        let property = event.target.name;
        let value = event.target.value;

        setProduct({
            ...product,
            specs:
            {
                ...product.specs,
                [property]: value
            }
            
        });

        console.log(product);
    }

    function trimInput(event)
    {
        event.target.value = event.target.value.trim();
    }


    function InputEmpty(allInputs)
    {
        for(let i = 0; i < allInputs.length; i++)
        {
            if(allInputs[i].value==="") return true;
        }
        return false;
    }


 
      
    function EditProduct(e)
    {
        e.preventDefault();
        
        
        const axios = require('axios');
        
        axios.put('http://localhost:8000/products/'+productToEdit.id,
        product
        )
        .then(resp =>{
            console.log("Saved changes");
            navigate("/products");
        }).catch(error => {
            console.log(error);
        });

        
        return
        
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
        setRequiredFields(document.querySelectorAll(".add-product-form-input"));
    },[product.category]);
    
        
    return (
        <div className="add-product-page">
            <div className="add-product-page-container">
                <div className="add-product-form-container">
                    <h1 className="add-product-form-title">Edit product</h1>
                    <form className="add-product-form" onSubmit={EditProduct}>

                    <div className="add-product-form-input-group">

                   
                        <div className="add-product-form-section-group">
                            <h2 className="add-product-form-section-group-label">General:</h2>
                            <div className="add-product-form-section">
                                <h2 className="add-product-form-section-label">Name:</h2>
                                <input className="add-product-form-input" type="text" name="name" value={product.name} onChange={handleProduct} onBlur={trimInput}  />
                            </div>
                            <div className="add-product-form-section">
                                <h2 className="add-product-form-section-label">Category:</h2>
                                <select id="category-select" className="add-product-form-input" name="category" value={product.category} onChange={handleProduct} onBlur={trimInput} >
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
                                <h2 className="add-product-form-section-label">Brand:</h2>
                                <select id="brand-select" className="add-product-form-input" name="brand" value={product.brand} onChange={handleProduct} onBlur={trimInput} >
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
                                <h2 className="add-product-form-section-label">Price:</h2>
                                <input className="add-product-form-input" name="price" value={product.price} onChange={handleProduct} onBlur={trimInput} />
                            </div>

                            <div className="add-product-form-section">
                                <h2 className="add-product-form-section-label">Image:</h2>
                                <input className="add-product-form-input" type="text" name="img" value={product.img} onChange={handleProduct} onBlur={trimInput} />
                            </div>

                        </div>
                            {
                                specList[product.category] &&

                                <div className="add-product-form-section-group">
                                    <h2 className="add-product-form-section-group-label">Specs:</h2>
                                    <div className="add-product-form-section">
                                        {
                                            specList[product.category].map((spec)=>
                                            <div key={"spec-"+spec.code}>
                                                <h2 className="add-product-form-section-label">{spec.name}</h2>
                                                <input className="add-product-form-input" type="text" name={spec.code} value={product.specs[spec.code]} onChange={handleSpecs} onBlur={trimInput} />
                                            </div>
                                            
                                            )
                                        }
                                    </div>
                                </div>     
                            }
                                
                        
                        </div>
                        <input className="add-product-form-submit" type="submit" value="Save Changes" disabled={InputEmpty(requiredFields)}/>
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