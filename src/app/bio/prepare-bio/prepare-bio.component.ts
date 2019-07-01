import { Component, OnInit, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-prepare-bio",
  templateUrl: "./prepare-bio.component.html",
  styleUrls: ["./prepare-bio.component.scss"]
})
export class PrepareBioComponent implements OnInit {
  borderStyle = {
    "background-color": "lightyellow",
    "font-color": "black",
    border: "1px solid"
  };

  data = {
    personal: {
      name: "rajat",
      dob: "dob",
      birthTime: "10:00",
      height: "5'11\"",
      birthPlace: "varanasi",
      complexion: "fair",
      bloodGroup: "o+",
      qualification: "qual",
      occupation: "occ",
      hobbies: "hob"
    },
    family: {
      fatherName: "ram",
      fatherOccupation: "business",
      motherName: "jaishri",
      motherOccupation: "homeMaker"
    },
    contact: {
      address: "rathyatra, mahmoorganj, varanasi",
      contact1: "9898989898",
      contact2: "9898989898",
      email: "rajat.dhoot@gmail.com"
    },
    maternal: {
      grandfatherName: "gfName",
      grandMotherName: "gmName"
    },
    paternal: {
      grandfatherName: "gfName",
      grandMotherName: "gmName"
    }
  };

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit() {}
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
