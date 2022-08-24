export const ADD_USER_INFO = "ADD_USER_INFO";

export const addUserInfoToStateAction = (InputName: string, InputValue: string) => ({
  type: ADD_USER_INFO,
  payload: {
    InputName,
    InputValue
  }
});