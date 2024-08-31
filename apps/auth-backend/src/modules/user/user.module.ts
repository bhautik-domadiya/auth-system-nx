import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../../database/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.modelName, schema: userSchema }]),
  ],
  controllers: [UserController],
  providers: [
    // Service
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
