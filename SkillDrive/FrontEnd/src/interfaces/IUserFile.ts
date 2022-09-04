export class IUserFile {
  name: string;
  ext: string;
  size: string;

  constructor(model: File) {
    this.name = model.name.split(".")[0];
    this.ext = model.name.split(".")[1];
    this.size = Math.round(model.size * 10 / (1024 * 1024)) / 10 + "MB";
  }
}