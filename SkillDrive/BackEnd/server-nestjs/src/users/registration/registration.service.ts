import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { generateToken } from 'src/services/generate.token';
import { userDTO } from '../dto/user.dto';
import { UserInterface } from '../interfaces/user';
import { User, UserDocument } from '../schemas/user.schema';
import { MongoDataSource } from '@/data_source/mongo.data.source';
import { UserEntity } from '@/users/entities/user.entity';
import { TestUserEntity } from '../entities/user.entity copy';
import { UserLoggedInWithRefreshTokenDTO } from '../dto/userLoggedInWithRefresh.dto';

@Injectable()
export class RegistrationService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async createUser(user: userDTO): Promise<UserLoggedInWithRefreshTokenDTO> {
    try {
      const checkVal = await this.userModel.find({ "userMail": user.userMail });

      if (checkVal.length === 0) {
        let newUserData = {} as UserInterface;
        const saltRounds: number = 10;

        Object.entries(user).forEach(([key, value]) => {
          if (key === "userPassword") {
            newUserData["userPassword"] = bcrypt.hashSync(value, saltRounds);
          } else {
            newUserData[key] = value;
          }
        });

        const tokens = generateToken(newUserData.userMail);
        newUserData.accessToken = tokens.accessToken;
        newUserData.refreshToken = tokens.refreshToken;
        const newUser = new this.userModel(newUserData);
        newUser.save();

        const answer = new UserLoggedInWithRefreshTokenDTO(newUser);
        return answer;
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
  
  async createTempUser(user: userDTO) {
    const newUser = new UserEntity();
    newUser.userMail = user.userMail;
    newUser.userPassword = user.userPassword;
    console.log(newUser);

    const temp = await MongoDataSource.manager.save(newUser);
    console.log(temp);
    return temp;
  }
}
