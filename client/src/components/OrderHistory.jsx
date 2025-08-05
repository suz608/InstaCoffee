// Order history component
import useOrder from "../hooks/useOrder.js"
import "../style/orderHistory.css";

export default function OrderHistory() {
    const [order] = useOrder();

    if(order===null){
        return (<div className="loading">Loading...</div>);
    }

    return(
        <div className='order-history-container'>
        <h3 className="order-history-title">Your recent orders</h3>
        {order.map((order) => (
        <div key={order.id} className='order-content'>
            <p>Created at: {order.createdAt}</p>
            <p>Total: {(order.total).toFixed(1)}</p>
        </div>
        ))}
        </div>)
}