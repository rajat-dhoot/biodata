import {
  Component,
  OnInit,
  ViewChild,
  SecurityContext,
  Input,
  SimpleChanges
} from "@angular/core";
import { DesignModel } from "../models/DesignModel";
import { NgForm } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { BioService } from "../bio.service";

const maxBorderNum = 15;

@Component({
  selector: "app-design-bio",
  templateUrl: "./design-bio.component.html",
  styleUrls: ["./design-bio.component.scss"]
})
export class DesignBioComponent implements OnInit {
  @ViewChild("myForm", { static: false }) form: NgForm;
  colors = {};
  designModel: DesignModel;
  borderStyles = {};

  constructor(
    private _sanitizer: DomSanitizer,
    private _bioservice: BioService
  ) {}

  ngOnInit() {
    this.designModel = { ...this._bioservice.getDesignModel() };
    this._bioservice.currentSection$.subscribe(current => {
      if (current === 2) this._bioservice.setDesignModel(this.designModel);
      else this.designModel = { ...this._bioservice.getDesignModel() };
    });

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
    let border;
    if (value === "1") {
      // default border
      border = {
        border: "1px solid black"
      };
    } else {
      // if any other border is selected update that border
      let imgUrl = this.colors[this.designModel.borderNum];
      border = {
        "border-image-source": this._sanitizer.sanitize(
          SecurityContext.URL,
          `url('${imgUrl}')`
        ),
        "border-image-slice": 20,
        "border-image-width": 15,
        "border-image-repeat": "round"
      };
    }
    // updating the border style
    this.borderStyles = {
      "background-color": this.designModel.bColor,
      color: this.designModel.fColor,
      ...border
    };
  }
}
