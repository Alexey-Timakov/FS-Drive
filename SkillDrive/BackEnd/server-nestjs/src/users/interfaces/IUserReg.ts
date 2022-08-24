import { IUserUnreg } from "./IUserUnreg"
import { encryptPassword } from "../../services/encrypt.pass";

export class IUserReg extends IUserUnreg {
  accessToken?: string
  refreshToken?: string
  resetToken?: string

  constructor(model: IUserUnreg) {
    super();
    this.userName = model.userName;
    this.userMail = model.userMail;
    this.userBirth = model.userBirth;
    this.userPhone = model.userPhone;
    this.userPassport = model.userPassport;
    this.userPassportDate = model.userPassportDate;
    this.userPassportEmitent = model.userPassportEmitent;
    this.userPassportEmitentId = model.userPassportEmitentId;
    this.userLicId = model.userLicId;
    this.userLicIdDate = model.userLicIdDate;
    this.userPassword = encryptPassword(model.userPassword);
    this.accessToken = ""
    this.refreshToken = ""
    this.resetToken = ""
  }
}