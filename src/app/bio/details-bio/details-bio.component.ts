import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";

@Component({
  selector: "app-details-bio",
  templateUrl: "./details-bio.component.html",
  styleUrls: ["./details-bio.component.scss"]
})
export class DetailsBioComponent implements OnInit {
  step = 0;
  detailsForm: FormGroup;
  myForm: NgForm;
  // minDate = new Date(1975, 0, 1);
  // maxDate = new Date(2002, 0, 1);
  validationMessages = {
    fullName: {
      required: "Full Name is required",
      minlength: "Full Name must be greater than 2 characters.",
      maxlength: "Full Name must be less than 30 characters."
    },
    birthDate: {
      required: "Birth Date is required"
    },
    birthPlace: {
      required: "Birth Place is required"
    }
  };
  formErrors = {
    personal: {
      fullName: "",
      birthDate: "",
      birthPlace: "",
      isInvalid: false
    }
  };
  logValidationMessage(groupName: string): void {
    const group = <FormGroup>this.detailsForm.get(groupName);
    this.formErrors[groupName]["isInvalid"] = group.invalid;
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.dirty || abstractControl.touched)
      ) {
        const message = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[groupName][key] = message[errorKey];
          }
        }
      }
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
        birthPlace: ["", Validators.required]
      })
    });
    this.detailsForm.valueChanges.subscribe(value => {
      for (let group in value) this.logValidationMessage(group);
    });
  }
  addBrother() {}
  addSister() {}
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
}
