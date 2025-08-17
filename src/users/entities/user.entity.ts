import { ObjectType, Field, Int } from '@nestjs/graphql';
import { USER_ROLE } from '../dto/create-user.dto';

@ObjectType()
export class User {
  @Field(() => String, { description: 'User id' })
  id: string;
  @Field(() => String, { description: 'User email' })
  email: string;
  @Field(() => String, { description: 'User name' })
  name: string;
  @Field(() => String, { description: 'User role' })
  role: USER_ROLE;
  @Field(() => String, { description: 'User firebaseUid' })
  firebaseUid: string;
  @Field(() => String, { description: 'User oauth' })
  oauth: string;
  @Field(() => String, { description: 'User accessToken' })
  accessToken: string;
  @Field(() => String, { description: 'User idToken' })
  idToken: string;
}
