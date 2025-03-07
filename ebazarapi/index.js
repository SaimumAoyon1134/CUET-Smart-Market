const express =require("express");
const app = express();
const cors = require('cors');

 
const corsOptions = {
    origin: '*',             // Allows all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Allows all methods
    allowedHeaders: '*',      // Allows all headers
  };
  
  app.use(cors(corsOptions));
// app.use(cors({ origin: "*", credentials: true }));

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute =require("./routes/stripe");


 

dotenv.config()

mongoose.connect(
    process.env.MONGO_URL

).then(()=>console.log("DB CONNECTION SUCCESSFUL!")).catch((error)=>{console.log(err);});
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/orders",orderRoute);
app.use("/api/carts",cartRoute);
 app.use("/api/checkout",stripeRoute);
app.listen(process.env.PORT || 2000,() => {
    console.log("Backend Server is running!");
});

