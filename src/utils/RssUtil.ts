const FEED_URL = "http://localhost:5051/api/feed";

export async function fetchFeed() {
  // Otherwise fetch & parse
  const res = await fetch(FEED_URL);
  const body = await res.json();
  return body;
}

