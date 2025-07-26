import { OAUTH_PROVIDER } from './dto/create-auth.dto';
import SocialAuth from './sociel-auth.service';
export class AuthHelper {
  public static async verifySocialLoginRegister(payload: {
    oauth: string;
    email: string;
    idToken: string;
  }) {
    const socialAuth = new SocialAuth(payload.idToken);
    switch (payload.oauth) {
      case OAUTH_PROVIDER.GOOGLE:
        return socialAuth.google();
      //   case OAUTH_PROVIDER.FACEBOOK:
      //     return socialAuth.facebook();
      //   case OAUTH_PROVIDER.MICROSOFT:
      //     return socialAuth.microsoft();
      //   case OAUTH_PROVIDER.APPLE:
      //     return socialAuth.apple(payload.email, payload.idToken);
      default:
        break;
    }

    return true;
  }
}
