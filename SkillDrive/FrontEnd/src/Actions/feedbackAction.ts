import { $api, API_URL } from "../http";
import { IFeedback } from "../Interfaces/ICarFeedback";

export const FETCH_USER_FEEDBACKS = "FETCH_USER_FEEDBACKS";
export const ADD_CAR_FEEDBACKS = "ADD_CAR_FEEDBACKS";

export const addCarFeedbacks = (feedbacks: IFeedback[]) => ({
  type: ADD_CAR_FEEDBACKS,
  payload: {
    feedbacks
  }
})

export const fetchCarFeedbacks = (carId: string) => dispatch => {
  $api.get<IFeedback[]>(`${API_URL}/feedbacks/${carId}`)
    .then(data => {
      dispatch(addCarFeedbacks(data.data));
    })
    .catch(error => {
      console.log(error);
    })
}