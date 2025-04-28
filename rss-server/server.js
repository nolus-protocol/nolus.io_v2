import http from 'http';
import { XMLParser } from 'fast-xml-parser';

const PORT     = 5051;
const FEED_URL = 'https://medium.com/feed/nolusprotocol';
const parser   = new XMLParser();
const cacheInterval = 1 * 60 * 60 * 1000;
let cache = [];
let cacheTime = 0;

async function getFeedItems() {

  const isExpired = (cacheTime + cacheInterval - Date.now()) <= 0 ? true : false

  if(isExpired){
    const res = await fetch(FEED_URL);
    const xml = await res.text();
    const obj = parser.parse(xml);
    const rawItems = obj.rss.channel.item ?? [];
    cacheTime = Date.now()
    cache = rawItems.map(i => {
      const html  = i['content:encoded'] || '';
      const match = html.match(/<img[^>]+src="([^">]+)"/i);
      return {
        title:   i.title || i.guid,
        link:    i.link,
        pubDate: i.pubDate,
        author:  i['dc:creator'],
        image:   match?.[1] || null,
      };
    }).slice(0, 3);
  }

  return cache;


}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/api/feed') {
    try {
      const items = await getFeedItems();
      res.writeHead(200, {
        'Content-Type':                'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(JSON.stringify(items));
    } catch (err) {
      console.error(err);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to fetch feed' }));
    }

  } else if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
    });
    res.end();

  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Native Node.js RSS server running on http://localhost:${PORT}/api/feed`);
});
