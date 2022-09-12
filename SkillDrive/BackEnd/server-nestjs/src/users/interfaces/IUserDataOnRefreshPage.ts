import { UserDocument } from "@/schemas/user.schema";

export class IUserDataOnRefreshPage {
  "id": string;
  "userAvatarLink": string;

  constructor(model: UserDocument) {
    this.userAvatarLink = model.userAvatarLink;
    this.id = model.id;
  }
}