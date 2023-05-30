import express from "express";
import dotenv from 'dotenv';
import dbConnection from "./db/config.js";
import userRoutes from "./routes/usersRoutes.js";
import expressWinston from "express-winston";
import { transports, format } from "winston";

//configure the use of environment variables
dotenv.config();

const app = express ();
app.use(express.json());

const port = process.env.PORT;
const usersRoutePath = '/api/auth';

dbConnection();

app.use(usersRoutePath, userRoutes);

app.use(expressWinston.logger({
    transports: [
        new transports.Console()
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    )
}))

app.listen(port, (req,res) => {
    console.log(`🚀 Rest server listening on ${port}`)
})
