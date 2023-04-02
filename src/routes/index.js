import express from 'express'
import welcomeRoutes from "./api/welcomeRoutes.js";
import mailRoutes from "./api/mailRoutes.js";


const routes = express.Router()

routes.use('/', welcomeRoutes);
routes.use('/sendEmail', mailRoutes);

export default routes