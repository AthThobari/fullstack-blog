import Comment from "../models/comment.model";
import { Request, Response } from "express";
import User from "../models/user.model";
import { getAuth } from "@clerk/express";

export const getPostComments = async (req: Request, res: Response) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "username img")
    .sort({ createdAt: -1 });

  res.json(comments);
};

export const addPostComments = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId: userId });

  if (!user) {
    return res.status(401).json("Not authenticated!");
  }


  const newComment = new Comment({
    ...req.body,
    user: user._id,
    post: postId,
  });

  const savedComment = await newComment.save();
  console.log(savedComment);

setTimeout(() => {
  res.status(201).json(savedComment);
},3000)
};

export const deletePostComments = async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
  const clerkUserId = userId;
  const id = req.params.id;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

    const role = req.auth.sessionClaims?.metadata?.role || "user"
  
    if (role === "admin") {
      await Comment.findByIdAndDelete(req.params.id)
    return res.status(200).json("Comment has been deleted");
    }

  const user = await User.findOne({ clerkUserId });

  const deletedComment = await Comment.findOneAndDelete({
    _id: id,
    user: user!._id,
  });

  if (!deletedComment) {
    return res.status(403).json("You can only delete your comment");
  }

  res.status(200).json("Comment deleted");
};
