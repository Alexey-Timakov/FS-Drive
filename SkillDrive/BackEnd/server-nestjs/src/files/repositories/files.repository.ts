import { MongoDataSource } from "@/data_source/mongo.data.source";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ObjectID } from "mongodb";
import { User } from "@/users/entities/user.entity";
import { File as FileEntity } from "../../files/entities/file.entity";
import { IUserScanLink } from "@/files/interfaces/IUserScanLink";
import { IUserDocumentsInfo } from "@/files/interfaces/IUserDocumentsInfo";


@Injectable()
export class FilesRepository {

  async saveAvatarLink(userId: string, avatarLink: string) {
    const repository = MongoDataSource.getMongoRepository(User);

    const queryUser = { "_id": new ObjectID(userId) };
    try {
      const result = await repository.findOneAndUpdate(queryUser, { $set: { "userAvatarLink": avatarLink } });
      if (result) {
        return result;
      } else {
        throw new HttpException(`User Not found`, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(`Database error`, HttpStatus.BAD_REQUEST);
    }
  }

  async saveScanLink(userId: string, documentLink: string) {
    const repository = MongoDataSource.getMongoRepository(FileEntity);
    const queryUser = { "userId": userId };

    try {
      const result = await repository.findOneBy(queryUser);
      if (result) {
        const newDocumentElement = new IUserScanLink(documentLink);
        const documents: IUserScanLink[] = [...result.documents, newDocumentElement];
        result.documents = documents;
        return await repository.save(result);
      } else {
        const newData = new IUserDocumentsInfo(userId, documentLink);
        return await repository.save(newData);
      }
    } catch (error) {
      throw new HttpException(`Database error`, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(userId: string) {
    const repository = MongoDataSource.getMongoRepository(FileEntity);
    const queryUser = { "_id": new ObjectID(userId) };

    try {
      const result = await repository.findOneBy(queryUser);
      if (result) {
        return result
      } else {
        throw new HttpException(`User Not found`, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(`Database error`, HttpStatus.BAD_REQUEST);
    }
  }
}