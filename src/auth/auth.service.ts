import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BetaRequestDto, SocialLoginDto } from './dto/create-auth.dto';
import { AuthHelper } from './helper';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/db/db.service';
import { UsersService } from 'src/users/users.service';
import { USER_ROLE } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
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

    if (!user) {
      user = await this.usersService.create({
        email: input.email,
        name: input.name,
        password: '',
        role: USER_ROLE.USER,
        firebaseUid: input.firebaseUid,
        oauth: input.oauth,
        accessToken: input.accessToken,
        idToken: input.idToken,
      });
    } else {
      user = await this.usersService.update(user.id, {
        accessToken: input.accessToken,
        idToken: input.idToken,
      });
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user: user,
    };
  }

  async betaSignup(input: BetaRequestDto) {
    const betaUser = await this.prisma.betaUser.create({
      data: input,
    });
    return betaUser;
  }
}
