import { BaseError } from "apps/auth-backend/src/utils/errors/base-error";
import { ErrorCategories } from "apps/auth-backend/src/utils/errors/error-categories";




export enum UserErrorCodeEnum {
  
}

export class UserService {
  private AcademyError: BaseError;
  constructor() {
    this.AcademyError = new BaseError(ErrorCategories.Authentication);
  }


}
