import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';

import { generateToken } from '../../services/generate.token';

// import { User, UserDocument } from '../../schemas/user.schema';
import { User as UserEntity } from '@/users/entities/user.entity';
import { RegistrationRepository } from '../repositories/registration.repository';

import { IUserUnreg } from '../interfaces/IUserUnreg';
import { IUserReg } from '../interfaces/IUserReg';

@Injectable()
export class RegistrationService {
  constructor(
    // @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private regRepository: RegistrationRepository
  ) { }

  async createUser(user: IUserUnreg): Promise<UserEntity> {

    const newUserData = new IUserReg(user);
    const { accessToken, refreshToken } = generateToken(newUserData.userMail);
    newUserData.accessToken = accessToken;
    newUserData.refreshToken = refreshToken;
    return await this.regRepository.createUser(newUserData);
  }
}
