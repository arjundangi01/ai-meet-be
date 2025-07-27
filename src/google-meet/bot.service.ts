import { Injectable } from '@nestjs/common';
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
import { getStream, launch } from 'puppeteer-stream';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

@Injectable()
export class BotService {
  private browser: any;
  private page: any;

  private async launchBrowser(): Promise<any> {
    const browser = await launch(puppeteer, {
      headless: false,

      executablePath:
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',

      args: [],
      defaultViewport: null,
      ignoreDefaultArgs: ['--disable-extensions'],
    });

    return browser;
  }

  async startBot({ meetingId }: { meetingId: string }) {
    const dockerImage = 'my-puppeteer-bot';

    const dockerContainer = `puppeteer-container-${meetingId}-${Date.now()}`;
    const saveVolume = path.join(process.cwd(), 'recordings');
    await fs.promises.mkdir(saveVolume, { recursive: true });
    const command = `
      docker run --rm \
        --name ${dockerContainer} \
        -e MEETING_ID=${meetingId} \
        -v ${saveVolume}:/app \
        ${dockerImage}
    `;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Error running docker command:', err);
        return;
      }
      console.log('Docker command output:', stdout);
    });
    const stealthPlugin = StealthPlugin();
    stealthPlugin.enabledEvasions.delete('iframe.contentWindow');
    stealthPlugin.enabledEvasions.delete('media.codecs');
    puppeteer.use(stealthPlugin);
    this.browser = await this.launchBrowser();

    this.page = await this.browser.newPage();
    const navigationPromise = this.page.waitForNavigation();
    const context = this.browser.defaultBrowserContext();

    await context.overridePermissions('https://meet.google.com/', []);

    await this.page.goto('https://meet.google.com/' + meetingId + '?hl=en', {
      waitUntil: 'networkidle0',
      timeout: 10000,
    });

    await navigationPromise;

    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyE');
    await this.page.keyboard.up('ControlLeft');

    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyD');
    await this.page.keyboard.up('ControlLeft');

    await this.page.click(`input[aria-label="Your name"]`);

    await this.page.type(`input[aria-label="Your name"]`, 'Bot');

    await this.page.evaluate(() => {
      const spans = Array.from(document.querySelectorAll('span'));
      const continueBtn = spans.find((span) =>
        span.textContent?.includes('Continue without microphone and camera'),
      );

      if (continueBtn) {
        const button = continueBtn.closest('button');
        if (button) {
          (button as HTMLElement).click();
          console.log(
            'Clicked fallback: Continue without microphone and camera',
          );
        }
      }
    });

    await this.page.waitForSelector('button');

    await this.page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const askToJoin = buttons.find((btn) =>
        btn.innerText.includes('Ask to join'),
      );
      if (askToJoin) {
        askToJoin.click();
      }
    });

    // check if the bot is in the meeting
    await this.page.waitForSelector('[aria-label*="Leave call"]', {
      timeout: 60000,
    });

    const savePath = path.join(
      process.cwd(),
      `${meetingId}-${Date.now()}.webm`,
    );
    const file = fs.createWriteStream(savePath);

    const stream = await getStream(this.page, { audio: true, video: true });
    stream.pipe(file);

    setTimeout(async () => {
      console.log('finished');
      stream.destroy();
      file.close();
      await this.browser.close();
    }, 15000);
  }
}
