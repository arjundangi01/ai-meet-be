import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { generateCodeVerifier, generateState, Google } from 'arctic';
import envConfig from 'src/lib/config/env-config';

@Injectable()
export class AuthService {
  private readonly google = new Google(
    envConfig.GOOGLE_CLIENT_ID,
    envConfig.GOOGLE_CLIENT_SECRET,
    envConfig.GOOGLE_CALLBACK_URL,
  );
  constructor() {
    this.google = new Google(
      envConfig.GOOGLE_CLIENT_ID,
      envConfig.GOOGLE_CLIENT_SECRET,
      envConfig.GOOGLE_CALLBACK_URL,
    );
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getGoogleLoginParams() {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const scope = ['openid', 'email', 'profile'];
    const url = this.google.createAuthorizationURL(state, codeVerifier, scope);
    return { url, state, codeVerifier };
  }

  async googleLogin(user: any) {
    // const { accessToken, refreshToken } = await this.google.getTokens(
    //   user.code,
    //   user.codeVerifier,
    // );
    return { accessToken: 'accessToken', refreshToken: 'refreshToken' };
  }

  async googleLoginCallback(code: string, codeVerifier: string) {
    let tokens;
    tokens = await this.google.validateAuthorizationCode(code, codeVerifier);
    return tokens;
  }
}
