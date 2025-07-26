import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SocialLoginDto } from './dto/create-auth.dto';
import { AuthHelper } from './helper';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/db/db.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    // private usersService: UsersService,
  ) {}
  async socialLogin(input: SocialLoginDto) {
    const socialResponse = await AuthHelper.verifySocialLoginRegister({
      email: input.email,
      oauth: input.oauthProvider,
      idToken: input.idToken,
    });
    if (!socialResponse) {
      throw new UnauthorizedException('Invalid social response');
    }

    let user = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });
    // if (!user) {
    //   user = await this.usersService.create({
    //     email: input.email,
    //     name: input.name,
    //     signupSource: input.signupSource,
    //     password: '',
    //   });
    // }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user: user,
    };
  }
}
