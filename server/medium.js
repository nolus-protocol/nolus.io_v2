import { Router } from "express";
import { XMLParser } from "fast-xml-parser";

const FEED_URL = "https://medium.com/feed/nolusprotocol";
const parser = new XMLParser();
const cacheInterval = 1 * 60 * 60 * 1000;
let cache = [];
let cacheTime = 0;

const router = Router();

router.get("/api/feed", getfeed);

async function getfeed(req, res) {
  try {
    const items = await getFeedItems();
    res.json(items);
  } catch (err) {
    res.status(502).json({ error: "Failed to fetch feed" });
  }
}

async function getFeedItems() {
  const now = Date.now();
  const isExpired = now - cacheTime >= cacheInterval;

  if (isExpired) {
    const res = await fetch(FEED_URL);
    const xml = await res.text();
    const obj = parser.parse(xml);
    const rawItems = obj.rss?.channel?.item ?? [];

    cacheTime = now;
    cache = rawItems
      .map((i) => {
        const html = i["content:encoded"] || "";
        const match = html.match(/<img[^>]+src=\"([^\">]+)\"/i);
        return {
          title: i.title || i.guid,
          link: i.link,
          pubDate: i.pubDate,
          author: i["dc:creator"],
          image: match?.[1] || null
        };
      })
      .slice(0, 3);
  }

  return cache;
}

export { router };
