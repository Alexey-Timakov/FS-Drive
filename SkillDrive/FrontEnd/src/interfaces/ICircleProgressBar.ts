export interface ICircleProgressBar {
  isError: boolean;
  isLoading: boolean;
  percent: number;
  stop: () => void;
  reload: () => void;
  remove?: () => void;
}