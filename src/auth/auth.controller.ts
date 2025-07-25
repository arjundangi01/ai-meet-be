// auth/auth.controller.ts
import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards()
  async googleAuth(@Req() req: any, @Res() response: Response) {
    try {
      console.log('Google auth request received');
      const { url, state, codeVerifier } =
        this.authService.getGoogleLoginParams();

      // set cookes
      // response?.cookie('state', state, { httpOnly: true });
      // response?.cookie('codeVerifier', codeVerifier, { httpOnly: true });

      // return res.redirect(url);
      console.log('Redirecting to:', url.toString());
      response.status(200).redirect(url.toString());
    } catch (error) {
      console.error('Google auth error:', error);
    }
  }

  @Get('google/callback')
  @UseGuards()
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const { code, state } = req.query;
      console.log('Google auth redirect received', code, state);
      const { google_oauth_state, google_code_verifier } = req.cookies;
      const tokens = await this.authService.googleLoginCallback(
        code,
        google_code_verifier,
      );
      console.log('Tokens:', tokens);
    } catch (error) {
      console.error('Google auth redirect error:', error);
    }
  }

  @Post('refresh')
  async refreshToken(@Body() body: { refreshToken: string }) {
    // return this.authService.refreshGoogleToken(body.refreshToken);
  }
}
