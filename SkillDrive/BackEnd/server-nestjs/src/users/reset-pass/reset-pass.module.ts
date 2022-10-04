import { Module } from '@nestjs/common';
import { ResetPassService } from './reset-pass.service';
import { ResetPassController } from './reset-pass.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { ResetPassRepository } from '../repositories/reset-pass.repository';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

@Module({
  controllers: [ResetPassController],
  providers: [ResetPassService, ResetPassRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    //   ServeStaticModule.forRoot({
    //     rootPath: join(__dirname, '../../../static/resetpass'),
    //     // renderPath: /(\/users\/resetpass\/requestform\/)([\w-]*\.[\w-]*\.[\w-]*)/g,
    //     renderPath: "/users/resetpass/requestform/",
    //  }),
  ]
})
export class ResetPassModule { }