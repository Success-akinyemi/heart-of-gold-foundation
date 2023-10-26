import { Router } from "express"
import * as controllers from '../controllers/appControllers.js'
import Protect from "../middleware/auth.js"


const privateRouter = Router()
//POST ROUTES
privateRouter.route('/donation').post(controllers.donation)

export default privateRouter