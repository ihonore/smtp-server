import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';

import cors from "cors";
import swaggerUi from "swagger-ui-express";
import 'dotenv/config'

import swaggerDocument from "../swagger.json" assert {type: "json"}


const app = express()
const port = process.env.PORT || 3000
const mode = process.env.NODE_ENV || 'development'

try {
  app.use(cors());
  app.use(express.json())
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/", (req, res) => {
    res.json({ status:200,message: "🟢WELCOME TO THE RTILA MAIL-SMTP API🟢" });
  });

  app.use("/api/v1/", routes)

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("*", (req, res, next) => {
    res.status(404).json({
      error: "NOT FOUND",
    });
  });

  app.listen(port, () => {
    console.log(`The server is running on port ${port}🟢`)
  })
} catch (error) {
  console.log(error)
}
export default app