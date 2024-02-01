const express = require('express');
const Parser = require('rss-parser');
const cors = require('cors');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const cron = require('node-cron');

const app = express();
const parser = new Parser();

const dataDir = path.join(__dirname, '../src/assets/blog');

app.use(cors());

const updateRss = async () => {
  await fs.mkdir(dataDir, { recursive: true });

  const feed = await parser.parseURL('https://medium.com/feed/nolusprotocol');
  const items = feed.items.reverse().slice(-3).reverse().map(async (item, index) => {
    const dom = new JSDOM(item['content:encoded']);
    const imageUrl = dom.window.document.querySelector('img')?.src;

    let image;
    if (imageUrl) {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const resizedImage = await sharp(response.data).resize(200, null).toBuffer();
      image = `image${index}.jpg`;
      await fs.writeFile(path.join(dataDir, image), resizedImage);
    }

    return {
      id: item.guid,
      title: item.title,
      image: image,
      href: item.link,
      date: new Date(item.pubDate).toLocaleDateString(),
      datetime: item.pubDate
    };
  });

  const data = await Promise.all(items);
  await fs.writeFile(path.join(dataDir, 'data.json'), JSON.stringify(data, null, 2));
};

// Run the updateRss function when the server starts
updateRss();

// Schedule the updateRss function to run once a week
// The cron syntax '0 0 * * 0' means 'at 00:00 on Sunday'
cron.schedule('0 0 * * 0', updateRss);

app.listen(3000, () => console.log('Server running on port 3000'));