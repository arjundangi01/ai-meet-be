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
import { BetaRequestDto, SocialLoginDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('social-signup')
  async socialLogin(@Body() socialLoginDto: SocialLoginDto) {
    try {
      return this.authService.socialLogin(socialLoginDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('beta-request')
  async betaRequest(@Body() betaRequestDto: BetaRequestDto) {
    return this.authService.betaSignup(betaRequestDto);
  }
}
