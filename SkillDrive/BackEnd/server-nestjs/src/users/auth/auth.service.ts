import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';
import { generateToken } from 'src/services/generate.token';
import { authCredentialsDTO } from '../dto/auth.credentials.dto';
import { UserLoggedInWithRefreshTokenDTO } from '../dto/userLoggedInWithRefresh.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async login(credentials: authCredentialsDTO): Promise<UserLoggedInWithRefreshTokenDTO> {
    const userMail = credentials.userMail;
    const userPassword = credentials.userPassword;
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
            const tokens = generateToken(userMail);
            const answer = new UserLoggedInWithRefreshTokenDTO(userToLogin);
            return {...answer, ...tokens};
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
