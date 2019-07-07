import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-help",
  templateUrl: "./help.component.html",
  styleUrls: ["./help.component.scss"]
})
export class HelpComponent implements OnInit {
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

  rule = {
    personal: "",
    family: "",
    contact: "",
    paternal: "",
    maternal: "",
    colorSchema: ""
  };

  personal = [
    {
      fieldName: "Name",
      rule: "Mention your fullname. Format : FirstName LastName"
    },
    {
      fieldName: "BirthDate",
      rule:
        "Select from datepicker. Entering date manually is disabled. Click on the date input to open datepicker"
    },
    { fieldName: "BirthTime", rule: "Mention in 24 hour format" },
    { fieldName: "Height", rule: "Format- Foot'Inches\" Example - 5'11\"" },
    { fieldName: "BirthPlace", rule: "Mention your birth city name" },
    { fieldName: "Complexion", rule: "Select one of the listed options" },
    {
      fieldName: "BloodGroup",
      rule: "Allowed values are O, A, B, AB followed by +/-"
    },
    {
      fieldName: "Occupation",
      rule:
        "Mention your occupation. You can mention your current city along with the occupation."
    },
    {
      fieldName: "Qualification",
      rule: "Mention your educational qualification"
    },
    {
      fieldName: "Hobbies",
      rule: "Mention your hobbies seperated by comma(,)"
    }
  ];

  family = [
    { fieldName: "Name", rule: "Mention fullname" },
    {
      fieldName: "Occupation",
      rule: "Mention occupation followed by current city"
    },
    { fieldName: "Add Brother", rule: "Click to add brother details" },
    { fieldName: "Add Sister", rule: "Click to add sister details" }
  ];

  contact = [
    { fieldName: "Address", rule: "Mention your complete residential address" },
    {
      fieldName: "Contact",
      rule: "Mention your 10 digit mobile number. Do not add +91 before it."
    },
    { fieldName: "Email", rule: "Mention your email address" }
  ];

  paternal = [
    { fieldName: "Name", rule: "Mention fullname" },
    {
      fieldName: "Occupation",
      rule: "Mention occupation followed by current city"
    },
    {
      fieldName: "Add Uncle",
      rule: "Click to add paternal uncle(chacha) details"
    },
    { fieldName: "Add Aunt", rule: "Click to add paternal aunt(bua) details" }
  ];

  maternal = [
    { fieldName: "Name", rule: "Mention fullname" },
    {
      fieldName: "Occupation",
      rule: "Mention occupation followed by current city"
    },
    {
      fieldName: "Add Uncle",
      rule: "Click to add paternal uncle(mama) details"
    },
    { fieldName: "Add Aunt", rule: "Click to add paternal aunt(masi) details" }
  ];

  colorSchema = [
    {
      fieldName: "Background",
      rule:
        "Choose the background color for your biodata. You can view the selected colour in preview. Use slider to select different shades."
    },
    {
      fieldName: "Font Color",
      rule:
        "Choose the font color for your biodata. You can view the selected colour in preview. Use slider to select different shades."
    }
  ];

  getRule(field, prop) {
    this.rule[field] = prop.rule;
  }

  constructor() {}

  ngOnInit() {}
}
