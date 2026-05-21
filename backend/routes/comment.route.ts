import express from "express"
import { addPostComments, deletePostComments, getPostComments } from "../controllers/comment.controller";

const router = express.Router()

router.get("/:postId", getPostComments);
router.post("/:postId", addPostComments);
router.delete("/:id", deletePostComments);

export default router