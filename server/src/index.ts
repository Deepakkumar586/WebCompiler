import express, { Request, Response } from 'express'
const app = express();
import cors from "cors"
import { config } from 'dotenv';
import { dbConnect } from './lib/dbConnect';
import { compilerRouter } from './routes/compilerRoutes';

app.use(express.json());
app.use(cors());
config();


// Routess
app.use("/compiler",compilerRouter);

app.get("/", (req: Request, res: Response) => {
    return res.status(200).send("Server is running");
})
dbConnect();
app.listen(2000, () => {
    // console.log(process.env.TEST)
    console.log("http://localhost:2000");
})