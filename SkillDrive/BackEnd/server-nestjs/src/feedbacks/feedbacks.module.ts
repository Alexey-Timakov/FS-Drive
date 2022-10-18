import { Module } from '@nestjs/common';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { FeedbackRepository } from './repositories/feedback.repository';

@Module({
  controllers: [FeedbacksController],
  providers: [FeedbacksService, FeedbackRepository]
})
export class FeedbacksModule { }
