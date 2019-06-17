import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BioService } from "../bio.service";
import { MatStepper } from "@angular/material";

@Component({
  selector: "app-create-bio",
  templateUrl: "./create-bio.component.html",
  styleUrls: ["./create-bio.component.scss"]
})
export class CreateBioComponent implements OnInit {
  currentSection: number = 1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bioservice: BioService
  ) {}

  ngOnInit() {}

  switchSection(e) {
    this.currentSection = e.selectedIndex + 1;
    this.bioservice.setCurrentSection(this.currentSection);
    let routes = this.currentSection === 1 ? "./design" : "./details";
    this.router.navigate([routes], { relativeTo: this.route });
  }
}
