import { Router } from "express"
import * as controllers from '../controllers/appControllers.js'
import Protect from "../middleware/auth.js"


const privateRouter = Router()
//POST ROUTES
privateRouter.route('/donation').post(controllers.donation)
privateRouter.route('/verifyDonation').post(controllers.verifyDonation)
privateRouter.route('/newCampaign').post(Protect, controllers.newCampaign)

// GET ROUTES
privateRouter.route('/getCampaign/:id').get(controllers.getCampaignById)
privateRouter.route('/campaign').get(controllers.getAllCampaign)

// PUT
privateRouter.route('/editCampaign').put(Protect, controllers.editCampaign)

//DELETE
privateRouter.route('/deleteCampaign').delete(Protect, controllers.deleteCampaign)
export default privateRouter