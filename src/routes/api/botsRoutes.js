import express from 'express';
import multer from 'multer';

import { BotsController } from '../../controllers/botsContoller.js';

const route = express.Router()
const upload = multer();

const botsController = new BotsController;
route.get('/', upload.none(), botsController.runBot);
export default route;