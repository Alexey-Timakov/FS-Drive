import { MongoDataSource } from "@/data_source/mongo.data.source";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ObjectID } from "mongodb";
import { User } from "../entities/user.entity";

@Injectable()
export class AuthRepository {

  async getUserByEMail(userMail: string) {
    const repository = MongoDataSource.getMongoRepository(User);
    try {
      const queryUser = await repository.findOneBy({ "userMail": userMail });
      if (queryUser !== null) {
        return queryUser;
      } else {
        throw new HttpException(`User does not exist`, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(`Database error`, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id: string) {
    const repository = MongoDataSource.getMongoRepository(User);
    try {
      const queryUser = await repository.findOneBy({ "_id": new ObjectID(id) });
      if (queryUser !== null) {
        return queryUser;
      } else {
        throw new HttpException(`User does not exist`, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(`Database error`, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByRefreshToken(refreshToken: string) {
    const repository = MongoDataSource.getMongoRepository(User);
    try {
      const queryUser = await repository.findOneBy({ "refreshToken": refreshToken });
      if (queryUser !== null) {
        return queryUser;
      } else {
        throw new HttpException(`User does not exist`, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(`Database error`, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserTokens(userMail: string, accessToken: string, refreshToken: string) {
    const repository = MongoDataSource.getMongoRepository(User);
    const query = { "userMail": userMail };
    try {
      return await repository.findOneAndUpdate(query, { $set: { "refreshToken": refreshToken, "accessToken": accessToken } })
    } catch (error) {
      throw new HttpException(`Database error`, HttpStatus.BAD_REQUEST);
    }
  }
}