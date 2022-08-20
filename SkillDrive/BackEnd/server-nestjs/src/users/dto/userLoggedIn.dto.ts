import { userDTO } from "../dto/user.dto";

export class UserLoggedInDTO {
  userMail: string;
  id: string;
  accessToken: string;

  constructor(model: userDTO) {
    this.userMail = model.userMail;
    this.id = model._id;
    this.accessToken = model.accessToken;
  }
}