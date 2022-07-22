import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { readFile } from "fs/promises";

import { RESET_LIVE_TIME_GAP_SEC } from 'src/common/variables';
import { generateResetToken } from 'src/services/generate.token';
import { sendEmail } from 'src/services/sendEmail';
import { User, UserDocument } from '../schemas/user.schema';
import { logWrite, resetLogFilePath } from 'src/services/log.write';
import { resetToken } from '../interfaces/tokens';
import { UserUpateDataInterface } from '../interfaces/userUpdateData';

@Injectable()
export class ResetPassService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async sendResetPasswordLink(userMail: string): Promise<any> {

    console.log("Requested user to reset password: ", userMail);
    const queryUser = { "userMail": userMail };
    const resetToken = generateResetToken(userMail);

    let textError: string = "Something went wrong...";
    let httpErrorStatus: HttpStatus = HttpStatus.NOT_FOUND;

    try {
      const result = await this.userModel.findOneAndUpdate(queryUser, { $set: { "resetToken": resetToken.resetToken } })
      if (result) {
        console.log("Found");
        sendEmail(userMail, resetToken.resetToken);
        logWrite(0, userMail, resetToken.resetToken);
        return "Reset password request has been acepted";
      } else if (!result) {
        textError = "Email NOT found!";
        console.log(textError);
        throw new Error;
      }
    }
    catch (error) {
      console.log("Error", error);
      throw new HttpException(textError, httpErrorStatus);
    }
  }

  async sendResetPasswordForm(resetToken: string): Promise<boolean | Error> {
    console.log("Requested reset password form");

    let textError: string = "Something went wrong...";
    let httpErrorStatus: HttpStatus = HttpStatus.BAD_REQUEST;

    try {
      const idToReset = await this.userModel.findOne({ "resetToken": resetToken });
      if (idToReset !== null) {
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
    } catch (error) {
      throw new HttpException(textError, httpErrorStatus);
    }
  }

  async changePassword(userMail: string, userPassword: string): Promise<boolean | Error> {
    const saltRounds = 10;
    let textError: string = "Error while reading log file";
    let httpErrorStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    const userUpdateData: UserUpateDataInterface = {
      "userPassword": "",
      "resetToken": "",
      "accessToken": "",
      "refreshToken": "",
    };

    const queryUser: object = {
      "userMail": userMail,
    };

    const queryResetToken: resetToken = {
      "resetToken": "",
    };

    console.log("Requested user to change password: ", userMail);

    userUpdateData.userPassword = bcrypt.hashSync(userPassword, saltRounds);

    try {
      const data = await readFile(resetLogFilePath, "utf8");
      if (data.includes(userMail)) {
        const dataArrayOfString: string[] = data.split("\r\n").filter(item => item.includes(userMail));
        const userInfoString: string = dataArrayOfString[dataArrayOfString.length - 1];
        const resetToken: string = userInfoString.split(",")[2].split(":")[1].slice(1, -1);
        queryResetToken.resetToken = resetToken;

        try {
          const result = await this.userModel.findOneAndUpdate({ $and: [queryUser, queryResetToken] }, { $set: userUpdateData }, { returnNewDocument: true });
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
        }
        catch (error) {
          textError = "Database Error";
          console.log("Database Error", error);
          throw new HttpException(textError, httpErrorStatus);
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