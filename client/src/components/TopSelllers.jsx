import React from "react";
import { useState, useEffect } from 'react';
import "../style/topSellers.css";

    const TopSellers = () => { 
        const [isLoadingSellers, setIsLoadingSellers] = useState(true);
        const [products, setProducts] = useState([]);
        useEffect(() => {
            fetchProducts();
          }, []);
        const fetchProducts = () => {
            fetch(`${process.env.REACT_APP_API_URL}/top4seller`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            }).then((response) => {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            }).then((data) =>{
                setProducts(data);
                setIsLoadingSellers(false);
            })
        }

        if(isLoadingSellers){
            return <div className="loading">Loading...</div>;
        }

        return(
            <div className="top-seller">
                <h2 className="top-seller-head">Our top sellers</h2>
                <div className='topseller-product-container'>
                    {products.map((product) => (
                    <div className='card' key={product.id}>
                        <figure className="fig">
                        <img src={product.image} alt={product.name}></img>
                        <figcaption>{product.sold} sold</figcaption>
                        </figure>
                        <h3 className="top-seller-h3">{product.name}</h3>
                        <label>${product.price}</label>
                    </div>
                    ))}
                </div>
            </div>
        )
    }

export default TopSellers;
