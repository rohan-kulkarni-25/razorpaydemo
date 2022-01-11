require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');

const app = express();


app.use(express.static("./public"));
app.use(express.json());


app.get('/',(req,res)=>{
  res.render('index.html')
})


app.post("/myOrder", async (req, res) => {
  const amount = req.body.amount;

  var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
  });

  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };

  const myOrder = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    amount,
    order: myOrder
  });
});

app.listen(process.env.PORT,()=>{
  console.log(`App Running on PORT ${process.env.PORT}`);
})