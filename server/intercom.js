import jwt from "jsonwebtoken";
import { Router } from "express";

const api_secret = "D8mDii0jIgKmOyBjwI5Mdw0M1oNMs1hYU0OJt_cF";

const router = Router();
router.post("", handler);

export async function handler(req, res) {
  try {
    const payload = {
      user_id: req.body.wallet,
    };
    console.log(payload)
    const token = jwt.sign(payload, api_secret, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(502).json({ error: "Failed to fetch", text: error.toString() });
  }
}

export { router };
