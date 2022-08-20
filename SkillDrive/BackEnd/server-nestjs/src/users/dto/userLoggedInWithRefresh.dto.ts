import { userDTO } from "./user.dto";
import { UserLoggedInDTO } from "./userLoggedIn.dto";

export class UserLoggedInWithRefreshTokenDTO extends UserLoggedInDTO {
  refreshToken: string;

  constructor(model: userDTO) {
    super(model);
    this.refreshToken = model.refreshToken
  }
}