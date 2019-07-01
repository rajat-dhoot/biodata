import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { DesignModel } from "../models/DesignModel";
import { BioModule } from "../bio.module";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";

@Injectable()
export class BioService {
  designModel = new DesignModel("#000000", "#ffffff", "1");
  detailsModel: FormGroup;
  private disableCreateBtn: BehaviorSubject<boolean>;

  public getDisableBtn(): Observable<boolean> {
    return this.disableCreateBtn.asObservable();
  }

  public setDisableBtn(isDisable: boolean): void {
    this.disableCreateBtn.next(isDisable);
  }

  setDetailsModel(detailsModel) {
    this.detailsModel = { ...detailsModel };
  }

  getDetailsModel(): FormGroup {
    return this.detailsModel;
  }

  getDesignModel(): DesignModel {
    return this.designModel;
  }
  setDesignModel(designModel) {
    this.designModel = { ...designModel };
  }
  constructor() {
    this.disableCreateBtn = new BehaviorSubject<boolean>(true);
  }
}
