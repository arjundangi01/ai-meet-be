import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/db/db.module';
import { UserResolver } from './users.resolver';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserResolver],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
