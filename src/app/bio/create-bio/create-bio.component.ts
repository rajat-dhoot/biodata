import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-create-bio",
  templateUrl: "./create-bio.component.html",
  styleUrls: ["./create-bio.component.scss"]
})
export class CreateBioComponent implements OnInit {
  isCompleted: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) {}
  switchSection() {
    this.router.navigate(["./details"], { relativeTo: this.route });
  }

  ngOnInit() {}
}
