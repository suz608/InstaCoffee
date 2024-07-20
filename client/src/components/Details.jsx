import "../style/details.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [isLoadingItem, setIsLoadingItem] = useState(true);

    useEffect(() => {
        async function getItem() {
            try {
                console.log(`${process.env.REACT_APP_API_URL}/item/${id}`);
                const res = await fetch(`${process.env.REACT_APP_API_URL}/item/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setItem(data);
                setIsLoadingItem(false);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        }
        getItem();
    }, [id]);

    if (isLoadingItem) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="detail">
            <h1 className="detail-title">{item.name}</h1>
            <div className="product-container">
                <div className="detail-card" key={item.id}>
                    <img className="detail-image" src={item.image} alt={item.name} />
                    <p className="detail-p">Name: {item.name}</p>
                    <p className="detail-p">Category: {item.category}</p>
                    <p className="detail-p">Description: {item.detail}</p>
                    <p className="detail-p">Price: ${(item.price).toFixed(1)}</p>
                </div>
            </div>
        </div>
    );
}
