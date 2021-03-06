import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { CustomValidator } from "../bio.validators";
import { Observable } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  FormArray
} from "@angular/forms";
import { DialogService } from "../services/dialog.service";
import { BioService } from "../services/bio.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-details-bio",
  templateUrl: "./details-bio.component.html",
  styleUrls: ["./details-bio.component.scss"]
})

/*
  * Details Bio Component - This component is implemented to gather user details for creating biodata.
  * Variables -
    * step : for accordion
    * detailsForm : Contains the form object
    * model : Fetches the existing forms data
    * isDisabled : Helps to toggle 'Create' button, to enable only when the form is valid and dirty
    * minDate-maxDate : Specifies min and max date one can enter in the details form
    * complexion : Static values for select (input)
    * validationMessages : Contains validation messages apart from required message.
    * formErrors : We insert errors in this object with the help of validation messages, 
      LogValidationMessage and getRequiredMessage function. It is used in mat-error in the html view.
*/
export class DetailsBioComponent implements OnInit {
  @ViewChild("myForm", { static: false }) myForm: NgForm;
  step = 0;
  detailsForm: FormGroup;
  model: FormGroup;
  isDisabled: boolean;
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

  /*
   * This function is called whenever there are any value or controls are changed in the form.
   * It takes the form group and checks if its control is touched or dirty and is invalid to show required error message
   * If the control is another form group or form array then the function is recursively called to check nested controls
   */

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
      }
      if (abstractControl instanceof FormGroup)
        this.logValidationMessage(abstractControl);
      if (abstractControl instanceof FormArray)
        for (const control of abstractControl.controls)
          if (control instanceof FormGroup) this.logValidationMessage(control);
    });
  }

  // This method forms the required form error message using the key. - xyz field is required
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
      message = this.capFirst(word) + " is required.";
    }
    return message;
  }

  /*
   * Form Builder - For creating form object => ["", Validation]
   * Bio Service - To save and retrieve exisiting form data
   * Dialog Service - For CanDeactivate Guard
   * Router and ActivatedRoute - for navigation and prefetching data from resolver.
   */

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private _bioservice: BioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.model = this.route.snapshot.data["detailsModel"];
  }

  // to initialize form object
  initializeForm() {
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
        height: ["", [Validators.required, CustomValidator.validateHeight]],
        complexion: ["", Validators.required],
        qualification: ["", Validators.required],
        occupation: ["", Validators.required],
        hobbies: ["", Validators.required],
        bloodGroup: [
          "",
          [Validators.required, Validators.pattern("^(A|B|O|AB|ab|o|a|b)[+-]$")]
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
  }

  ngOnInit() {
    this.isDisabled = true;
    this.initializeForm();
    this.detailsForm.valueChanges.subscribe(value => {
      for (let group in value)
        this.logValidationMessage(<FormGroup>this.detailsForm.get(group));
      this.isDisabled = !(this.detailsForm.valid && this.detailsForm.dirty);
    });
    if (this.model) {
      let data = this.model.value;
      data.family.brothers.forEach(brother => this.addBrother());
      data.family.sisters.forEach(sister => this.addSister());
      data.paternal.uncles.forEach(uncle => this.addUncle("paternal"));
      data.paternal.aunts.forEach(aunt => this.addAunt("paternal"));
      data.maternal["uncles#"].forEach(uncle => this.addUncle("maternal", "#"));
      data.maternal["aunts#"].forEach(aunt => this.addAunt("maternal", "#"));
      setTimeout(() => this.detailsForm.setValue({ ...data }), 1000);
      this.detailsForm.markAsDirty();
      this.isDisabled = !(this.detailsForm.valid && this.detailsForm.dirty);
    }
  }

  resetForm() {
    this.initializeForm();
    this._bioservice.setDetailsModel("");
  }

  createBiodata() {
    if (this.myForm && this.myForm.dirty && this.myForm.valid) {
      this._bioservice.setDetailsModel(this.detailsForm);
      this._bioservice
        .saveData(this.detailsForm.value)
        .subscribe(data => console.log(data), err => console.log(err));
    }
    this.router.navigate(["../download"], { relativeTo: this.route });
  }

  // canDeactivate Guard method

  canDeactivate(): Observable<boolean> | boolean {
    if (this.myForm.dirty && !this.myForm.valid) {
      return this.dialogService.confirm(
        "Changes will not be saved if you leave the page. Discard changes?"
      );
    }
    return true;
  }

  /*
   * addFormGroup - Helps in adding form groups dynamically addBrother, addSister, addUncle, addAunt
   * addBrother, addSister, addUncle, addAunt - corresponding form array is extracted, form group with required key is created and pushed in the form array
   */

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
}

/* Used for testing purpose - for automatically loading static data */
// loadData() {
//   let data = {
//     personal: {
//       fullName: "Saurabh Maheshwari",
//       birthDate: new Date(1994, 5, 16),
//       birthTime: "10:20",
//       height: "5'11\"",
//       birthPlace: "Mumbai",
//       complexion: "fair",
//       bloodGroup: "O+",
//       qualification: "B.tech, BITS Pilani",
//       occupation: "Software Engineer, Amazon, Bangalore",
//       hobbies: "Reading, Dancing, Singing"
//     },
//     family: {
//       fatherName: "Rishab Maheshwari",
//       fatherOccupation: "Senior Manager, ICICI Bank, Mumbai",
//       motherName: "Saroj Maheshwari",
//       motherOccupation: "Homemaker",
//       brothers: [
//         {
//           brotherName0: "Abhishek Maheshari",
//           brotherOccupation0: "Pursuing CA"
//         }
//       ],
//       sisters: [
//         {
//           sisterName0: "Komal Maheshwari",
//           sisterOccupation0: "Tax Consultant, Deloitte, Hyderabad"
//         }
//       ]
//     },
//     contact: {
//       address: "Flat No. 4, Beach Towers, Prabha Devi, Dadar, Mumbai",
//       contact1: "9898989898",
//       contact2: "9898989898",
//       email: "rishab.maheshwari@gmail.com"
//     },
//     paternal: {
//       grandfatherName: "Govind Maheshwari",
//       grandmotherName: "Asha Maheshwari",
//       uncles: [
//         {
//           uncleName0: "Aakash Maheshwari",
//           uncleOccupation0: "Clothes Business, Indore"
//         },
//         {
//           uncleName1: "Aditya Maheshwari",
//           uncleOccupation1: "Manager, Cloud Operations, TCS, USA"
//         },
//         {
//           uncleName2: "Yash Maheshwari",
//           uncleOccupation2: "Professor, Delhi University"
//         }
//       ],
//       aunts: [{ auntName0: "Radhika Somani", auntOccupation0: "Housewife" }]
//     },
//     maternal: {
//       "grandfatherName#": "Ram Rathi",
//       "grandmotherName#": "Kanta Rathi",
//       "uncles#": [
//         {
//           "uncleName#0": "Suresh Rathi",
//           "uncleOccupation#0": "Grain Merchant, Bhopal"
//         },
//         {
//           "uncleName#1": "Manoj Rathi",
//           "uncleOccupation#1": "Hardware Retailer, Bhopal"
//         },
//         {
//           "uncleName#2": "Hardik Rathi",
//           "uncleOccupation#2": "Catering Services, Bhopal"
//         }
//       ],
//       "aunts#": [
//         {
//           "auntName#0": "Rajshree Maheshwari",
//           "auntOccupation#0": "Boutique Shop, Kolkata"
//         }
//       ]
//     }
//   };
//   data.family.brothers.forEach(brother => this.addBrother());
//   data.family.sisters.forEach(sister => this.addSister());
//   data.paternal.uncles.forEach(uncle => this.addUncle("paternal"));
//   data.paternal.aunts.forEach(aunt => this.addAunt("paternal"));
//   data.maternal["uncles#"].forEach(uncle => this.addUncle("maternal", "#"));
//   data.maternal["aunts#"].forEach(aunt => this.addAunt("maternal", "#"));
//   setTimeout(() => this.detailsForm.setValue({ ...data }), 1000);
//   this.detailsForm.markAsDirty();
// }
