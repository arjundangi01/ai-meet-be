export enum USER_ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  role: USER_ROLE;
  firebaseUid?: string;
  oauth?: string;
  accessToken?: string;
  idToken?: string;
}
