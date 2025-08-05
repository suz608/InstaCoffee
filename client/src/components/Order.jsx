// Order page
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthToken } from "../AuthTokenContext";
import useProducts from "../hooks/useProducts.js"
import "../style/order.css";

export default function Order (){ 
    const [products] = useProducts();
    const { accessToken } = useAuthToken();
    const navigate = useNavigate();
    const { isAuthenticated, isLoading} = useAuth0();
    var cart = [];
    var orderComment = "";
    var sum = 0;

    if(products===null || isLoading){
        return <div className="loading">Loading...</div>;
    }

    const cold = products.filter(p=>p.category==="Cold Beverages")
    const hot = products.filter(p=>p.category==="Hot Beverages")
    const snacks = products.filter(p=>p.category==="Snacks")
    const addons = products.filter(p=>p.category==="Add ons")

    // Handle the user click on 'save' button
    const handle=(e)=>{
        e.preventDefault();
        sum = 0;
        //console.log(e.target[1].className); This is product name

        let quantity = e.target[0].value;
        let price = e.target[0].id;
        let item = e.target[0].className;
        let name = e.target[1].className;
        const changingItem = [item, price, quantity, name]

        // If the item to be changed exists in cart, pastItem will hold the item.
        const pastItem = cart.filter((i)=> i[0]===item);

        if(pastItem.length!==0){
            const nextCart = cart.filter((i)=> i[0]!==item);
            if(quantity==="0"){
                // case 1:  The item already exist in cart and updated quantity is 0.
                cart = nextCart;
            }else{
                // case 2:  The item already exist in cart and updated quantity is not 0.
                cart = [...nextCart,changingItem];
            }
        }else{
            // case 3:  The item does not exist in cart.
            cart = ([...cart,changingItem])
        }

        if(cart.length>0){
            cart.forEach((el)=> sum+=parseFloat(el[1])*parseFloat(el[2]))
        }
        const b = document.getElementById("total")
        b.value = sum.toFixed(1);
    }

    // Save comment
    const saveComment=(e)=>{
        e.preventDefault()
        const b = document.getElementById("comment");
        if(b.value){
            orderComment = b.value;
        }
    }

    // Update number of items sold in prisma
    const updateSold = ()=>{
        cart.forEach((e)=>
        fetch(`${process.env.REACT_APP_API_URL}/updatesold/`+e[0],{
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body:JSON.stringify({
                "increase": e[2],
            })
        }).then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => {
            console.error("Error:", error);
        }));
    }

    // Handle when user click on "check out"
    const submitOrder=()=>{
        if(!isAuthenticated){
            // If the user try to check out without logging in, redirect the user to require login page.
            navigate("/requirelogin");
        }else if(sum===0){
            // If the shopping cart is empty and the user try to check out, let the user know the cart is empty.
            window.confirm("Can't check out. Your shopping cart is empty.");
        }else{
            fetch(`${process.env.REACT_APP_API_URL}/create-order`,{
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                },
                body:JSON.stringify({
                    "com": orderComment,
                    "cart": cart, 
                    "total": sum
                })
            }).then((response) => console.log(response))
            .then((data) => console.log(data))
            .catch((error) => {
                console.error("Error:", error);
            });
            updateSold();
            navigate("/ordersubmitted");
            //window.open("/ordersubmitted");
        }
    }

    return(
        <div className="order-page">
            <ul>
                <li><a className="spec" href="/">Back to homepage</a></li>
            </ul>

            <br></br>
            <br></br>
            <br></br>

            <div className="cart">
                <img className="cart-icon" src = "./cart.png" alt="shopping cart label" width="50px"></img>
                <label>Your total is:</label><input className="total" id="total" type="button" value="0"></input>
                <button id="check-out-button" type="submit" onClick={submitOrder}>Check out</button>
            </div>


            <h2>Cold Beverages</h2>
            <div className='product-container'>
                {cold.map((product) => (
                <div className='order-card' key={product.id}>
                    <figure className="fig">
                        <img src={product.image}  width ="220" alt={product.name}></img>
                    </figure>
                    <h3>{product.name}</h3>
                    <label>${product.price}</label>
                        <form value={product.name} onSubmit={(e)=>handle(e)}>
                            <input type="number" className={product.id} id={product.price} min="0" defaultValue="0"/>
                            <input className={product.name} type="submit" id="order-right-child" value="Save"/>
                        </form>
                        <Link to={{
                            pathname: `/details/${product.id}`,
                            }}>
                            <button id={product.id} className="order-lower-child">View Details</button>
                        </Link>
                </div>
                ))}
            </div>

            <h2>Hot Beverages</h2>
            <div className='product-container'>
                {hot.map((product) => (
                <div className='order-card' key={product.id}>
                    <figure className="fig">
                        <img src={product.image}  width ="220" alt={product.name}></img>
                    </figure>
                    <h3 id={product.name}>{product.name}</h3>
                    <label>${product.price}</label>
                    <form value={product.name} onSubmit={(e)=>handle(e)}>
                            <input  type="number" className={product.id} id={product.price} min="0" defaultValue="0"/>
                            <input className={product.name} type="submit" id="order-right-child" value="Save"/>
                        </form>
                        <Link to={{
                            pathname: `/details/${product.id}`,
                            }}>
                            <button id={product.id} className="order-lower-child">View Details</button>
                        </Link>
                </div>
                ))}
            </div>

            <h2>Snacks</h2>
            <div className='product-container'>
                {snacks.map((product) => (
                <div className='order-card' key={product.id}>
                    <figure className="fig">
                        <img src={product.image}  width ="220" alt={product.name}></img>
                    </figure>
                    <h3 id={product.name}>{product.name}</h3>
                    <label>${product.price}</label>
                    <form value={product.name} onSubmit={(e)=>handle(e)}>
                            <input type="number" className={product.id} id={product.price} min="0" defaultValue="0"/>
                            <input className={product.name} type="submit" id="order-right-child" value="Save"/>
                        </form>
                        <Link to={{
                            pathname: `/details/${product.id}`,
                            }}>
                            <button id={product.id} className="order-lower-child">View Details</button>
                        </Link>
                </div>
                ))}
            </div>

            <h2>Add ons</h2>
            <div className='product-container'>
                {addons.map((product) => (
                <div className='order-card' key={product.id}>
                    <figure className="fig">
                        <img src={product.image}  width ="220" alt={product.name}></img>
                    </figure>
                    <h3 id={product.name}>{product.name}</h3>
                    <label>${product.price}</label>
                    <form value={product.name} onSubmit={(e)=>handle(e)}>
                            <input type="number" className={product.id} id={product.price} min="0" defaultValue="0"/>
                            <input className={product.name} type="submit" id="order-right-child" value="Save"/>
                        </form>
                        <Link to={{
                            pathname: `/details/${product.id}`,
                            }}>
                            <button id={product.id} className="order-lower-child">View Details</button>
                        </Link>
                </div>
                ))}
            </div>

            <div className="center">
                <textarea rows="5" placeholder="If you have any add ons in your order, please leave the details in this comment box."></textarea>
                <button className='comment-save-button' onClick={saveComment}>Save comment</button>
            </div>

        </div>
    )
}
