export interface IRegStep {
  changeRegStep: (stepIncrement: number) => void;
  toggleErrorBar: (isError: boolean, errorNumber: number) => void;
}