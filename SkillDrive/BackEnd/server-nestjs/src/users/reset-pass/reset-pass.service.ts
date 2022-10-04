import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Model } from 'mongoose';
import { readFile } from "fs/promises";

import { RESET_LIVE_TIME_GAP_SEC } from 'src/common/variables';
import { generateResetToken } from 'src/services/generate.token';
import { sendEmail } from '../../services/send.email';
import { User, UserDocument } from '../../schemas/user.schema';
import { logWrite, resetLogFilePath } from 'src/services/log.write';
import { UserUpdateDataInterface } from '../interfaces/userUpdateData';
import { encryptPassword } from '@/services/encrypt.pass';
import { ResetPassRepository } from '../repositories/reset-pass.repository';

@Injectable()
export class ResetPassService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private resetPassRepository: ResetPassRepository
  ) { }

  async sendResetPasswordLink(userMail: string): Promise<string> {
    console.log("Requested user to reset password: ", userMail);

    const { resetToken } = generateResetToken(userMail);
    const result = await this.resetPassRepository.updateResetToken(userMail, resetToken);
    if (result) {
      console.log("Found and updated with new resetToken");
      sendEmail(userMail, resetToken);
      logWrite(0, userMail, resetToken);
      return "Reset password request has been acepted";
    } else {
      console.log("Email NOT found!");
      throw new Error;
    }
  }

  async sendResetPasswordForm(resetToken: string): Promise<boolean> {
    console.log("Requested reset password form");

    let textError: string = "Something went wrong...";
    let httpErrorStatus: HttpStatus = HttpStatus.BAD_REQUEST;

    const queryUser = await this.resetPassRepository.getUserByResetToken(resetToken);
    if (queryUser) {
      try {
        type JWTPayloadWithUserMail = JwtPayload & {
          userMail: string;
        }
        const resetTokenPayload = jwtDecode<JWTPayloadWithUserMail>(resetToken);
        console.log("Token has been found. Token payload:", resetTokenPayload);

        const currentTime = Math.round(Date.now() / 1000);
        const resetTokenTime = resetTokenPayload.exp;
        const isResetTokenExpired: boolean = resetTokenTime - currentTime < RESET_LIVE_TIME_GAP_SEC;

        if (!isResetTokenExpired) {
          logWrite(1, resetTokenPayload.userMail, resetToken);
          return true;
        } else {
          textError = "ResetToken is expired";
          httpErrorStatus = HttpStatus.FORBIDDEN;
          throw new Error;
        }
      } catch (error) {
        textError = "ResetToken is invalid";
        httpErrorStatus = HttpStatus.UNAUTHORIZED;
        throw new Error;
      }
    } else {
      textError = "Requested data has NOT been found";
      httpErrorStatus = HttpStatus.NOT_FOUND;
      throw new Error;
    }
  }

  async changePassword(userMail: string, userPassword: string): Promise<boolean> {
    console.log("Requested user to change password: ", userMail);

    let textError: string = "Error while reading log file";
    let httpErrorStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    const userUpdateData: UserUpdateDataInterface = {
      "userPassword": "",
      "resetToken": "",
      "accessToken": "",
      "refreshToken": "",
    };

    userUpdateData.userPassword = encryptPassword(userPassword);

    try {
      const data = await readFile(resetLogFilePath, "utf8");
      if (data.includes(userMail)) {
        const dataArrayOfString: string[] = data.split("\r\n").filter(item => item.includes(userMail));
        const userInfoString: string = dataArrayOfString[dataArrayOfString.length - 1];
        const resetToken: string = userInfoString.split(",")[2].split(":")[1].slice(1, -1);

        const result = await this.resetPassRepository.updateUserPassAndTokens(userMail, resetToken, userUpdateData);
        if (result) {
          logWrite(2, userMail, "");
          console.log("Password updated for user: ", userMail);
          return true;
        } else {
          textError = "Password NOT updated for user";
          httpErrorStatus = HttpStatus.BAD_REQUEST;
          console.log("Password NOT updated for user: ", userMail);
          throw new Error;
        }
      } else {
        textError = "Data NOT found";
        console.log("Data NOT found");
        throw new Error;
      }
    } catch (error) {
      console.log("Error while reading log file", error);
      throw new HttpException(textError, httpErrorStatus);
    }
  }
}