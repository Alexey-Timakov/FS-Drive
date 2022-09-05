export interface IThumbnailFile {
  file: File;
  deleteFile: (fileName: string) => void;
  changeUploadErrors?: (increment: number) => void;
}