import React from "react";
import useProducts from "../hooks/useProducts.js"
import { Link } from "react-router-dom";
import "../style/menu.css";

const Menu = () => { 
    const [products] = useProducts();

    if(products===null){
        return <div className="loading">Loading...</div>;
    }

    const cold = products.filter(p=>p.category==="Cold Beverages")
    const hot = products.filter(p=>p.category==="Hot Beverages")
    const snacks = products.filter(p=>p.category==="Snacks")
    const addons = products.filter(p=>p.category==="Add ons")

    return(
        <div id="Menu">
            <ul>
            <li><a className="spec" href="/">Back to homepage</a></li>
            </ul>
            <h2>Cold Beverages</h2>
            <div className='product-container'>
                {cold.map((product) => (
                <div className='menu-card' key={product.id}>
                    <figure className="fig">
                    <img src={product.image}  width ="220" alt={product.name}></img>
                    </figure>
                    <h3 className="menu-h3">{product.name}</h3>
                    <label className="menu-label">${product.price}</label>
                    <Link to={{pathname: `/details/${product.id}`,}}>
                            <button id={product.id} className="lower-child">View Details</button>
                    </Link>
                </div>
                ))}
            </div>

            <h2>Hot Beverages</h2>
            <div className='product-container'>
                {hot.map((product) => (
                <div className='menu-card' key={product.id}>
                    <figure className="fig">
                    <img src={product.image}  width ="220" alt={product.name}></img>
                    </figure>
                    <h3 className="menu-h3">{product.name}</h3>
                    <label className="menu-label">${product.price}</label>
                    <Link to={{pathname: `/details/${product.id}`,}}>
                            <button id={product.id} className="lower-child">View Details</button>
                    </Link>
                </div>
                ))}
            </div>

            <h2>Snacks</h2>
            <div className='product-container'>
                {snacks.map((product) => (
                <div className='menu-card' key={product.id}>
                    <figure className="fig">
                    <img src={product.image}  width ="220" alt={product.name}></img>
                    </figure>
                    <h3 className="menu-h3">{product.name}</h3>
                    <label className="menu-label">${product.price}</label>
                    <Link to={{
                            pathname: `/details/${product.id}`,
                            }}>
                            <button id={product.id} className="lower-child">View Details</button>
                    </Link>
                </div>
                ))}
            </div>

            <h2>Add ons</h2>
            <div className='product-container'>
                {addons.map((product) => (
                <div className='menu-card' key={product.id}>
                    <figure className="fig">
                    <img src={product.image}  width ="220" alt={product.name}></img>
                    </figure>
                    <h3 className="menu-h3">{product.name}</h3>
                    <label className="menu-label">${product.price}</label>
                    <Link to={{
                            pathname: `/details/${product.id}`,
                            }}>
                            <button id={product.id} className="lower-child">View Details</button>
                    </Link>
                </div>
                ))}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default Menu;
