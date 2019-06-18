import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-details-bio",
  templateUrl: "./details-bio.component.html",
  styleUrls: ["./details-bio.component.scss"]
})
export class DetailsBioComponent implements OnInit {
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor() {}

  ngOnInit() {}

  addBrother() {}

  addSister() {}
}
