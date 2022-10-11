import { AuthGuard } from '@/guards/auth.guard';
import { IUserAvatarLink } from '@/users/interfaces/IUserAvatarLink';
import { Controller, Get, Param, Post, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { FilesService } from './files.service';

@Controller()
export class FilesController {
  constructor(private readonly fileService: FilesService) { }

  @Post('files/upload-avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files/avatar',
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
  uploadFile(@Param('id') fileName: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), "/files/avatar/", fileName));
    return new StreamableFile(file);
  }
}