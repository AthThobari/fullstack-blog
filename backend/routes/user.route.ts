import express from "express"
import { getUserSavedPosts, savedPost } from "../controllers/user.controller"

const router = express.Router()

router.get("/saved", getUserSavedPosts)
router.patch("/save", savedPost)

export default router