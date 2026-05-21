import express, { NextFunction, request, Request, Response } from "express"
import userRouter from "./routes/user.route"
import postRouter from "./routes/post.route"
import commentRouter from "./routes/comment.route"
import webhookRouter from "./routes/webhook.route"
import connectDB from "./lib/connectDB";
import { clerkMiddleware, requireAuth } from "@clerk/express"
import cors from "cors"

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({origin: process.env.CLIENT_URL}));
app.use(clerkMiddleware());
app.use("/webhooks", webhookRouter);

app.use(express.json());



// app.get("/auth-state", (req: Request, res: Response) => {
//     const authState = req.auth;

//     res.json(authState);
// });

// app.get("/protect", (req: Request, res: Response) => {
//     const {userId} = req.auth;
//     if(!userId) {
//         return res.status(401).json("not authenticated")
//     }
//     res.status(200).json("content")
// });

app.get("/protect", requireAuth(), (req: Request, res: Response) => {

    res.status(200).json("content")
});

app.get("/test", (req, res) => {
    res.status(200).send("it works!")
})

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)

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