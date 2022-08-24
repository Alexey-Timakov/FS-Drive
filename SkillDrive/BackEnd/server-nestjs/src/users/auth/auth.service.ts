import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { generateToken } from 'src/services/generate.token';
import { IAuthCredentials } from '../interfaces/IAuthCredentials';
import { IUserLoggedInWithRefreshToken } from '../interfaces/IUserLoggedInWithRefreshToken';
import { User, UserDocument } from '../../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async login(credentials: IAuthCredentials): Promise<IUserLoggedInWithRefreshToken> {
    const { userMail, userPassword } = credentials;
    console.log("Requested data: ", userMail, userPassword);

    let textError: string = "Unexpected error!";
    let httpStatus: HttpStatus = HttpStatus.UNAUTHORIZED;

    try {
      const userToLogin = await this.userModel.findOne({ "userMail": userMail });

      if (userToLogin != null) {
        console.log("User have been found!", userToLogin.userMail);

        const isMatch = await bcrypt.compare(userPassword, userToLogin.userPassword);
        if (isMatch) {
          console.log("Password matches!");
          const { accessToken, refreshToken } = generateToken(userMail);
          const result = new IUserLoggedInWithRefreshToken(userToLogin);
          result.accessToken = accessToken;
          result.refreshToken = refreshToken
          return result;
        } else {
          console.log("Password does NOT match!");
          textError = "Login and password do NOT match!";
          httpStatus = HttpStatus.UNAUTHORIZED;
          throw new Error;
        }
      } else {
        console.log("User have NOT been found!", userMail);
        textError = "User have NOT been found!";
        httpStatus = HttpStatus.UNAUTHORIZED;
        throw new Error;
      }
    } catch (error) {
      console.log("Error", error);
      throw new HttpException(textError, httpStatus);
    }
  }
}
