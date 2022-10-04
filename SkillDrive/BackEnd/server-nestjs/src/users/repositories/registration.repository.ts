import { MongoDataSource } from "@/data_source/mongo.data.source";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { IUserReg } from "../interfaces/IUserReg";

@Injectable()
export class RegistrationRepository {

  async createUser(newUser: IUserReg) {
    const repository = MongoDataSource.getMongoRepository(User);

    try {
      const queryUser = await repository.findOneBy({ "userMail": newUser.userMail });
      if (queryUser === null) {
        return await repository.save(newUser);
      } else {
        throw new HttpException(`User already exists`, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(`Database error`, HttpStatus.BAD_REQUEST);
    }
  }
}