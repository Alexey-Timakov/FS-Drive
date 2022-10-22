export interface IFeedback {
  // Feedback author's id
  authorId: string;
  name: string;
  rank: number;
  date: string;
  text: string;
}

export class NewCarFeedbackData {
  carId: string;
  feedbacks: IFeedback[];
  avgRank: number;

  constructor(carId: string, feedback: IFeedback) {
    this.carId = carId;
    this.feedbacks = [feedback];
    this.avgRank = feedback.rank;
  }
}