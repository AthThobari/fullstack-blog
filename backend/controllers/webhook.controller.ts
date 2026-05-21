import {  User, WebhookEvent } from "@clerk/backend";
import { Request, Response } from "express";
import { Webhook } from "svix";
import userModel from "../models/user.model";

export const clerkWebHook = async (req: Request, res: Response) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }

    const headers = req.headers;
    const payload = req.body;
    const svix_id = headers["svix-id"] as string;
    const svix_timestamp = headers["svix-timestamp"] as string;
    const svix_signature = headers["svix-signature"] as string;

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  try {
    evt = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(400).json({
      message: "Webhook verification failed",
    });
  }

  // console.log("Webhook verified!");
  //       console.log(evt.data)

    if (evt.type === "user.created") {
    try {
      const newUser = new userModel({
        clerkUserId: evt.data.id,
        username: evt.data.username || evt.data.email_addresses[0].email_address,
        email: evt.data.email_addresses[0].email_address,
        img: evt.data.image_url,
      });

      await newUser.save();
      console.log("User saved!");
    } catch (err) {
      console.error("Save error:", err);
    }
  }

  res.status(200).json({ success: true,
    message: "Webhook Received"
   });
};