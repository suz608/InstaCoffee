# InstaCoffee - Coffee Shop Web Application
InstaCoffee is a React.js app that allows coffee shop customers to browse menu, get directions to the store, create and log into personal accounts, place orders online and modify their profiles.

---

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [APIs](#apis)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

---

## Features
- **Authentication**: Users can create accounts, log in, and manage profiles using secure authentication powered by Auth0.
- **Menu Browsing**: Users can view the coffee shop menu and place orders online.
- **Real-time Weather Updates**: Displays the local weather to help users plan their visits.
- **Map Services**: Help customers get directions to the store via a chatbot window.
- **Order Management**: Users can place orders and modify their profile information.
- **Profile Management**: Users can update their personal information and order history.

---

## Technologies
- **Frontend**: 
  - React.js
  - JavaScript
  - CSS
  - Redux
- **Backend**: 
  - Node.js
  - Express.js
  - JavaScript
- **Database**: 
  - Postgres SQL
  - Prisma
- **Authentication**: 
  - Auth0
- **External APIs**:
  - Real-time weather: [OpenWeather](https://openweathermap.org/)
  - Map: [Driving Directions](https://rapidapi.com/letscrape-6bRBa3QguO5/api/driving-directions1)
- **Testing**: 
  - React Testing Library

---

## Setup and Installation

To run this project locally, follow the steps below:

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (package managers)
- A [PostgreSQL database](https://www.postgresql.org/) (for local development or use a cloud database)

### 1. Clone the Repository

```
git clone https://github.com/suz608/instacoffee.git
cd instacoffee
```
### 2. Install Dependencies
- Frontend
```
cd client
npm install
```
- Backend
```
cd api
npm install
```
### 3. Configure Environment Variables
Create a .env file in both the api and client folders and add the following environment variables:

For the backend (api/.env):
```
DATABASE_URL=your_database_url_here
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
AUTH0_DOMAIN=your_auth0_domain
```
For the frontend (client/.env):
```
REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id
REACT_APP_AUTH0_DOMAIN=your_auth0_domain
```
You can get your AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, and AUTH0_DOMAIN from [Auth0](https://auth0.com/)
### 4. Run the Application Locally
Backend (API):
```
cd api
npm start
```
Frontend (Client):
```
cd client
npm start
```

---

## APIs
The backend serves the following API endpoints:
### Store APIs
- **GET /items/**
  Fetches all items of the coffee shop.   
- **GET /items/:id**
  Fetch a store item by id.   
- **GET /top4seller**
  Fetch the most sold 4 items.   
- **PUT /updatesold/:id**
  Update sold number by item id.      

### User APIs
- **GET /profile**
  Fetch the profile of current user.   
- **POST /create-order**
  Place an order under the acount of current user.   
- **GET /orders**
  Fetch all orders place by the current user.   
- **PUT /change/name**
  Update username.   
- **POST /verify-user**
  Verify if a user is in the database.   

### External APIs
- Real-time weather API provided by [OpenWeather](https://openweathermap.org/)
- Map API provided by [Driving Directions](https://rapidapi.com/letscrape-6bRBa3QguO5/api/driving-directions1)

## Testing
### Running Tests
To run the tests for the frontend, navigate to the client directory and run:
```
npm test
```

## Deployment
Frontend Deployment: The frontend is deployed using Vercel.

Backend Deployment: The backend APIs and a PostgreSQL database are deployed using Render.

[Deployed Address](https://instacoffee.vercel.app/) (Out of service because the free trial of the database expired.)

## License
This project is open-source and available under the MIT License.