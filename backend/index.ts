import express, { NextFunction, Request, Response } from "express"
import userRouter from "./routes/user.route"
import postRouter from "./routes/post.route"
import commentRouter from "./routes/comment.route"
import webhookRouter from "./routes/webhook.route" 
import connectDB from "./lib/connectDB";
const app = express();
app.use(express.json())

app.get("/test", (req, res) => {
    res.status(200).send("it works!")
})

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)
app.use("/webhook", webhookRouter)

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500)
    
    res.json({
        message: error.message || "Something went wrong!",
        status: error.status,
        stack: error.stack
    })
})
app.listen(3000, () => {
    connectDB()
console.log("server is running on port 3000!")
})