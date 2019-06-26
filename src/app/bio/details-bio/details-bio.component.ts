import { Component, OnInit } from "@angular/core";
import { CustomValidator } from "../bio.validators";
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  AbstractControl,
  FormArray
} from "@angular/forms";

@Component({
  selector: "app-details-bio",
  templateUrl: "./details-bio.component.html",
  styleUrls: ["./details-bio.component.scss"]
})
export class DetailsBioComponent implements OnInit {
  step = 0;
  detailsForm: FormGroup;
  myForm: NgForm;
  minDate = new Date(1975, 0, 1);
  maxDate = new Date(2002, 0, 1);
  complexion = ["light", "fair", "wheatish", "olive", "brown", "dark"];
  validationMessages = {
    minlength: "Full Name must be greater than 2 characters.",
    maxlength: "Full Name must be less than 30 characters.",
    pattern: "Enter a valid blood group O|A|B|AB (+|-)",
    heightMismatch: "Enter a valid height e.g. 5'11\"",
    invalidEmail: "Enter a valid email id",
    invalidContact: "Enter a 10 digit valid contact number."
  };
  formErrors = {};

  logValidationMessage(group: FormGroup = this.detailsForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.dirty || abstractControl.touched)
      ) {
        for (const errorKey in abstractControl.errors) {
          if (errorKey === "required")
            this.formErrors[key] = this.getRequiredErrorMessage(key);
          else if (errorKey) {
            this.formErrors[key] = this.validationMessages[errorKey];
          }
        }
        console.log(this.formErrors);
      }
      if (abstractControl instanceof FormGroup)
        this.logValidationMessage(abstractControl);
      if (abstractControl instanceof FormArray)
        for (const control of abstractControl.controls)
          if (control instanceof FormGroup) this.logValidationMessage(control);
    });
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.detailsForm = this.fb.group({
      personal: this.fb.group({
        fullName: [
          "",
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30)
          ]
        ],
        birthDate: ["", Validators.required],
        birthPlace: ["", Validators.required],
        birthTime: ["", Validators.required],
        timeInterval: ["am"],
        height: ["", [Validators.required, CustomValidator.validateHeight]],
        complexion: ["", Validators.required],
        qualification: ["", Validators.required],
        occupation: ["", Validators.required],
        hobbies: ["", Validators.required],
        bloodGroup: [
          "",
          [Validators.required, Validators.pattern("^(A|B|AB|O)[+-]$")]
        ]
      }),
      family: this.fb.group({
        fatherName: ["", Validators.required],
        fatherOccupation: ["", Validators.required],
        motherName: ["", Validators.required],
        motherOccupation: ["", Validators.required],
        brothers: this.fb.array([]),
        sisters: this.fb.array([])
      }),
      contact: this.fb.group({
        address: ["", Validators.required],
        contact1: ["", [Validators.required, CustomValidator.validateContact]],
        contact2: ["", [Validators.required, CustomValidator.validateContact]],
        email: ["", [Validators.required, CustomValidator.validateEmail]]
      }),
      paternal: this.fb.group({
        grandfatherName: ["", Validators.required],
        grandmotherName: ["", Validators.required],
        uncles: this.fb.array([]),
        aunts: this.fb.array([])
      }),
      maternal: this.fb.group({
        "grandfatherName#": ["", Validators.required],
        "grandmotherName#": ["", Validators.required],
        "uncles#": this.fb.array([]),
        "aunts#": this.fb.array([])
      })
    });
    // need to associate time interval with birthTime
    this.detailsForm.valueChanges.subscribe(value => {
      for (let group in value)
        this.logValidationMessage(<FormGroup>this.detailsForm.get(group));
    });
  }

  addFormGroup(person: string, index: number, para: string = ""): FormGroup {
    let name: string = person + "Name" + para + index;
    let occ: string = person + "Occupation" + para + index;
    return this.fb.group({
      [name]: ["", Validators.required],
      [occ]: ["", Validators.required]
    });
  }

  addBrother() {
    let brothers = <FormArray>this.detailsForm.get("family").get("brothers");
    brothers.push(this.addFormGroup("brother", brothers.length));
  }
  addSister() {
    let sisters = <FormArray>this.detailsForm.get("family").get("sisters");
    sisters.push(this.addFormGroup("sister", sisters.length));
  }

  addUncle(groupName: string, para: string = "") {
    let uncles = <FormArray>(
      this.detailsForm.get(groupName).get(`uncles${para}`)
    );
    uncles.push(this.addFormGroup("uncle", uncles.length, para));
  }
  addAunt(groupName: string, para: string = "") {
    let aunts = <FormArray>this.detailsForm.get(groupName).get(`aunts${para}`);
    aunts.push(this.addFormGroup("aunt", aunts.length, para));
  }

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }

  capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getRequiredErrorMessage(key: string) {
    let pos = /(?<!^)(?=[A-Z])/.exec(key);
    let message = "";
    if (pos) {
      let index = pos.index;
      let word = /([a-zA-Z]+)/.exec(key.substring(index, key.length))[0]; // for extracting number out of the word
      message = `${this.capFirst(
        key.substring(0, index)
      )} ${word} is required.`;
    } else {
      let word = /([a-zA-Z]+)/.exec(key)[0];
      console.log(word);
      message = this.capFirst(word) + " is required.";
    }
    return message;
  }
}
