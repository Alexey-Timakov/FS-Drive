import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { CarsModule } from './cars/cars.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from './users/entities/user.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: "mongodb",
    //   host: "localhost",
    //   port: 27017,
    //   database: "sfdrive-orm",
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   entities: [
    //     UserEntity
    //   ]
    // }),
    MongooseModule.forRoot("mongodb://localhost:27017/sfdrive", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    UsersModule,
    FilesModule,
    CarsModule,
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule { }