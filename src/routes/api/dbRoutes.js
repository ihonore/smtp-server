import express from 'express';
import multer from 'multer';
import { DatabaseController } from '../../controllers/databaseController.js';

const route = express.Router()
const upload = multer();

const dbController = new DatabaseController;
route.post('/', upload.none(), dbController.establishDbConnection);
export default route;