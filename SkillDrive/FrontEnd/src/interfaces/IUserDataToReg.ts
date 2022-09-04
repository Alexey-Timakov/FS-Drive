import { IUserData } from "./IUserData";

export class IUserDataToReg {
  userName: String
  userMail: String
  userBirth: String
  userPhone: String
  userPassport: String
  userPassportDate: String
  userPassportEmitent: String
  userPassportEmitentId: String
  userLicId: String
  userLicIdDate: String
  userPassword: String

  constructor(model: IUserData) {
    this.userName = model?.userName;
    this.userMail = model?.userMail;
    this.userBirth = model?.userBirth;
    this.userPhone = model?.userPhone;
    this.userPassport = model?.userPassport;
    this.userPassportDate = model?.userPassportDate;
    this.userPassportEmitent = model?.userPassportEmitent;
    this.userPassportEmitentId = model?.userPassportEmitentId;
    this.userLicId = model?.userLicId;
    this.userLicIdDate = model?.userLicIdDate;
    this.userPassword = model?.userPassword;
  }
}