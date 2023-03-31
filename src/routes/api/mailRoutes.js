import express from 'express';
import { MailController } from '../../controllers/emailController.js';

const route = express.Router()

const mailController = new MailController;
route.post('/', mailController.sendEmail);
export default route;