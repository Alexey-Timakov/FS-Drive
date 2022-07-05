import { Module } from '@nestjs/common';
import { ResetPassService } from './reset-pass.service';
import { ResetPassController } from './reset-pass.controller';

@Module({
  providers: [ResetPassService],
  controllers: [ResetPassController]
})
export class ResetPassModule {}
