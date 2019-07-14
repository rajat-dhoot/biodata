import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { map } from "rxjs/operators";

/* 
  BioService - Service for saving and retrieving user entered form data
*/

@Injectable()
export class BioService {
  detailsModel: FormGroup;
  private _url = "/api/biodata/";
  constructor(private _http: HttpClient) {}

  saveData(formData: any) {
    return this._http.post(this._url, formData);
  }

  setDetailsModel(detailsModel) {
    this.detailsModel = { ...detailsModel };
  }

  getDetailsModel(): FormGroup {
    return this.detailsModel;
  }
}
