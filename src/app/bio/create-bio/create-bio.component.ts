import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BioService } from "../bio.service";
import { MatStepper } from "@angular/material";
import { Event, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-create-bio",
  templateUrl: "./create-bio.component.html",
  styleUrls: ["./create-bio.component.scss"]
})
export class CreateBioComponent implements OnInit {
  @ViewChild("stepper", { static: false }) stepper: MatStepper;
  currentSection: number;
  currentUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bioservice: BioService
  ) {}

  ngOnInit() {
    this.currentSection = 1;
    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationEnd) {
        if (e.urlAfterRedirects.includes("design")) {
          this.currentSection = 1;
          this.move(this.currentSection - 1);
        }
      }
    });
  }

  move(index: number) {
    this.stepper.selectedIndex = index;
  }

  switchSection(e) {
    this.currentSection = ((e.previouslySelectedIndex + 1) % 2) + 1;
    let route = this.currentSection === 1 ? "./design" : "./details";
    this.router.navigate([route], { relativeTo: this.route });
  }
}
