import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { generateToken } from 'src/services/generate.token';
import { IAuthCredentials } from '../interfaces/IAuthCredentials';
import { IUserLoggedInWithRefreshToken } from '../interfaces/IUserLoggedInWithRefreshToken';
import { User, UserDocument } from '../../schemas/user.schema';
import { validateRefreshToken } from '@/services/validate.token';
import { IUserDataOnRefreshPage } from '../interfaces/IUserDataOnRefreshPage';

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

          userToLogin.accessToken = accessToken;
          userToLogin.refreshToken = refreshToken;
          userToLogin.save();

          const result = new IUserLoggedInWithRefreshToken(userToLogin);
          result.accessToken = accessToken;
          result.refreshToken = refreshToken;

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

  async refreshToken(token: string): Promise<IUserLoggedInWithRefreshToken> {
    const textError: string = "Bad request!";
    const httpStatus: HttpStatus = HttpStatus.BAD_REQUEST;
    if (!token) {
      throw new Error;
    }
    try {
      const tokenData = validateRefreshToken(token);
      const queryUser = await this.userModel.findOne({ "refreshToken": token });
      if (!tokenData || !queryUser) {
        throw new Error;
      }

      const { accessToken, refreshToken } = generateToken(queryUser.userMail);
      queryUser.accessToken = accessToken;
      queryUser.refreshToken = refreshToken;
      queryUser.save();

      const result = new IUserLoggedInWithRefreshToken(queryUser);
      result.accessToken = accessToken;
      result.refreshToken = refreshToken;

      return result;

    } catch (error) {
      throw new HttpException(textError, httpStatus);
    }
  }

  async getUserData(id: string): Promise<IUserDataOnRefreshPage> {
    const textError: string = "Bad request!";
    const httpStatus: HttpStatus = HttpStatus.BAD_REQUEST;
    console.log(id);
    try {
      const queryUser = await this.userModel.findById(id);
      if (queryUser) {
        const userData = new IUserDataOnRefreshPage(queryUser);
        return userData;
      }
      else {
        throw new HttpException(textError, httpStatus);
      }
    } catch (error) {
      throw new HttpException(textError, httpStatus);
    }

  }
}
