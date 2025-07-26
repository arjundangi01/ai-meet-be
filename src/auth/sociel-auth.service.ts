import envConfig from 'src/lib/config/env-config';
import { HttpClient } from 'src/lib/services/httpClient';
import { httpClientConfig } from 'src/lib/types/http-client';

export default class SocialAuth {
  private idToken: string;

  constructor(idToken: string) {
    this.idToken = idToken;
  }

  private async sendHttpRequest(url: string, headers?: object) {
    const requestConfig: httpClientConfig = {
      method: 'GET',
      url,
      headers,
    };
    return HttpClient.Request(requestConfig);
  }

  public async google() {
    const url = `${envConfig.GOOGLE_VERIFY_OAUTH_URL}?id_token=${this.idToken}`;
    return this.sendHttpRequest(url);
  }
}
