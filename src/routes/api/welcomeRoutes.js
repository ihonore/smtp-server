import express from 'express'
import { welcome } from '../../controllers/welcomeController.js'

const route = express.Router()

route.get('/', welcome)

export default route