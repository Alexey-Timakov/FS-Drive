import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { generateToken } from 'src/services/generate.token';
import { IAuthCredentials } from '../interfaces/IAuthCredentials';
import { IUserLoggedInWithRefreshToken } from '../interfaces/IUserLoggedInWithRefreshToken';
// import { User, UserDocument } from '../../schemas/user.schema';
import { validateRefreshToken } from '@/services/validate.token';
import { IUserDataOnRefreshPage } from '../interfaces/IUserDataOnRefreshPage';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private authRepository: AuthRepository
  ) { }

  async login(credentials: IAuthCredentials): Promise<IUserLoggedInWithRefreshToken> {
    const { userMail, userPassword } = credentials;
    console.log("Requested data: ", userMail, userPassword);

    const userToLogin = await this.authRepository.getUserByEMail(userMail);

    if (userToLogin !== null) {
      console.log("User have been found!", userToLogin.userMail);

      const isMatch = await bcrypt.compare(userPassword, userToLogin.userPassword);
      if (isMatch) {
        console.log("Password matches!");

        const { accessToken, refreshToken } = generateToken(userMail);
        const updatedUser = await this.authRepository.updateUserTokens(userMail, accessToken, refreshToken);
        if (updatedUser) {
          const result = new IUserLoggedInWithRefreshToken(userToLogin);
          result.accessToken = accessToken;
          result.refreshToken = refreshToken;
          return result;
        }
      } else {
        console.log("Password does NOT match!");
        throw new Error;
      }
    }
  }

  async refreshToken(token: string): Promise<IUserLoggedInWithRefreshToken> {
    if (!token) {
      throw new Error;
    }
    try {
      const tokenData = validateRefreshToken(token);
      const queryUser = await this.authRepository.getUserByRefreshToken(token);
      if (!tokenData || !queryUser) {
        console.log("error during refreshing tokens for user");
        throw new Error;
      }
      const { accessToken, refreshToken } = generateToken(tokenData.userMail);
      const updatedUser = await this.authRepository.updateUserTokens(tokenData.userMail, accessToken, refreshToken);

      if (updatedUser) {
        const result = new IUserLoggedInWithRefreshToken(queryUser);
        result.accessToken = accessToken;
        result.refreshToken = refreshToken;
        console.log("refreshed tokens for user", result.id);
        return result;
      }
    } catch (error) {
      throw new Error;
    }
  }

  async getUserData(id: string): Promise<IUserDataOnRefreshPage> {
    try {
      const queryUser = await this.authRepository.getUserById(id);
      if (queryUser) {
        console.log("user found", queryUser._id);
        const userData = new IUserDataOnRefreshPage(queryUser);
        return userData;
      }
      else {
        console.log("user data not found", queryUser._id);
        throw new Error;
      }
    } catch (error) {
      throw new Error;
    }
  }
}
