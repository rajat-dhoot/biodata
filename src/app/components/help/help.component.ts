import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-help",
  templateUrl: "./help.component.html",
  styleUrls: ["./help.component.scss"]
})

/*
 * Help Component - This component gives user detailed information and guidelines required for filling the form
 * The UI has five major sections (personal, family, paternal, maternal, contact) and their control fields as a button
 * When the user clicks the button an instruction regarding the same appears in the action bar of the card
 * When user clicks the button "getRule" function sets the rule object for that section using static predefined rules set.
 * Since the data is two way binded the selected class appears even if user selects any other control from other section.
 */
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

  getRule(field, prop) {
    this.rule[field] = prop.rule;
  }

  constructor() {}

  ngOnInit() {}
}
