import DonationModel from "../models/Donations.js";
import axios from 'axios'

export async function donation(req, res){
    const { email, amount, name, purpose } = req.body
    try {
        console.log(email, amount, name)
        const fullAmount = amount * 100

        const response = await axios.post(
          `${process.env.PAYSTACK_INITIALIZE_URL}`,
          {
            email,
            amount: fullAmount,
            callback_url: `${process.env.CALLBACK_URL}`
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_TEST_SK}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log(response.data);
        const { authorization_url, reference } = response.data.data;
        //res.redirect(response.data.data.authorization_url); // Redirect user to their dashboard
        console.log('refrence',reference)
        
        res.send({ authorizationUrl: authorization_url });

        const saveDonation = await DonationModel.create({ 
            email, amount, transactionRef: reference, purpose
        })
        console.log('DONATION SAVED', saveDonation)
    } catch (error) {
        console.log('UNABLE TO MAKE DONATION', error)
        res.status(500).json({ success: false, data: 'Unable to Make Donation'})
    }
}

export async function verifyDonation(req, res){

}