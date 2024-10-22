// import { FileModel, FileModelDocument } from '@/schemas/files.schema';
// import { User, UserDocument } from '@/schemas/user.schema';
import { IUserAvatarLink } from '@/users/interfaces/IUserAvatarLink';
import { FilesRepository } from './repositories/files.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarImageLink } from './interfaces/ICarImageLink';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { IUserDocumentsInfo } from './interfaces/IUserDocumentsInfo';
// import { IUserScanLink } from './interfaces/IUserScanLink';

@Injectable()
export class FilesService {
  constructor(
    // @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    // @InjectModel(FileModel.name) private readonly fileModel: Model<FileModelDocument>,
    private filesRepository: FilesRepository
  ) { }

  async findUserAvatarLink(userId: string): Promise<string> {
    const result = await this.filesRepository.getUserById(userId);
    if (result) {
      return result.userAvatarLink
    } else {
      return null;
    }
  }

  async saveAvatarLink(filename: string, filePath: string): Promise<IUserAvatarLink> {
    const userId: string = filename.split("_")[0];
    const avatarLink: string = filePath;

    const userToUpdate = await this.filesRepository.saveAvatarLink(userId, avatarLink);
    if (userToUpdate) {
      return new IUserAvatarLink(avatarLink);
    }
    else {
      throw new HttpException("Error during update user's avatar", HttpStatus.BAD_REQUEST);
    }
  }

  async saveScanLink(filePath: string): Promise<boolean> {
    const userId: string = filePath.split("_")[0];
    if (userId === undefined) {
      throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
    }

    const queryUser = await this.filesRepository.saveScanLink(userId, filePath);
    if (queryUser) {
      return true;
    } else {
      throw new HttpException("Error during update user's files", HttpStatus.BAD_REQUEST);
    }

  }

  async saveCarImageLink(filename: string, filePath: string): Promise<CarImageLink> {
    const carId: string = filename.split("_")[0];
    const carImageLink: string = filePath;

    const carToUpdate = await this.filesRepository.saveCarImageLink(carId, carImageLink);
    if (carToUpdate) {
      return new CarImageLink(carImageLink);
    }
    else {
      throw new HttpException("Error during update car's image", HttpStatus.BAD_REQUEST);
    }
  }
}
