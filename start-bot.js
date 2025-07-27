// puppeteer-docker/start-bot.js

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { getStream } = require('puppeteer-stream');
const fs = require('fs');
const path = require('path');

const meetingId = process.env.MEETING_ID || '';
const savePath = path.join('/app', `${meetingId || 'test'}.webm`);

(async () => {
  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--autoplay-policy=no-user-gesture-required',
    ],
  });

  const page = await browser.newPage();
  await page.goto(`https://meet.google.com/${meetingId}?hl=en`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  const file = fs.createWriteStream(savePath);
  const stream = await getStream(page, { audio: true, video: true });
  stream.pipe(file);

  console.log('Recording started');

  setTimeout(
    async () => {
      stream.destroy();
      file.close();
      await browser.close();
      console.log('Recording finished');
    },
    5 * 60 * 1000,
  ); // 5 minutes max recording
})();
