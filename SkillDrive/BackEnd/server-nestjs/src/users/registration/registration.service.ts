import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { generateToken } from '../../services/generate.token';
import { encryptPassword } from '../../services/encrypt.pass';

import { User, UserDocument } from '../../schemas/user.schema';

import { IUserUnreg } from '../interfaces/IUserUnreg';
import { IUserReg } from '../interfaces/IUserReg';

import { MongoDataSource } from '@/data_source/mongo.data.source';
import { UserEntity } from '@/users/entities/user.entity';
import { TestUserEntity } from '../entities/user.entity copy';

@Injectable()
export class RegistrationService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async createUser(user: IUserUnreg): Promise<UserDocument> {
    try {
      const existUsers = await this.userModel.find({ "userMail": user.userMail });
      if (existUsers.length === 0) {
        const newUserData = new IUserReg(user);
        const tokens = generateToken(newUserData.userMail);
        newUserData.accessToken = tokens.accessToken;
        newUserData.refreshToken = tokens.refreshToken;
        const newUser = new this.userModel(newUserData);
        newUser.save();
        return newUser;
      } else {
        throw new HttpException(`User already exists: ${user.userMail}`, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findUsers() {
    const temp = await MongoDataSource.manager.find(UserEntity)
    const tem = await MongoDataSource.getMongoRepository
    return temp;
  }

  async createTempUser(user: IUserUnreg) {
    const newUser = new UserEntity();
    newUser.userMail = user.userMail;
    newUser.userPassword = user.userPassword;
    console.log(newUser);

    const temp = await MongoDataSource.manager.save(newUser);
    console.log(temp);
    return temp;
  }
}
