import { Injectable } from '@nestjs/common';
import { executablePath } from 'puppeteer';
import { getStream, launch } from 'puppeteer-stream';
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BotService {
  constructor() {}
  async startBotV4() {
    const stealthPlugin = StealthPlugin();
    stealthPlugin.enabledEvasions.delete('iframe.contentWindow');
    stealthPlugin.enabledEvasions.delete('media.codecs');
    puppeteer.use(stealthPlugin);
    const outputPath = path.join(process.cwd(), 'test.webm');
    const file = fs.createWriteStream(outputPath);
    const browser = await launch(puppeteer, {
      executablePath: executablePath(),
      defaultViewport: {
        width: 1024,
        height: 868,
      },
    });
    const page = await browser.newPage();
    await page.goto('https://meet.google.com/ckc-btpg-zus', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });
    const context = page.browser().defaultBrowserContext();

    // const stream = await getStream(page, { audio: true, video: true });
    console.log('recording');
    await context.overridePermissions('https://meet.google.com', [
      'microphone',
      'camera',
    ]);
    // stream.pipe(file);
    // setTimeout(async () => {
    // //   stream.destroy();
    //   await page.close();
    //   await browser.close();
    //   file.close();
    //   console.log('finished');
    // }, 1000 * 10);
  }
}
