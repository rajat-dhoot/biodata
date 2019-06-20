import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  AbstractControl
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
    fullName: {
      minlength: "Full Name must be greater than 2 characters.",
      maxlength: "Full Name must be less than 30 characters."
    },
    bloodGroup: {
      pattern: "Enter a valid blood group O|A|B|AB (+|-)"
    },
    height: {
      heightMismatch: "Enter a valid height e.g. 5-11"
    }
  };
  formErrors = {
    personal: {
      fullName: "",
      birthDate: "",
      birthPlace: "",
      birthTime: "",
      height: "",
      complexion: "",
      qualification: "",
      occupation: "",
      hobbies: "",
      bloodGroup: ""
    }
  };

  logValidationMessage(groupName: string): void {
    const group = <FormGroup>this.detailsForm.get(groupName);
    // this.formErrors[groupName]["isInvalid"] = group.invalid;
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      console.log(abstractControl);
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.dirty || abstractControl.touched)
      ) {
        const message = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey === "required")
            this.formErrors[groupName][key] = this.getRequiredErrorMessage(key);
          else if (errorKey) {
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
        birthPlace: ["", Validators.required],
        birthTime: ["", Validators.required],
        timeInterval: ["am"],
        height: ["", [Validators.required, heightValidator]],
        complexion: ["", Validators.required],
        qualification: ["", Validators.required],
        occupation: ["", Validators.required],
        hobbies: ["", Validators.required],
        bloodGroup: [
          "",
          [Validators.required, Validators.pattern("^(A|B|AB|O)[+-]$")]
        ]
      })
    });
    // need to associate time interval with birthTime
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

  capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getRequiredErrorMessage(key: string) {
    let pos = /(?<!^)(?=[A-Z])/.exec(key);
    let message = "";
    if (pos) {
      let index = pos.index;
      message = `${this.capFirst(key.substring(0, index))} ${key.substring(
        index,
        key.length
      )} is required.`;
    } else message = this.capFirst(key) + " is required.";
    return message;
  }
}

function heightValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const height: string = control.value;
  const pattern = "^[4-6]?-?(1[0-1]|[0-9])$";
  if (height.match(pattern)) return null;
  else return { heightMismatch: true };
}
// for custom validator with parameter we need to return the above mentioned function (as an arrow function) **Closure
// we can also declare a custom validator class and make this method static and call it using CustomValidator.func
