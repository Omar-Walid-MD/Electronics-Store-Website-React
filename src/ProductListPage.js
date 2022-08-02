import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './ProductListPage.css';

function ProductListPage()
{
    const [productList,setProductList] = useState([]);
    
    useEffect(()=>{
        fetch('http://localhost:8000/products')
        .then(res => {
          return res.json()
        })
        .then((data)=>{
          console.log(data);
          setProductList(data);
        })
    
    },[]);


    function removeProduct(productId)
    {
        setProductList(prevList => prevList.filter((product)=>product.id!==productId));

        const axios = require('axios');

        axios.delete('http://localhost:8000/products/'+productId)
        .then(resp => {
            console.log(resp.data)
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="product-list-page">
            <div className="product-list-page-container">
                <div className="product-list-page-header"><h1>Product List</h1></div>
                <div className="product-list-container">
                    {
                        productList.map((product)=>
                            <div className="product-container" key={"product-"+product.id}>
                                <div className="product-info">
                                    <h2 className="product-detail">Name: {product.name}</h2>
                                    <h2 className="product-detail">Category: {product.category}</h2>
                                    <h2 className="product-detail">Brand: {product.brand}</h2>
                                    <h2 className="product-detail">Price: {product.price}</h2>
                                </div>
                                <div className="product-options">

                                    <Link to={"/edit-product"} state={{ productToEdit: product }} className="product-option-button"><img className="edit-product-button-icon" src={require("./img/edit.png")} /></Link>
                                    <div className="product-option-button" onClick={function(){removeProduct(product.id)}}><img className="remove-product-button-icon" src={require("./img/x.png")} /></div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <Link to={"/add-product"} className="add-product-link-button">
                    <img className="add-product-link-icon" src={require("./img/add.png")} />
                </Link>
            </div>  
        </div>
    )
}

export default ProductListPage;