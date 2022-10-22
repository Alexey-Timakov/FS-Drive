//add and get feedback:
export interface IFeedback {
  // Feedback author's id
  userId: string;
  name: string;
  rank: number;
  date: string;
  text: string;
}

//Component props:
export interface IFeedbackComponent {
  feedback: IFeedback;
}

//State:
export interface FeedbackState {
  carFeedbacks: IFeedback[];
}