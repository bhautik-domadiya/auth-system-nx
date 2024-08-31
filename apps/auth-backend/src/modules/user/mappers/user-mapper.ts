
import { IUser, User } from 'apps/auth-backend/src/database/models/user.model';
import { UserDisplayModel } from '../dto/user-display-model';
import { RegisterPostDto } from '../../auth/dto/register-post.dto';

export class UserMapper {
  public static toDisplay(UserEntity: IUser) {
    const user = new UserDisplayModel();
    user._id = UserEntity._id.toString();
    user.email = UserEntity.email;
    user.firstName = UserEntity.firstName;
    user.lastName = UserEntity.lastName;
    user.auditInfo = UserEntity.auditInfo;
    user.lastLogin = UserEntity.lastLogin;
    return user;
  }

  public static toUserDisplayList(user: IUser[]): UserDisplayModel[] {
    if (!user || !user.length) {
      return [];
    }
    return user.map((user) => {
      return this.toDisplay(user);
    });
  }

  public static toUserModel(createUser: RegisterPostDto): IUser {
    const user = new User(createUser);
    return user;
  }
}
