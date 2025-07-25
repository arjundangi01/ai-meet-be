import * as path from 'path';
import * as dotenv from 'dotenv';
import { ENV } from '../enums/common';

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
};

const config: ConfigurationType = {
  CHATTER_BOX_API_KEY: process.env.CHATTER_BOX_API_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
};

export default config;
