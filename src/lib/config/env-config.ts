import * as path from 'path';
import * as dotenv from 'dotenv';
import { ENV } from '../enums/common';
import * as fs from 'fs';

const keyFilename = path.join(process.cwd(), 'meeting-byte-b3c982f6501b.json');

if (process.env.NODE_ENV === ENV.TEST) {
  dotenv.config({ path: path.resolve('.', '.env.spec') });
} else {
  dotenv.config();
}

type ConfigurationType = {
  CHATTER_BOX_API_KEY: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  GOOGLE_VERIFY_OAUTH_URL: string;
  JWT_SECRET: string;
  GCP_BUCKET_NAME: string;
  GCP_PROJECT_ID: string;
  NODE_ENV: string;
  DOCKER_IMAGE_NAME: string;
  DOCKER_USERNAME: string;
  DOCKER_PASSWORD: string;
  GCP_KEY_JSON: any;
};

const config: ConfigurationType = {
  CHATTER_BOX_API_KEY: process.env.CHATTER_BOX_API_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  GOOGLE_VERIFY_OAUTH_URL: process.env.GOOGLE_VERIFY_OAUTH_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  GCP_BUCKET_NAME: process.env.GCP_BUCKET_NAME,
  GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
  NODE_ENV: process.env.NODE_ENV,
  DOCKER_IMAGE_NAME: process.env.DOCKER_IMAGE_NAME,
  DOCKER_USERNAME: process.env.DOCKER_USERNAME,
  DOCKER_PASSWORD: process.env.DOCKER_PASSWORD,
  GCP_KEY_JSON: JSON.parse(fs.readFileSync(keyFilename, 'utf8')),
};

export default config;
