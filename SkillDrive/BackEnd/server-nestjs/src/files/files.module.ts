import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express'
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/schemas/user.schema';
import { FileModel, FileSchema } from '@/schemas/files.schema';
import { FilesRepository } from './repositories/files.repository';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: FileModel.name,
        schema: FileSchema
      },
    ])
  ],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository]
})
export class FilesModule { }