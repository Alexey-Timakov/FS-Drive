import { $api, API_URL } from "../http";
import { ICarOwnerData } from "../Interfaces/ICarSearchResults";

export const FETCH_CAR_OWNER = "FETCH_CAR_OWNER";
export const ADD_CAR_OWNER_DATA = "ADD_CAR_OWNER_DATA";

export const addCarOwnerData = (carOwner: ICarOwnerData) => ({
  type: ADD_CAR_OWNER_DATA,
  payload: {
    carOwner
  }
})

export const fetchCarOwner = (userId: string) => dispatch => {
  $api.get<ICarOwnerData>(`${API_URL}/users/get-car-owner-data/${userId}`)
    .then(data => {
      dispatch(addCarOwnerData(data.data));
    })
    .catch(error => {
      console.log(error);
    })
}