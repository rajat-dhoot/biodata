import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-create-bio",
  templateUrl: "./create-bio.component.html",
  styleUrls: ["./create-bio.component.scss"]
})
export class CreateBioComponent implements OnInit {
  currentSection: number = 1;
  constructor(private route: ActivatedRoute, private router: Router) {}
  switchSection() {
    this.currentSection = this.currentSection === 1 ? 2 : 1;
    let route = this.currentSection === 1 ? "./design" : "./details";
    this.router.navigate([route], { relativeTo: this.route });
  }

  ngOnInit() {}
}
