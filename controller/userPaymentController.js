const userModel=require('../model/userModel')
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)

const buyPage=async(req,res)=>{
     try {
        res.render('buyPage',{
            key:process.env.STRIPE_PUBLISHABLE_KEY,
            Amount:25
        })
     } catch (error) {
        console.log(error.message);
     }
}

const userPayment=async(req,res)=>{
    try {

        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,
            name: 'Tushar rajput',
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'ca',
                country: 'us',
            }
        })
        .then((customer) => {
            return stripe.charges.create({
                amount: req.body.Amount,     // amount will be amount*100
                description: req.body.bookName,
                currency: 'USD',
                customer: customer.id
            });
        })
        .then((charge) => {
            res.redirect("/user-payment-success")
            console.log('suceess');
        })
        .catch((err) => {
            res.redirect("/user-payment-failure")
            console.log(err.message)
        });
    
    
        } catch (error) {
            console.log(error.message);
        }
}
module.exports={
    buyPage,
    userPayment,
}