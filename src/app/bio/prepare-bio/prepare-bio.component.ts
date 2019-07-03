import { Component, OnInit } from "@angular/core";
import { BioService } from "../services/bio.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-prepare-bio",
  templateUrl: "./prepare-bio.component.html",
  styleUrls: ["./prepare-bio.component.scss"]
})
export class PrepareBioComponent implements OnInit {
  borderStyle = {
    "font-color": "black",
    border: "1px solid grey"
  };

  formData: any;
  data: any;

  constructor(
    private _bioservice: BioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.formData = this._bioservice.getDetailsModel();
    console.log(this.formData.value);
    if (this.formData) this.data = { ...this.formData.value };
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
