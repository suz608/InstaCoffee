import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

// this is a middleware that will validate the access token sent by the client
const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const PORT = parseInt(process.env.PORT) ||  8080;

// A public endpoint
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Fetch all items of the store
app.get("/items", async (req, res) => {
  const items = await prisma.storeItem.findMany({});
  res.json(items);
});

// Fetch a store item by id
app.get("/item/:id", async (req, res) => {
  const ids = req.params.id;
  if(!ids){
    res.status(400).send("Id is missing");
  }else{
    const item = await prisma.storeItem.findUnique({
      where: {
        id : parseInt(ids),
      },
    });
    if(item){
      res.json(item);
    }else{
      res.status(400).send("Item not found");
    }
  }
});

// Fetch top sellers from the store
app.get("/top4seller", async (req, res) => {
  const items = await prisma.storeItem.findMany({
    take: 4,
    orderBy: {
      sold: 'desc',
    },
  });
  res.json(items);
});

// Get all orders of the current user
app.get("/orders",requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const user = await prisma.user.findUnique({
    where: {
      auth0Id: auth0Id,
    },
  })
  if(user){
    const orders = await prisma.order.findMany({
      where:{userId:user.id},
      orderBy: {createdAt: 'desc'},
    });
    res.json(orders);
  }else{
    res.status(400).send("User not found");
  }

});

// Get the profile of current user
app.get("/profile",requireAuth,async(req, res)=>{
  const auth0Id = req.auth.payload.sub;
  const user = await prisma.user.findUnique({
    where:{
      auth0Id: auth0Id,
    }})

    if(user){
      res.json(user);
    }else{
      res.status(400).send("User not found.");
    }
})

// Create new order(ItemsInOrders relationships)
app.post("/create-order",requireAuth,async(req, res)=>{
  const auth0Id = req.auth.payload.sub;
  const {com, cart, total} = req.body;
  const user = await prisma.user.findUnique({
    where:{
      auth0Id: auth0Id,
    }})

  if(!user){
    res.status(400).send("User not found.")
  }else if(cart.length<=0 || parseFloat(total)<=0){
    res.status(400).send("Invalid cart or total.")
  }else{
    const newOrder = await prisma.order.create({
      data:{
        total: parseFloat(total),
        comment: com,
        userId: user.id,
      }
    })
    const order = newOrder.id;
    // Every cart item has id, price, quantity
    // Get cart ready for 'createMany' method
    var info = []
    cart.forEach((e)=>{
      info.push({
        itemId: parseInt(e[0]),
        orderId: order,
        quantity: parseInt(e[2]),
        itemName: e[3],
      })})
    
    const createMany = await prisma.itemsInOrders.createMany({
      data: info,
      skipDuplicates: true,
    })
    res.status(200).send("Order created");
  }
});

// Updates the sold number of an item by id
// This end point is used after the /create-order end point
app.put("/updatesold/:id",requireAuth,async(req, res)=>{
  const idf = req.params.id;
  const { increase } = req.body;
  const item = await prisma.storeItem.update({
    where:{
      id:Number(idf),
    },
    data: {
      sold:{ increment: parseInt(increase) } 
    },
  });
  res.json(item);
});

// Updates the name of a user
app.put("/change-name",requireAuth,async(req, res)=>{
  const auth0Id = req.auth.payload.sub;
  const {new_name}= req.body;
  // Check if new_name is empty
  if (!new_name) {
    res.status(400).send("Name is required");
  // Check if user is found
  }else if(!auth0Id){
    res.status(400).send("User not logged in");
  }else{
    const user = await prisma.user.update({
      where:{
        auth0Id:auth0Id,
      },
      data: {
        name: new_name,
      },
    });
    res.json(user);
  }
});

// If user is not registered in the database, create it.
//if the user is already registered, return the user information
app.post("/verify-user", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
  const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (user) {
    res.json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        email,
        auth0Id,
        name,
      },
    });
    res.json(newUser);
  }
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:${PORT} 🎉 🚀");
});

