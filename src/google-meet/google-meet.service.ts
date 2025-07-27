import { Injectable } from '@nestjs/common';
import { UpdateGoogleMeetDto } from './dto/update-google-meet.dto';
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
import { executablePath } from 'puppeteer';
puppeteer.use(StealthPlugin());

@Injectable()
export class GoogleMeetBot {
  private browser: any;
  private page: any;

  findAll() {
    return `This action returns all googleMeet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} googleMeet`;
  }

  update(id: number, updateGoogleMeetDto: UpdateGoogleMeetDto) {
    return `This action updates a #${id} googleMeet`;
  }

  remove(id: number) {
    return `This action removes a #${id} googleMeet`;
  }
  async start(
    sessionId: string,
    options: {
      meetingId: string;
      onTranscript: (sessionId: string, transcript: any) => void;
      onSessionEnd: (sessionId: string, error: any) => void;
    },
  ) {
    // const puppeteer = new PuppeteerExtra();
    this.browser = await this.launchBrowser();

    this.page = await this.browser.newPage();

    await this.configurePage(this.page, {
      viewport: { width: 1280, height: 720 },
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });

    const meetingUrl = `https://meet.google.com/${options.meetingId}`;
    const context = this.page.browser().defaultBrowserContext();

    // 1️⃣ Navigate to a valid HTTPS origin
    await this.page.goto(meetingUrl, {
      waitUntil: 'domcontentloaded', // ensures page.url is valid
      timeout: 30000,
    });

    await this.page.setBypassCSP(true);

    // 2️⃣ Manually specify a valid origin to avoid opaque origin issues
    await context.overridePermissions('https://meet.google.com', [
      'microphone',
      'camera',
    ]);

    // 3️⃣ Log actual page URL to verify

    // OPTIONAL: log current URL for debugging
    console.log('Current URL after navigation:', this.page.url());

    // await this.joinMeeting(this.page, {
    //   maxWaitTime: 15000,
    //   recordingQuality: 'high',
    //   audioOnly: false,
    //   enableVideo: true,
    //   userAgent:
    //     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    //   viewport: { width: 1280, height: 720 },
    // });
  }

  simulateTranscripts(sessionId: string, options: any) {
    const sampleTranscripts = [
      {
        speaker: 'Alice Cooper',
        text: 'Good morning everyone, shall we begin?',
      },
      {
        speaker: 'Charlie Brown',
        text: "Yes, I'm ready. Let me share my screen.",
      },
      {
        speaker: 'Diana Prince',
        text: 'Perfect, I can see your presentation clearly.',
      },
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index >= sampleTranscripts.length) {
        clearInterval(interval);
        return;
      }

      const transcript = sampleTranscripts[index];
      const now = Date.now();

      if (options.onTranscript) {
        options.onTranscript(sessionId, {
          speaker: transcript.speaker,
          text: transcript.text,
          timeStart: now,
          timeEnd: now + 4000,
        });
      }

      index++;
    }, 12000);
  }

  async stop(sessionId: string, options: any) {
    try {
      console.log(`Stopping Google Meet bot for session: ${sessionId}`);

      if (this.page) {
        // Leave meeting
        await this.page.click('[data-test-id="end-call"]');
        await this.page.close();
      }

      if (this.browser) {
        await this.browser.close();
      }

      if (options.onSessionEnd) {
        options.onSessionEnd(sessionId, null);
      }
    } catch (error) {
      console.error('Error stopping Google Meet bot:', error);
    }
  }

  private async launchBrowser(): Promise<any> {
    const envConfig = {
      chrome: {
        headless: false,
        // executablePath:
        //   '/var/folders/gk/778mgrq56d39vjc3dfy662m40000gn/T/puppeteer_dev_profile-0qorbL',
        disableWebSecurity: true,
      },
    };
    const args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-features=TranslateUI',
      '--disable-ipc-flooding-protection',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--allow-running-insecure-content',
      '--autoplay-policy=no-user-gesture-required',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor',
    ];
    args.push('--disable-notifications', '--mute-audio', '--enable-automation');

    if (envConfig.chrome.disableWebSecurity) {
      args.push('--disable-web-security');
      args.push('--disable-features=VizDisplayCompositor');
    }

    const browser = await puppeteer.launch({
      headless: envConfig.chrome.headless,
      // executablePath: envConfig.chrome.executablePath,
      args,
      defaultViewport: null,
      ignoreDefaultArgs: ['--disable-extensions'],
    });

    return browser;
  }
  private async configurePage(page: any, config: any): Promise<void> {
    // Set viewport
    await page.setViewport(config.viewport);

    // Set user agent
    await page.setUserAgent(config.userAgent);

    // Grant permissions for microphone and camera

    // Set media devices
    await page.evaluateOnNewDocument(() => {
      // Mock media devices
      Object.defineProperty(navigator, 'mediaDevices', {
        writable: true,
        value: {
          getUserMedia: async () => {
            const canvas = document.createElement('canvas');
            canvas.width = 640;
            canvas.height = 480;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = '#000000';
              ctx.fillRect(0, 0, 640, 480);
            }

            // Create audio context for fake audio
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            const dst = audioContext.createMediaStreamDestination();
            oscillator.connect(dst);
            oscillator.start();

            // Get video stream from canvas
            const videoStream = (canvas as any).captureStream(30);

            // Combine audio and video
            const combinedStream = new MediaStream([
              ...videoStream.getVideoTracks(),
              ...dst.stream.getAudioTracks(),
            ]);

            return combinedStream;
          },
          enumerateDevices: async () => [
            {
              deviceId: 'fake-audio-input',
              kind: 'audioinput',
              label: 'Fake Audio Input',
              groupId: 'fake-group',
            },
            {
              deviceId: 'fake-video-input',
              kind: 'videoinput',
              label: 'Fake Video Input',
              groupId: 'fake-group',
            },
          ],
        },
      });
    });

    // Handle page errors
    page.on('error', (error) => {
      // logger.error("Page error", error);
      console.log('Page error', error);
    });

    page.on('pageerror', (error) => {
      // logger.error("Page error", error);
      console.log('Page error', error);
    });

    // Block unnecessary resources to improve performance
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      const url = request.url();

      // Block images, fonts, and other non-essential resources
      if (
        ['image', 'font', 'stylesheet'].includes(resourceType) &&
        !url.includes('meet.google.com')
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });
  }

  private async joinMeeting(
    page: any,
    config: {
      maxWaitTime: number;
      recordingQuality: string;
      audioOnly: boolean;
      enableVideo: boolean;
      joinMessage?: string;
      userAgent: string;
      viewport: {
        width: number;
        height: number;
      };
    },
  ): Promise<void> {
    console.log('joinMeeting');
    try {
      // Disable camera and microphone initially
      await page.evaluate(() => {
        // Try to find and click camera/mic toggle buttons
        const micButton = document.querySelector(
          '[data-is-muted="false"]',
        ) as HTMLElement;
        const cameraButton = document.querySelector(
          '[data-is-video-muted="false"]',
        ) as HTMLElement;

        if (micButton) micButton.click();
        if (cameraButton) cameraButton.click();
      });

      // Wait a bit for settings to apply
      await page.waitForTimeout(2000);

      // Click join/ask to join button
      const joinSelectors = [
        '[data-meeting-title] button',
        'button[data-promo-anchor-id="ask-to-join"]',
        'button:contains("Ask to join")',
        'button:contains("Join now")',
        '[jsname="Qx7uuf"]', // Google Meet join button
      ];

      let joinButtonFound = false;
      for (const selector of joinSelectors) {
        try {
          await page.waitForSelector(selector, { timeout: 5000 });
          await page.click(selector);
          joinButtonFound = true;

          break;
        } catch (error) {
          // Try next selector
          continue;
        }
      }

      if (!joinButtonFound) {
      }

      // Wait for either admission or successful join
      const maxWaitTime = config.maxWaitTime;
      const startTime = Date.now();

      while (Date.now() - startTime < maxWaitTime) {
        try {
          // Check if we're in the meeting (look for meeting controls)
          const inMeeting = await page.evaluate(() => {
            return !!(
              document.querySelector('[data-call-code]') ||
              document.querySelector('[data-meeting-title]') ||
              document.querySelector(
                '.google-material-icons:contains("mic")',
              ) ||
              document.querySelector('[aria-label*="microphone"]')
            );
          });

          if (inMeeting) {
            return;
          }

          // Check if we're still waiting for admission
          const waitingForAdmission = await page.evaluate(() => {
            return !!(
              document.querySelector(':contains("Waiting for")') ||
              document.querySelector(':contains("Ask to join")') ||
              document.textContent?.includes('waiting')
            );
          });

          if (waitingForAdmission) {
            await page.waitForTimeout(5000);
            continue;
          }

          await page.waitForTimeout(1000);
        } catch (error) {
          // Continue waiting
          await page.waitForTimeout(1000);
        }
      }

      // Timeout reached
    } catch (error) {}
  }

  async startBotV2() {
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      devtools: false,
      args: [
        '--window-size=1920,1080',
        '--window-position=1921,0',
        '--autoplay-policy=no-user-gesture-required',
      ],
      ignoreDefaultArgs: ['--mute-audio'],
      executablePath: executablePath(),
    });

    this.page = await this.browser.newPage();
    const navigationPromise = this.page.waitForNavigation();
    const context = this.browser.defaultBrowserContext();

    await context.overridePermissions('https://meet.google.com/', [
      'microphone',
      'camera',
      'notifications',
    ]);

    // going to Meet after signing in
    // await this.page.waitForTimeout(2500);
    await this.page.goto('https://meet.google.com/wzn-mori-zho' + '?hl=en', {
      waitUntil: 'networkidle0',
      timeout: 10000,
    });
    await this.page.setBypassCSP(true);

    await navigationPromise;

    await this.page.waitForSelector('input[aria-label="Your name"]', {
      visible: true,
      timeout: 50000,
      hidden: false,
    });

    // turn off cam using Ctrl+E
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyE');
    await this.page.keyboard.up('ControlLeft');
    await this.page.waitForTimeout(1000);

    //turn off mic using Ctrl+D
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.down('ControlLeft');
    await this.page.keyboard.press('KeyD');
    await this.page.keyboard.up('ControlLeft');
    await this.page.waitForTimeout(1000);

    //click on input field to enter name
    await this.page.click(`input[aria-label="Your name"]`);

    //enter name
    await this.page.type(`input[aria-label="Your name"]`, 'Bot');

    //click on ask to join button
    await this.page.click(
      `button[class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-k8QpJ VfPpkd-LgbsSe-OWXEXe-dgl2Hf nCP5yc AjY5Oe DuMIQc LQeN7 jEvJdc QJgqC"]`,
    );

    // const stream = await getStream(page, { audio: true, mimeType: "audio/mp3" });
    // console.log("recording");

    // stream.pipe(file);
    // setTimeout(async () => {
    //   await stream.destroy();
    //   file.close();
    //   console.log("finished");
    // }, 1000 * 30);

    // const recorder = new PuppeteerScreenRecorder.PuppeteerScreenRecorder(page);
    // await recorder.start('./report/video/simple.webm'); // supports extension - mp4, avi, webm and mov

    // const devices = await page.evaluate(() =>
    //   navigator.mediaDevices.getUserMedia(
    //     { audio: true }
    //   )
    // )

    // let x = await navigator.mediaDevices.getUserMedia({audio: true});

    // console.log(x, "Available devices");
    // navigator.mediaDevices.getUserMedia({
    //   video: false,
    //   audio: true
    // }).then(async function (stream) {
    //   let recorder = RecordRTC(stream, {
    //     type: 'audio'
    //   });
    //   recorder.startRecording();

    //   const sleep = m => new Promise(r => setTimeout(r, m));
    //   await sleep(3000);

    //   recorder.stopRecording(function () {
    //     let blob = recorder.getBlob();
    //     invokeSaveAsDialog(blob);
    //   });
    // });

    setTimeout(async () => {
      // await recorder.stop();
      // await stream.destroy();
      // file.close();
      console.log('finished');
      await this.browser.close();
    }, 15000);
  }
}
