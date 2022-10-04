import { UserDocument } from "@/schemas/user.schema";
import { ObjectID } from "typeorm";
import { User as UserEntity } from "../entities/user.entity";


export class IUserLoggedIn {
  id: ObjectID;
  accessToken: string;

  constructor(model: UserEntity) {
    this.accessToken = model.accessToken;
    this.id = model._id
  }
}