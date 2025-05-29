import { Router } from "express";
import { format } from "node:url";
import { SKIP_SECRET } from "./config.js";

const URL = (path, query) => format({
  protocol: "https",
  hostname: "api.skip.build",
  pathname: `/v2${path}`,
  query: query ?? {}
})

const router = Router();

router.post("/register", register);
router.get("/{*path}", handler);
router.post("/{*path}", handler);


export async function handler(req, res) {
  try {
    const headers = new Headers({
      authorization: SKIP_SECRET
    });

    const url = URL(req.path, req.query);

    const data = await fetch(url, {
      body: req.body ? JSON.stringify(req.body) : undefined,
      method: req.method,
      headers
    });
    const items = await data.json();
    res.status(data.status).json(items);
  } catch (error) {
    res.status(502).json({ error: "Failed to fetch", text: error.toString() });
  }
}

export async function register(req, res) {
  try {
    const headers = new Headers({
      authorization: api_key
    });

    const url = URL("/tx/track", req.query);
    const data = await fetch(url, {
      body: req.body ? JSON.stringify(req.body) : undefined,
      method: req.method,
      headers
    });
    const items = await data.json();
    res.status(data.status).json(items);
  } catch (error) {
    res.status(502).json({ error: "Failed to fetch", text: error.toString() });
  }
}

export { router };
