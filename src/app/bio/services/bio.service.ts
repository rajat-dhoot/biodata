import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

/* 
  BioService - Service for saving and retrieving user entered form data
*/

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
