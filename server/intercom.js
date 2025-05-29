import jwt from "jsonwebtoken";
import { Router } from "express";
import { INTERCOM_SECRET } from "./config.js";

const router = Router();
router.post("", handler);

export async function handler(req, res) {
  try {
    const payload = {
      user_id: req.body.wallet,
    };
    console.log(payload)
    const token = jwt.sign(payload, INTERCOM_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(502).json({ error: "Failed to fetch", text: error.toString() });
  }
}

export { router };
