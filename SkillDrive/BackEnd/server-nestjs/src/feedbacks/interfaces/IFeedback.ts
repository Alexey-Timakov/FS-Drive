export interface IFeedback {
  // Feedback author's id
  authorId: string;
  name: string;
  rank: number;
  date: string;
  text: string;
}

export class NewUserFeedbackData {
  userId: string;
  feedbacks: IFeedback[];
  avgRank: number;

  constructor(userId: string, feedback: IFeedback) {
    this.userId = userId;
    this.feedbacks = [feedback];
    this.avgRank = feedback.rank;
  }
}