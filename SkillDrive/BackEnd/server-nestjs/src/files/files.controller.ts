import { AuthGuard } from '@/guards/auth.guard';
import { IUserAvatarLink } from '@/users/interfaces/IUserAvatarLink';
import { Controller, Get, Param, Post, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { FilesService } from './files.service';
import { CarImageLink } from './interfaces/ICarImageLink';
const fse = require('fs-extra');

@Controller()
export class FilesController {
  constructor(private readonly fileService: FilesService) { }

  @Post('files/upload-avatar')
  // @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files/avatar',
        // destination: (req, file, cb) => {
        //   const userId: string = file.originalname.split("_")[0];
        //   const userPath: string = `./files/avatar/${userId}`;
        //   fse.mkdirsSync(userPath);
        //   cb(null, userPath);
        // },
        filename: (req, file, cb) => {
          cb(null, file.originalname)
        }
      })
    })
  )
  async uploadAvatar(@UploadedFile() file: Express.Multer.File): Promise<IUserAvatarLink> {
    const filename = file.originalname;
    const path = file.path;
    return await this.fileService.saveAvatarLink(filename, path);
  }

  @Post('files/upload-file')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files/scans',
        filename: (req, file, cb) => {
          cb(null, file.originalname)
        }
      })
    })
  )
  async downloadFile(@UploadedFile() file: Express.Multer.File): Promise<boolean> {
    const filename = file.originalname;
    return await this.fileService.saveScanLink(filename);
  }

  @Get('files/avatar/:id')
  async getAvatar(@Param('id') fileName: string): Promise<StreamableFile> {
    const fileExtension = fileName.split(".")[1];
    if (fileExtension) {
      const file = createReadStream(join(process.cwd(), "/files/avatar/", fileName));
      return new StreamableFile(file);
    } else {
      const userAvatarLink = await this.fileService.findUserAvatarLink(fileName);
      const file = createReadStream(join(process.cwd(), userAvatarLink));
      return new StreamableFile(file);
    }
  }

  @Get('files/cars/:path/:id')
  async getCarImage(@Param('id') fileName: string, @Param('path') filePath: string): Promise<StreamableFile> {
    const file = createReadStream(join(process.cwd(), "/files/cars/", filePath, fileName));
    return new StreamableFile(file);
  }

  @Post('files/upload-car-image')
  // @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const carId: string = file.originalname.split("_")[0];
          const userPath: string = `./files/cars/${carId}`;
          fse.mkdirsSync(userPath);
          cb(null, userPath);
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname)
        }
      })
    })
  )
  async uploadCarImage(@UploadedFile() file: Express.Multer.File): Promise<CarImageLink> {
    const filename = file.originalname;
    const path = file.path;
    return await this.fileService.saveCarImageLink(filename, path);
  }
}