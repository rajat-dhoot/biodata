import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { DesignModel } from "./models/DesignModel";
import { BioModule } from "./bio.module";

@Injectable()
export class BioService {
  currentSection$ = new Subject();
  designModel = new DesignModel("#000000", "#ffffff", "1", false);

  setCurrentSection(currentSection: number): void {
    this.currentSection$.next(currentSection);
  }

  getDesignModel(): DesignModel {
    return this.designModel;
  }

  setDesignModel(designModel) {
    this.designModel = { ...designModel };
  }
  constructor() {}
}
