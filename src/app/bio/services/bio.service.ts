import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable()
export class BioService {
  detailsModel: FormGroup;

  setDetailsModel(detailsModel) {
    this.detailsModel = { ...detailsModel };
  }

  getDetailsModel(): FormGroup {
    return this.detailsModel;
  }

  constructor() {}
}
