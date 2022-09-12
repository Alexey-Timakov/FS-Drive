export const ADD_INITIAL_DATA = "ADD_INITIAL_DATA";

export const addInitialLoadingData = (InputName: string, InputValue: string | boolean) => ({
  type: ADD_INITIAL_DATA,
  payload: {
    InputName,
    InputValue
  }
});