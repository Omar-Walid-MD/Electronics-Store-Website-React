import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './ProductListPage.css';


function ProductListPageItem({product,productList,setProductList})
{
    const branches = [
        {
            id: 0,
            name: "Main Branch",
            desc: "This is our first and main branch with the largest building. It's located next to the city's university.",
            img: "branch-1.png",

        },
        {   
            id: 1,
            name: "East Branch",
            desc: "This branch is located on Street 49. As our second grand opening, this branch is as likely as the main branch to have the variety and quailty of products our customers desire.",
            img: "branch-2.png",

        },
        {   
            id: 2,
            name: "West Branch",
            desc: "You can find this branch at the intersection of the King Road and Green Lane.",
            img: "branch-3.png",

        },
        {   
            id: 3,
            name: "South Branch",
            desc: "This is the south branch, located at the northeast corner of the schools block. In this branch, you are likely to find our collection of smaller basic products.",
            img: "branch-4.png",

        },
    ];


    function toggleAvailability(branchId)
    {
        let newState = ""

        switch (product.availability[branchId]) {
            case "inStock":
                newState = "limited"
                break;
            case "limited":
                newState = "unavailable"
                break;
            case "unavailable":
                newState = "inStock"
                break;
        
            default:
                break;
        }

        const axios = require('axios');
        
        let updatedProduct = {
            ...product,
            availability: {
                ...product.availability,
                [branchId]: newState
            }
        }

        setProductList(productList.map((product)=> product.id===updatedProduct.id ? updatedProduct : product))
        
        axios.put('http://localhost:8000/products/'+product.id,
        updatedProduct
        )
        .then(resp =>{
            console.log("Done");
        }).catch(error => {
            console.log(error);
        });
        
    }

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
        <div className="product-container">
            <div className="product-info">
                <img className="product-info-image" src={product.img && require("../../img/products/"+product.img+".png")} />
                <div className="product-info-details">
                    <h2 className="product-detail">Name: {product.name}</h2>
                    <h2 className="product-detail">Category: {product.category}</h2>
                    <h2 className="product-detail">Brand: {product.brand}</h2>
                    <h2 className="product-detail">Price: {product.price}</h2>
                </div>
            </div>
            <div className="product-availability">
                <label htmlFor={"availability-options"+product.id}>Edit availability</label>
                <input className="product-availability-checkbox" id={"availability-options"+product.id} type="checkbox" />
                <div className="product-availability-dropdown">
                    {
                        branches.map((branch)=>
                            <button className="product-availability-option branch-state" key={"product-av-option-button-"+product.id+"-"+branch.id} state={product.availability[branch.id]} onClick={function(){toggleAvailability(branch.id)}}>{branch.name}: {product.availability[branch.id]}</button>
                        )
                    }
                </div>
            </div>
            <div className="product-options">

                <Link to={"/edit-product"} state={{ productToEdit: product }} className="product-option-button"><img className="edit-product-button-icon" src={require("../../img/edit.png")} alt="edit icon" /></Link>
                <div className="product-option-button" onClick={function(){removeProduct(product.id)}}><img className="remove-product-button-icon" src={require("../../img/x.png")} alt="remove icon" /></div>
            </div>
        </div>
    )
}



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

    

    return (
        <div className="product-list-page">
            <div className="product-list-page-container">
                <div className="product-list-page-header"><h1>Product List</h1></div>
                <div className="product-list-container">
                    {
                        productList.map((product)=>
                            <ProductListPageItem key={"product-"+product.id} product={product} productList={productList} setProductList={setProductList} />
                        )
                    }
                </div>
                <Link to={"/add-product"} className="add-product-link-button">
                    <img className="add-product-link-icon" src={require("../../img/add.png")} />
                </Link>
            </div>  
        </div>
    )
}

export default ProductListPage;