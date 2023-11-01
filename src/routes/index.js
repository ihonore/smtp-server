import express from 'express'
import welcomeRoutes from "./api/welcomeRoutes.js";
import mailRoutes from "./api/mailRoutes.js";
import dbRoutes from "./api/dbRoutes.js";
import botsRoutes from "./api/botsRoutes.js"


const routes = express.Router()

routes.use('/', welcomeRoutes);
routes.use('/sendEmail', mailRoutes);
routes.use('/connect-db', dbRoutes);
routes.use('/run-bot', botsRoutes);

export default routes