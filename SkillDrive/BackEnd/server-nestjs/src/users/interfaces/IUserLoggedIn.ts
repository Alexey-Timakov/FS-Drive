import { UserDocument } from "@/schemas/user.schema";

export class IUserLoggedIn {
  id: string;
  accessToken: string;

  constructor(model: UserDocument) {
    this.accessToken = model.accessToken;
    this.id = model._id
  }
}