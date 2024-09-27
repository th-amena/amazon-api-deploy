
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express(); // Initialize the Express app
app.use(cors({ origin: true })); // Enable CORS for all routes, allowing cross-origin requests

app.use(express.json()); // Use JSON parser middleware to handle JSON requests

app.get("/", (req, res) => {
   res.status(200).json({
      message: "Sucess !",
   });
});

//configure payment processing

app.post("/payment/create", async (req, res) => {
   const total = req.query.total;
   if (total > 0) {
      //   console.log("payment received", total);
      //   res.send(total);

      const paymentIntent = await stripe.paymentIntents.create({
         // Create a payment intent with Stripe
         amount: total, // Amount should be in the smallest unit of currency (e.g., cents for USD)
         currency: "usd",
      });
      console.log(paymentIntent);
      
      res.status(201).json({

        clientSecret: paymentIntent.client_secret,
        //with this the backend will provide client secret 
      })
   }else{

    res.status(403).json({
        message: "total must be greater than 0"
    })
   }
});

app.listen(5000, (err) =>{

    if(err) throw err

    console.log("Amazon Server Running on PORT:5000, http://localhost:5000")
    
})


