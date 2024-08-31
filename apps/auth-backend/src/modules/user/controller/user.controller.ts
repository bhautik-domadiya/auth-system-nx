import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { BaseController } from 'apps/auth-backend/src/core/environment/api/base-controller';

@ApiTags('User')
@ApiBearerAuth()
@Controller({ version: VERSION_NEUTRAL, path: '/api/user' })
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }
}
