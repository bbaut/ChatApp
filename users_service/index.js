import express from "express";
import dotenv from 'dotenv';
import dbConnection from "./db/config.js";
import userRoutes from "./routes/usersRoutes.js";

//configure the use of environment variables
dotenv.config();

const app = express ();
app.use(express.json());

const port = process.env.PORT;
const usersRoutePath = '/api/users';

dbConnection();

app.use(usersRoutePath, userRoutes);

app.listen(port, () => {
    console.log(`🚀 Rest server listening on ${port}`)
})
