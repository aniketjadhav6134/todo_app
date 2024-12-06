import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import path from "path"
import connection from "./connection/connection.js"
import './node-cron/nodeCron.js'
import forgotPasswordRouter from "./routes/forgotPasswordRoute.js"
import taskRouter from "./routes/taskRoute.js"
import userRouter from "./routes/userRoute.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 8001
mongoose.set('strictQuery', true);

const _dirname = path.resolve();

app.use(express.json())
app.use(cors())
connection();
app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)
app.use("/api/forgotPassword", forgotPasswordRouter)

app.use(express.static(path.join(_dirname,"/frontend/build")))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","build","index.html"))
})

app.listen(port, () => console.log(`Listening on localhost:${port}`))