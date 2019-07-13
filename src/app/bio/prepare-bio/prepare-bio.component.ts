import { Component, OnInit } from "@angular/core";
import { BioService } from "../services/bio.service";

@Component({
  selector: "app-prepare-bio",
  templateUrl: "./prepare-bio.component.html",
  styleUrls: ["./prepare-bio.component.scss"]
})

/*
 * Prepare Bio Component - This component is used to prepare the template for the biodata.
 * variables are used here to reduce the repititive code on the html by extracting the nested controls.
 */
export class PrepareBioComponent implements OnInit {
  formData: any;
  data: any;
  brothers: any;
  sisters: any;
  pUncles: any;
  pAunts: any;
  mUncles: any;
  mAunts: any;

  constructor(private _bioservice: BioService) {}

  ngOnInit() {
    this.formData = this._bioservice.getDetailsModel();
    if (this.formData) this.data = { ...this.formData.value };
    this.brothers = this.data.family.brothers;
    this.sisters = this.data.family.sisters;
    this.pUncles = this.data.paternal.uncles;
    this.pAunts = this.data.paternal.aunts;
    this.mUncles = this.data.maternal["uncles#"];
    this.mAunts = this.data.maternal["aunts#"];
  }
}

/* 
for sanitizing border image -
   "border-image-source": this._sanitizer.sanitize(
      SecurityContext.URL,
      `url('assets/border/5.png')`
    ),
    "border-image-slice": 20,
    "border-image-width": 15,
    "border-image-repeat": "round"

*/
