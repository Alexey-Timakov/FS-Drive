import { File as FileEntity } from "@/files/entities/file.entity";
import { User as UserEntity } from "@/users/entities/user.entity";
import { DataSource } from "typeorm";

export const MongoDataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'sfdrive-orm',
  entities: [
    UserEntity, FileEntity
  ]
});

MongoDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  });