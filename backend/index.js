import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";

const app = express();


app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json())
app.use(cors())
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);

app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "pAYMENT GATEWAY",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})
// app.post("/payment" , cors() , async(req , res)=>{
//     let {amount , id} = req.body;
//     try{
//         const payment = await stripe.paymentIntents.create({
//             amount,
//             currency: "USD",
//             description: "Payment Gateway",
//             payment_method: id,
//             confirm: true,
//         })
//         console.log("Payment" , payment);
//         res.json({
//             message : "Payment successful",
//             success : true
//         })
//     }
//     catch(err){
//         console.log(err)
//     }
// })

app.listen(4000, () => {
	console.log("Sever is listening on port 4000")
})