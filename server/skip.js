import { Router } from "express";
import { format } from "node:url";

const URL = (path, query) => format({
  protocol: "https",
  hostname: "api.skip.build",
  pathname: `/v2${path}`,
  query: query ?? {}
})

;
const api_key = "a974b954-b27a-4bae-81db-9003a244b04b";

const router = Router();

router.get("/{*path}", handler);
router.post("/{*path}", handler);

export default async function handler(req, res) {
  try {
    const headers = new Headers({
      authorization: api_key
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

export { router };
