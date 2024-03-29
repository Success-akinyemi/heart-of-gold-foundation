import CampaignModel from "../models/Campaign.js";
import DonationModel from "../models/Donations.js";
import axios from 'axios'
import UserModel from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import Mailgen from 'mailgen'
import GalleryModel from "../models/Gallery.js";

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
      name: `${process.env.MAIL_SENDER_NAME}`,
      link: `${process.env.MAIL_WEBSITE_LINK}`
  }
})

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
            email, amount, transactionRef: reference, purpose, name
        })
        console.log('DONATION SAVED', saveDonation)
    } catch (error) {
        console.log('UNABLE TO MAKE DONATION', error)
        res.status(500).json({ success: false, data: 'Unable to Make Donation'})
    }
}

export async function verifyDonationFromPaystack(req, res){
  const { event, data } = req.body;

  if (event === 'charge.success') {
    const metadata = data;
    const email = data.customer.email
    const amount = data.amount;
    const refrence = data.reference || ''
    const statusMsg = data.status || ''
    const response = data.gateway_response || ''
    
    console.log('Amount>>',amount/100, '>>EMAIL>>',email)
    console.log('Meta data>>',metadata)

    if(statusMsg === 'success'){
      const transactionId = await DonationModel.findOne({ transactionRef: refrence})
  
      transactionId.valid = true
      await transactionId.save()
      console.log('DONATION SAVE AND COMPLETED')

      const responseData = {
        success: true,
        message: 'Donation recieved Successfully',
        user: transactionId 
      }
      const  url = `${process.env.THANK_YOU}?user=${encodeURIComponent(JSON.stringify(responseData.user))}` 
      console.log('REDIRECT TO THANK YOU PAGE', url)
      res.json({ redirectUrl: url});
    } else {
      console.log('DONATION STATUS NOT SUCCESS>>>', statusMsg)
    }
    

    console.log('Successful transaction:');
  } else if (event === 'charge.failed') {
    console.log('Transaction Failure');
  }

  res.end()
}

export async function verifyDonation(req, res){
  const { reference } = req.body
  console.log('REFERENCE', reference)

  try {

    const verifyUrl = `https://api.paystack.co/transaction/verify/${reference}`;
    console.log('urlll>>', verifyUrl);

    const options = {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_TEST_SK}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
    };

    const response = await axios.get(verifyUrl, options);

    const verificationData = response.data;
    const msg = response.message
    console.log("<MESSAGE>>>", msg)
    const { status } = verificationData.data;
    let user;

    if(status === 'success'){
      user = await DonationModel.findOne({ transactionRef: reference })

      if(!user){
        return res.status(400).json({ success: false, data: 'USER NOT FOUND'})
      }
    } else{
      return res.status(400).json({ success: false, data: 'TRANSACTION NOT SUCCESSFUL'})
    }

    //SEND EMAIL

                // send mail
                const emailContent = {
                  body: {
                      intro: 'Successfull Donation Recieved',
                      outro: `
                          Thank you ${user.name} for Donating to Us. we Appericiate you donation towards ${user.purpose}.

                          For more inquires visit our website and connect with us. ${process.env.RESET_URL}
  
                          Lets continue to touch Lives.
                      `
                  },
              };
  
              const emailTemplate = mailGenerator.generate(emailContent)
              const emailText = mailGenerator.generatePlaintext(emailContent)
              
              await sendEmail({
                  to: user.email,
                  subject: 'Successful Donation',
                  text: emailTemplate
              })

    console.log(verificationData);
    console.log('USER>>', user);
    res.status(200).json({ success: true, data: user});
  } catch (error) {
    console.log('ERROR VERIFYING DONATION', error);
    res.status(500).json({ success: false, data: 'Unable To get Donation' });
  }
}

export async function newCampaign(req, res){
  const { id, title, message, image} = req.body

  try {
    if(!title || !message || !image){
      return res.status(400).json({ success: false, data: 'Fill all Fields'})
    }

    const user = await UserModel.findById({ _id: id })

    if(!user.isAdmin || !user){
      return res.status(404).json({ success: false, data: 'NOT ALLOWED'})
    }

    const newCampaign = new CampaignModel({ title, message, image })
    const saveCampaign = await newCampaign.save()
    console.log('NEW CAMPAIGN SAVED')


    res.status(201).json({ success: true, data: 'New Campaign Created'})
  } catch (error) {
    console.log('ERROR CREATING NEW CAMPAING', error)
    res.status(500).json({ success: false, data: 'Unable to create new campaign'})
  }
}

export async function getAllCampaign(req, res){
  try {
    const campaigns = await CampaignModel.find()

    res.status(200).json({ success: true, data: campaigns})
  } catch (error) {
    console.log('ERROR GET CAMPAIGN BY ID', error)
    res.status(500).json({ success: false, data: 'Error getting specific Campaign' })    
  }
}

export async function getCampaignById(req, res){
  const id = req.params.id
  console.log('ID', id)
  try {
    const campaign = await CampaignModel.findById({ _id: id })
     if(!campaign){
      return res.status(400).json({ success: false, data: 'No Campaign Found with Id'})
     }

     res.status(200).json({ success: true, data: campaign})
  } catch (error) {
    console.log('ERROR GET CAMPAIGN BY ID', error)
    res.status(500).json({ success: false, data: 'Error getting specific Campaign' })
  }
}

export async function editCampaign(req, res){
  try {
    const { userId, id, title, message, image } = req.body

    const isAdmin = await UserModel.findById({ _id: userId })

    if(!isAdmin.isAdmin){
      return res.status(404).json({ success: false, data: 'NOT ALLOWED'})
    }

    const existingCampaign = await CampaignModel.findById({ _id: id })

    if(!existingCampaign){
      return res.status(400).json({ success: false, data: 'NO Campaign Found'})
    }

    if(title) existingCampaign.title = title
    if(message) existingCampaign.message = message
    if(image) existingCampaign.image = image

    await existingCampaign.save()
    console.log('CAMPAIGN UPDATED')

    res.status(200).json({ success: true, data: 'Campaign Uploaded Successful'})
  } catch (error) {
    console.log('ERROR EDITING CAMPAIGN', error)
    res.status(500).json({ success: false, data: 'Error editing Campaign' })
  }
}

export async function deleteCampaign(req, res){
  try {
    const {userId, id} = req.query
    console.log(userId, id)

    const isAdmin = await UserModel.findById({ _id: userId })
    const admin = isAdmin.isAdmin
    console.log(admin)
    if(!isAdmin.isAdmin){
      return res.status(404).json({ success: false, data: 'NOT ALLOWED'})
    }

    const deleteCampaign = await CampaignModel.findByIdAndDelete(id)

    if(!deleteCampaign){
      return res.status(400).json({ success: false, data: 'Campaign not Found'})
    }

    if(deleteCampaign){
      console.log('DELETD')
      return res.status(200).json({ success: true, data: 'Campaign Deleted'})
    } else{
      return res.status(400).json({success: false, data: 'Failed to delete Campaign'})
    }
  } catch (error) {
    console.log('ERROR DELETING CAMPAIGN', error)
    res.status(500).json({ success: false, data: 'Could not delete Campaign' })
  }
}

export async function newGallery(req, res){
  const { userId, ImageUrl, desc } = req.body
  try {

    const user = await UserModel.findById({ _id: userId})

    if(!user.isAdmin){
      return res.status(404).json({ success: false, data: 'NOT ALLOWED'})
    }

    const newGallery = new GalleryModel({ image: ImageUrl, desc })
    const saveGallery = await newGallery.save()
    console.log('NEW GALLERY SAVED')
    
    res.status(201).json({ success: true, data: 'Image save to Gallery'})
  } catch (error) {
    console.log('ERROR ADDING NEW GALLERY', error)
    res.status(500).json({ success: false, data: 'Failed to add to Gallery'})
  }
}

export async function getGallery(req, res){
  try {
    const gallery = await GalleryModel.find()

    if(!gallery){
      return res.status(400).json({ success: false, data: 'No Images Found'})
    }

    res.status(200).json({ success: true, data: gallery})
  } catch (error) {
    console.log('ERROR DELETING CAMPAIGN', error)
    res.status(500).json({ success: false, data: 'Could not delete Campaign' })
  }
}

export async function deleteImg(req, res){
  try {
    const {userId, id} = req.query
    console.log(userId, id)

    const isAdmin = await UserModel.findById({ _id: userId })
    const admin = isAdmin.isAdmin
    console.log(admin)
    if(!isAdmin.isAdmin){
      return res.status(404).json({ success: false, data: 'NOT ALLOWED'})
    }

    const deleteImg = await GalleryModel.findByIdAndDelete(id)

    if(!deleteImg){
      return res.status(400).json({ success: false, data: 'Campaign not Found'})
    }

    if(deleteImg){
      console.log('DELETD')
      return res.status(200).json({ success: true, data: 'Campaign Deleted'})
    } else{
      return res.status(400).json({success: false, data: 'Failed to delete Campaign'})
    }
  } catch (error) {
    console.log('ERROR DELETING CAMPAIGN', error)
    res.status(500).json({ success: false, data: 'Could not delete Campaign' })
  }
}