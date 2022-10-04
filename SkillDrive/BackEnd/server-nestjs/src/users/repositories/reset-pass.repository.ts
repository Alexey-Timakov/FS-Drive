import { MongoDataSource } from "@/data_source/mongo.data.source";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { IResetToken } from "../interfaces/ITokens";
import { UserUpdateDataInterface } from "../interfaces/userUpdateData";

@Injectable()
export class ResetPassRepository {

  async updateResetToken(userMail: string, resetToken: string) {
    const repository = MongoDataSource.getMongoRepository(User);

    try {
      const queryUser = { "userMail": userMail };
      return await repository.findOneAndUpdate(queryUser, { $set: { "resetToken": resetToken } });
    } catch (error) {
      throw new HttpException(`Database error`, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByResetToken(resetToken: string) {
    const repository = MongoDataSource.getMongoRepository(User);

    try {
      const queryUser = await repository.findOneBy({ "resetToken": resetToken });
      if (queryUser !== null) {
        return queryUser;
      } else {
        throw new HttpException(`User does not exist`, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(`Database error`, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserPassAndTokens(userMail: string, resetToken: string, newUserData: UserUpdateDataInterface) {
    const repository = MongoDataSource.getMongoRepository(User);

    const queryUser: object = {
      "userMail": userMail,
    };

    const queryResetToken: IResetToken = {
      "resetToken": resetToken,
    };

    try {
      return await repository.findOneAndUpdate({ $and: [queryUser, queryResetToken] }, { $set: newUserData })
    } catch (error) {
      throw new HttpException(`Wrong data`, HttpStatus.BAD_REQUEST);
    }
  }
}