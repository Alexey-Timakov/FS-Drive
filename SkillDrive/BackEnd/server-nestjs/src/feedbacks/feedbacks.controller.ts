import { AuthGuard } from '@/guards/auth.guard';
import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { Feedback as FeedbackEntity } from './entities/feedback.entity';
import { FeedbacksService } from './feedbacks.service';
import { IFeedback } from './interfaces/Ifeedback';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbackService: FeedbacksService) { }

  // @UseGuards(AuthGuard)
  @Get('/:id')
  async getCarFeedbacks(@Param('id') carId: string): Promise<IFeedback[]> {
    return await this.feedbackService.getCarFeedbacks(carId);
  }

  // @UseGuards(AuthGuard)
  @Put('/:id')
  async updateCarFeedbacks(@Param('id') carId: string, @Body() newFeedback: IFeedback): Promise<FeedbackEntity> {
    return await this.feedbackService.updateCarFeedbacks(carId, newFeedback);
  }
}
