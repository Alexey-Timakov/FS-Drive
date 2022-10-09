import { Towns } from "../entities/town.entity";

export default class TownResponce {
  townName: string;
  townState: string;

  constructor(model: Towns) {
    this.townName = model.city;
    this.townState = model.region;
  }
}