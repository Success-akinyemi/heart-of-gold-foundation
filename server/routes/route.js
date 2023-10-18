import { Router } from "express"
import * as controllers from '../controllers/appControllers.js'
import Protect from "../middleware/auth.js"


const privateRouter = Router()

//POST ROUTES

export default privateRouter