import { MongoDataSource } from "@/data_source/mongo.data.source";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ObjectID } from "mongodb";
import { User as UserEntity } from "@/users/entities/user.entity";
import { File as FileEntity } from "../../files/entities/file.entity";
import { Cars as CarsEntity } from "@/cars/entities/car.entity";
import { IUserScanLink } from "@/files/interfaces/IUserScanLink";
import { IUserDocumentsInfo } from "@/files/interfaces/IUserDocumentsInfo";


@Injectable()
export class FilesRepository {

  async saveAvatarLink(userId: string, avatarLink: string) {
    const repository = MongoDataSource.getMongoRepository(UserEntity);
    const queryUser = { "_id": new ObjectID(userId) };
    try {
      const result = await repository.findOneAndUpdate(queryUser, { $set: { "userAvatarLink": avatarLink } });
      if (result) {
        return result;
      } else {
        throw new HttpException(`User Not found`, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.log(error);
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

  async saveCarImageLink(userId: string, carImageLink: string): Promise<CarsEntity> {
    const repository = MongoDataSource.getMongoRepository(CarsEntity);
    const queryCar = { "_id": ObjectID(userId) };
    try {
      const result = await repository.findOneBy(queryCar);
      if (result) {
        let carImagesLinks: string[] = [];
        if (result.imagesLinks) {
          carImagesLinks = [...result.imagesLinks, carImageLink];
        } else {
          carImagesLinks.push(carImageLink);
        }
        result.imagesLinks = carImagesLinks;
        return await repository.save(result);
      } else {
        throw new HttpException(`User Not found`, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(`Database error`, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserFilesById(userId: string) {
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

  async getUserById(userId: string) {
    const repository = MongoDataSource.getMongoRepository(UserEntity);
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