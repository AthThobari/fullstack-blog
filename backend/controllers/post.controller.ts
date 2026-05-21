import { Request, Response } from "express";
import Post from "../models/post.model";
import User from "../models/user.model";
import { getAuth } from "@clerk/express";
import ImageKit from "@imagekit/nodejs";

export const getPosts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 2;

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user", "username")
    .limit(limit)
    .skip((page - 1) * limit);

  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;

  res.status(200).json({ posts, hasMore });
};

export const getPost = async (req: Request, res: Response) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate(
    "user",
    "username img",
  );
  res.status(200).json(post);
};

export const createPost = async (req: Request, res: Response) => {
  console.log(req.headers);
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId: userId });

  console.log(user);
  if (!user) {
    return res.status(404).json("User not found!");
  }

  let slug = req.body.title.replace(/ /g, "-").toLowerCase();

  let existingPost = await Post.findOne({ slug });

  let counter = 2;

  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug });
    counter++;
  }

  const newPost = new Post({ user: user._id, slug, ...req.body });
  const post = await newPost.save();
  res.status(200).json(post);
};

export const deletePost = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth.sessionClaims?.metadata?.role || "user";

  console.log(req.auth.sessionClaims?.metadata?.role)

  if (role === "admin") {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json("Post has been deleted");
  }

  const user = await User.findOne({ clerkUserId: userId });

  if (!user) {
    return res.status(404).json("User not found!");
  }

  const deletedPost = await Post.findByIdAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletedPost) {
    return res.status(403).json("You can delete only your posts!");
  }
  res.status(200).json("Post has been deleted");
};

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadAuth = async (req: Request, res: Response) => {
  const { token, expire, signature } =
    imageKit.helper.getAuthenticationParameters();
  res.send({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
};

export const featurePost = async (req: Request, res: Response) => {
  const { userId, sessionClaims } = getAuth(req);
  const postId = req.body.postId;

  if (!userId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = (sessionClaims?.metadata as {role?: string})?.role || "user";
   

  if (role !== "admin") {
    return res.status(200).json("You cannot feature posts!");
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json("Post not found!");
  }

  const isFeatured = post.isFeatured;

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      isFeatured: !isFeatured,
    },
    { returnDocument: "after" },
  );

  res.status(200).json(updatedPost);
};
