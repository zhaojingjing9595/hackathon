import express, { Express } from "express";
import cors from 'cors';
import 'dotenv/config';
import { userRouter } from "./routes/UserRouter";
import { trailRouter } from "./routes/TrailRoutes";

const PORT = process.env.PORT

const app: Express = express();

app.use(cors())

app.use(express.json())



// use routes and inject middleware
app.use('/user',userRouter)
app.use('/trail',trailRouter)


app.listen(PORT,() =>{
    console.log(`Now listening to connections on port ${PORT}`)
})












