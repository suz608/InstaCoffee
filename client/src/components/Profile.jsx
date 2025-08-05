// Profile page
import { useAuthToken } from "../AuthTokenContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';
import useProfile from "../hooks/useProfile.js"
import useOrder from "../hooks/useOrder.js"
import "../style/profile.css";

export default function Profile() {
  const { accessToken } = useAuthToken();
  const { user, isLoading } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useProfile();
  const [order] = useOrder();

  if (isLoading || profile===null || order===null){
    return (<div className="loading">Loading...</div>);
  }

  // Handle when user submits a new name.
  // Because the input box is required, the user cannot submit an empty name. There is no need to double check.
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/change-name`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        new_name: e.target[0].value,
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update name');
      }
      return response.json();
    })
    .then((data) => {
      //console.log("Success:", data);
      setProfile(data);
      setIsEditing(false); 
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="profile">
      <ul>
        <li><a className="spec" href="/">Back to homepage</a></li>
      </ul>

      <div className='profile-container'>
        {isEditing ? (
          <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" defaultValue={profile.name} required/>
            <input type="submit" value="Submit"/>
          </form>
        ) : <h1 className="profile-name">{profile.name}</h1>}
        <img className="profile-img" src={user.picture} width="70" alt="profile avatar" />
        <p>📧 Email: {user.email}</p>
        <p>✅ Email verified: {user.email_verified?.toString()}</p>
        <button className="profile-button" onClick={handleEdit}>Edit Name</button>
      </div>

      <br></br>
      <br></br>

      <div className='order-history'>
        <h3 className="profile-order-history">Order History</h3>
        {order.map((order) => (
          <div key={order.id} className='order'>
            <p>Created at: {order.createdAt}</p>
            <p>Total: {(order.total).toFixed(1)}</p>
          </div>
          ))}
      </div>

    </div>
  );
}
