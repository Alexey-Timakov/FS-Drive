import { Injectable } from '@nestjs/common';
import { IFeedback } from './interfaces/Ifeedback';
import { FeedbackRepository } from './repositories/feedback.repository';

@Injectable()
export class FeedbacksService {
  constructor(private readonly feedbackRepository: FeedbackRepository) { }

  async getCarFeedbacks(carId: string): Promise<IFeedback[]> {
    const result = await this.feedbackRepository.getCarFeedbacks(carId);
    return result.feedbacks
  }

  async updateCarFeedbacks(carId: string, newFeedback: IFeedback) {
    return await this.feedbackRepository.updateCarFeedbacks(carId, newFeedback)
  }
}
