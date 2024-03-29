import { Router } from "express"
import * as controllers from '../controllers/appControllers.js'
import Protect from "../middleware/auth.js"


const privateRouter = Router()
//POST ROUTES
privateRouter.route('/donation').post(controllers.donation)
privateRouter.route('/verifyDonationFromPaystack').post(controllers.verifyDonationFromPaystack)
privateRouter.route('/newCampaign').post(Protect, controllers.newCampaign)
privateRouter.route('/verifyDonation').post(controllers.verifyDonation)
privateRouter.route('/newGallery').post(controllers.newGallery)

// GET ROUTES
privateRouter.route('/getCampaign/:id').get(controllers.getCampaignById)
privateRouter.route('/campaign').get(controllers.getAllCampaign)
privateRouter.route('/getGallery').get(controllers.getGallery)

// PUT
privateRouter.route('/editCampaign').put(Protect, controllers.editCampaign)

//DELETE
privateRouter.route('/deleteCampaign').delete(Protect, controllers.deleteCampaign)
privateRouter.route('/deleteImg').delete(Protect, controllers.deleteImg)

export default privateRouter