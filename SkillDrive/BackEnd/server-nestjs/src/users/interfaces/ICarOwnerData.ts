import { User as UserEntity } from "../entities/user.entity";
import { ObjectID } from "typeorm";

export class ICarOwnerData {
  "id": ObjectID;
  "userAvatarLink": string;
  "userName": string;
  "userBirth": string;
  "userPhone": string;
  "userMail": string;
  "cars": string[];

  constructor(model: UserEntity) {
    this.id = model._id;
    this.userAvatarLink = model.userAvatarLink;
    this.userName = model.userName;
    this.userBirth = model.userBirth;
    this.userPhone = model.userPhone;
    this.userMail = model.userMail;
    this.cars = model.cars;
  }
}