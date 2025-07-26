import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum OAUTH_PROVIDER {
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
  FACEBOOK = 'FACEBOOK',
  MICROSOFT = 'MICROSOFT',
  TWITTER = 'TWITTER',
  LINKEDIN = 'LINKEDIN',
}
export class SocialLoginDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  oauth: string;

  @IsString()
  @IsNotEmpty()
  firebaseUid: string;

  @IsString()
  @IsNotEmpty()
  idToken: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(OAUTH_PROVIDER)
  @ApiProperty({
    example: OAUTH_PROVIDER.GOOGLE,
    enum: OAUTH_PROVIDER,
    description: 'OAuth provider',
  })
  oauthProvider: OAUTH_PROVIDER;
}
