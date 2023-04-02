import express from 'express';
import multer from 'multer';

import { MailController } from '../../controllers/emailController.js';

const route = express.Router()
const upload = multer();

const mailController = new MailController;
route.post('/', upload.none(), mailController.sendEmail);
export default route;