import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express'
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    MongooseModule.forRoot("mongodb://localhost:27017/sfdrive", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    UsersModule,
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }