import { Injectable } from '@nestjs/common';
import { IFeedback } from './interfaces/Ifeedback';
import { FeedbackRepository } from './repositories/feedback.repository';

@Injectable()
export class FeedbacksService {
  constructor(private readonly feedbackRepository: FeedbackRepository) { }

  async getUserFeedbacks(userId: string): Promise<IFeedback[]> {
    const result = await this.feedbackRepository.getUserFeedbacks(userId);
    return result.feedbacks
  }

  async updateUserFeedbacks(userId: string, newFeedback: IFeedback) {
    return await this.feedbackRepository.updateUserFeedbacks(userId, newFeedback)
  }
}
