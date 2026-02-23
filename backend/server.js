import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDB.js";
import authRouter from './routes/authRoute.js'
import taskRoute from "./routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 4000
app.use(express.json());
app.use(cors());
connectDB();


// Api Endpoints

app.use("/api/auth",authRouter)
app.use("/api/tasks", taskRoute)


app.get('/',(req, res)=>{
    res.send("server Working")
})

app.listen(port, () => {
  console.log("server Running port:", port);
});
