import { ADD_CAR_FEEDBACKS } from "../Actions/feedbackAction";
import { FeedbackState } from "../Interfaces/ICarFeedback";

const DEFAULT_STATE: FeedbackState = {
  carFeedbacks: [],
};

export const carFeedbacks = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_CAR_FEEDBACKS:
      const feedbacks = action.payload.feedbacks;
      return {
        ...state,
        carFeedbacks: feedbacks
      }

    default: return state;
  }
};