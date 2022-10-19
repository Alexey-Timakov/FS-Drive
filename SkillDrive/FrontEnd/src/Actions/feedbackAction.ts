import { $api, API_URL } from "../http";
import { IUserFeedback } from "../Interfaces/IUserFeedback";

export const FETCH_USER_FEEDBACKS = "FETCH_USER_FEEDBACKS";
export const ADD_USER_FEEDBACKS = "ADD_USER_FEEDBACKS";

export const addUserFeedbacks = (feedbacks: IUserFeedback[]) => ({
  type: ADD_USER_FEEDBACKS,
  payload: {
    feedbacks
  }
})

export const fetchUserFeedbacks = (userId: string) => dispatch => {
  $api.get<IUserFeedback[]>(`${API_URL}/feedbacks/${userId}`)
    .then(data => {
      dispatch(addUserFeedbacks(data.data));
    })
    .catch(error => {
      console.log(error);
    })
}