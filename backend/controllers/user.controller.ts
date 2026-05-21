import { Request, Response } from "express";
import User from "../models/user.model";
import { getAuth } from "@clerk/express";

export const getUserSavedPosts = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json("Not authenticated!");
  }
    const user = await User.findOne({ clerkUserId: userId});

    res.status(200).json(user?.savedPost)
};

export const savedPost = async (req: Request, res: Response) => {
        const {userId} = getAuth(req);
        const postId = req.body.postId;

    if (!userId ){
        return res.status(401).json("Not authenticated");
    }

     const user = await User.findOne({ clerkUserId: userId});

     if (!user) {
        return res.status(404).json("User not found");
     }

     const isSaved = user?.savedPost.some((p) => p.toString() === postId);

     if (!isSaved) {
        await User.findByIdAndUpdate(user._id, {
            $push:{savedPost: postId}
        });
     } else {
        await User.findByIdAndUpdate(user._id, {
            $pull:{savedPost: postId}
        });
     }

     console.log("is saved", isSaved, "with return", (isSaved ? "Post unsaved" : "Post saved"))

     res.status(200).json(isSaved ? "Post unsaved" : "Post saved")
};