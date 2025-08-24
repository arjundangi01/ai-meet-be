import * as path from 'path';
import * as dotenv from 'dotenv';
import { ENV } from '../enums/common';

if (process.env.NODE_ENV === ENV.TEST) {
  dotenv.config({ path: path.resolve('.', '.env.spec') });
} else {
  dotenv.config();
}

type ConfigurationType = {
  GOOGLE_VERIFY_OAUTH_URL: string;
  JWT_SECRET: string;
  GCP_BUCKET_NAME: string;
  GCP_PROJECT_ID: string;
  NODE_ENV: string;
  DOCKER_IMAGE_NAME: string;
  DOCKER_USERNAME: string;
  DOCKER_PASSWORD: string;
  GCP_KEY_JSON: any;
  SERVER_URL: string;
};

const config: ConfigurationType = {
  GOOGLE_VERIFY_OAUTH_URL: process.env.GOOGLE_VERIFY_OAUTH_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  GCP_BUCKET_NAME: process.env.GCP_BUCKET_NAME,
  GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
  NODE_ENV: process.env.NODE_ENV,
  DOCKER_IMAGE_NAME: process.env.DOCKER_IMAGE_NAME,
  DOCKER_USERNAME: process.env.DOCKER_USERNAME,
  DOCKER_PASSWORD: process.env.DOCKER_PASSWORD,
  SERVER_URL: process.env.SERVER_URL,
  GCP_KEY_JSON: {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain,
  },
};

export default config;
