import React from "react";
import useProducts from "../hooks/useProducts.js";
import { Link } from "react-router-dom";
import "../style/menu.css";

const Menu = () => {
    // Destructure products, loading, and error from the custom hook
    const { products, loading, error } = useProducts();

    // Show a loading message while the products are being fetched
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    // Handle errors if any occurred during the fetch process
    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    // Check if products is an array
    if (!Array.isArray(products)) {
        return <div className="error">Invalid product data</div>;
    }

    // Filter products by categories
    const cold = products.filter(p => p.category === "Cold Beverages");
    const hot = products.filter(p => p.category === "Hot Beverages");
    const snacks = products.filter(p => p.category === "Snacks");
    const addons = products.filter(p => p.category === "Add Ons");


    return (
        <div id="Menu">
            <ul>
                <li><a className="spec" href="/">Back to homepage</a></li>
            </ul>

            <h2>Cold Beverages</h2>
            <div className="product-container">
                {cold.map((product) => (
                    <div className="menu-card" key={product.id}>
                        <figure className="fig">
                            <img
                                src={product.image}
                                style={{ width: '220px', height: '220px', objectFit: 'cover' }}
                                alt={product.name}
                            />
                        </figure>
                        <h3 className="menu-h3">{product.name}</h3>
                        <label className="menu-label">${product.price}</label>
                        <Link to={{ pathname: `/details/${product.id}` }}>
                            <button id={product.id} className="lower-child">View Details</button>
                        </Link>
                    </div>
                ))}
            </div>

            <h2>Hot Beverages</h2>
            <div className="product-container">
                {hot.map((product) => (
                    <div className="menu-card" key={product.id}>
                        <figure className="fig">
                            <img
                                src={product.image}
                                style={{ width: '220px', height: '220px', objectFit: 'cover' }}
                                alt={product.name}
                            />
                        </figure>
                        <h3 className="menu-h3">{product.name}</h3>
                        <label className="menu-label">${product.price}</label>
                        <Link to={{ pathname: `/details/${product.id}` }}>
                            <button id={product.id} className="lower-child">View Details</button>
                        </Link>
                    </div>
                ))}
            </div>

            <h2>Snacks</h2>
            <div className="product-container">
                {snacks.map((product) => (
                    <div className="menu-card" key={product.id}>
                        <figure className="fig">
                            <img
                                src={product.image}
                                style={{ width: '220px', height: '220px', objectFit: 'cover' }}
                                alt={product.name}
                            />
                        </figure>
                        <h3 className="menu-h3">{product.name}</h3>
                        <label className="menu-label">${product.price}</label>
                        <Link to={{ pathname: `/details/${product.id}` }}>
                            <button id={product.id} className="lower-child">View Details</button>
                        </Link>
                    </div>
                ))}
            </div>

            <h2>Add-ons</h2>
            <div className="product-container">
                {addons.map((product) => (
                    <div className="menu-card" key={product.id}>
                        <figure className="fig">
                            <img
                                src={product.image}
                                style={{ width: '220px', height: '220px', objectFit: 'cover' }}
                                alt={product.name}
                            />
                        </figure>
                        <h3 className="menu-h3">{product.name}</h3>
                        <label className="menu-label">${product.price}</label>
                        <Link to={{ pathname: `/details/${product.id}` }}>
                            <button id={product.id} className="lower-child">View Details</button>
                        </Link>
                    </div>
                ))}
            </div>

            <br /><br /><br /><br /><br />
        </div>
    );
};

export default Menu;
