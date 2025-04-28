import { RSS_SERVER } from "@/config";

export async function fetchFeed() {
  const res = await fetch(`${RSS_SERVER}/api/feed`);
  const body = await res.json();
  return body;
}

