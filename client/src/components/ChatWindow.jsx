import React, { useState, useRef, useEffect } from 'react';
import "../style/chatWindow.css";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  var origin = "";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const fetchData = async () => {
    setIsLoading(true); 
    const params = new URLSearchParams({
      origin: origin,
      destination: '144 Deering Street, Portland, ME, USA',
      avoid_routes: 'tolls,ferries',
      country: 'us',
      language: 'en'
    });

    const url = `https://driving-directions1.p.rapidapi.com/get-directions?${params}`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd53f06eb7bmsh98ba144a086b55ap1432d8jsnbea0352931fd',
        'X-RapidAPI-Host': 'driving-directions1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      // The API will send 'null' if the address that a user entered is not a valid address.
      if(data.data===null){
        setMessages((messages)=>[...messages,{'sender': 'bot', 'text':"Please enter valid address in correct format."}])
      }else{
        // If data.data is not null, send the link to the user.
        setMessages((messages)=>[...messages,{'sender': 'bot', 'text':"Here is a link of directions:"},{'sender': 'bot', 'text':data.data.directions_link}]);
      }
    } catch (error) {
      setMessages((messages)=>[...messages,{'sender': 'bot', 'text':"Something went wrong..."}])
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  // Handle when user click on 'submit' button
  const handleSubmit = async (e) => {
    e.preventDefault();
    let location = e.target[0].value;
    if(location!==''){
      origin = location;
      setMessages(messages => [...messages, { 'sender': 'user', 'text': origin }]);
      fetchData();
    }
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="chat-window">
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message-container ${msg.sender}`}>
            <p className={`message-text ${msg.sender}`}>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />

        <form className="chat-window-form" onSubmit={(e) => handleSubmit(e)}>
            <textarea className="chat-textarea" type="text" rows="7" placeholder='Enter your current location to get directions  to our store. For example: 7 Congress Sq, Portland, ME, USA' required/>
            <input className="chat-submit" type="submit" value="Submit"/>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;
