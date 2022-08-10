import { UserEntity } from "@/users/entities/user.entity";
import { TestUserEntity } from "@/users/entities/user.entity copy";
import { DataSource } from "typeorm";

export const MongoDataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'sfdrive-orm',
  entities: [
    UserEntity, TestUserEntity,
    // `${__dirname}/**/*.entity.ts`
  ]
});

MongoDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  });