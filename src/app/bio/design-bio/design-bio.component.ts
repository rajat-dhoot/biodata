import { Component, OnInit, ViewChild, SecurityContext } from "@angular/core";
import { DesignModel } from "../models/DesignModel";
import { NgForm } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

const maxBorderNum = 4;

@Component({
  selector: "app-design-bio",
  templateUrl: "./design-bio.component.html",
  styleUrls: ["./design-bio.component.scss"]
})
export class DesignBioComponent implements OnInit {
  @ViewChild("myForm", { static: false }) form: NgForm;

  colors = {};
  borderImage: any;
  borderStyles = {};

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit() {
    for (let i = 1; i < maxBorderNum; i++)
      this.colors[i] = `assets/border/${i}.png`;
  }

  ngAfterViewInit(): void {
    this.form.control.valueChanges.subscribe(values =>
      setTimeout(() => this.setBorder(), 100)
    );
  }

  selectBorder(value) {
    this.designModel.borderNum = value;
    this.setBorder();
  }

  setBorder() {
    let value = this.designModel.borderNum;
    if (value !== "1") {
      let imgUrl = this.colors[this.designModel.borderNum];
      this.borderStyles = {
        "background-color": this.designModel.bColor,
        color: this.designModel.fColor,
        "border-image-source": this._sanitizer.sanitize(
          SecurityContext.URL,
          `url('${imgUrl}')`
        ),
        "border-image-slice": 25,
        "border-image-width": 5,
        "border-image-repeat": this.designModel.borderStyle
      };
    } else {
      this.borderStyles = {
        border: "1px solid black",
        "background-color": this.designModel.bColor,
        color: this.designModel.fColor
      };
    }
  }

  designModel = new DesignModel("#000000", "#ffffff", "1", "round", false);
}
