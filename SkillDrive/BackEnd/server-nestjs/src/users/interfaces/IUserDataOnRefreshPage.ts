import { UserDocument } from "@/schemas/user.schema";
import { User as UserEntity } from "../entities/user.entity";
import { ObjectID } from "typeorm";

export class IUserDataOnRefreshPage {
  "id": ObjectID;
  "userAvatarLink": string;
  "userName": string;

  constructor(model: UserEntity) {
    this.userAvatarLink = model.userAvatarLink;
    this.id = model._id;
    this.userName = model.userName;
  }
}