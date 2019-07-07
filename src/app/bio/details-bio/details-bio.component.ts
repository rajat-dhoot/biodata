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
export class DetailsBioComponent implements OnInit {
  step = 0;
  detailsForm: FormGroup;
  isDisabled: boolean;
  @ViewChild("myForm", { static: false }) myForm: NgForm;
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
      }
      if (abstractControl instanceof FormGroup)
        this.logValidationMessage(abstractControl);
      if (abstractControl instanceof FormArray)
        for (const control of abstractControl.controls)
          if (control instanceof FormGroup) this.logValidationMessage(control);
    });
  }

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private _bioservice: BioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
      }),
      colorSchema: this.fb.group({
        bgColor: ["#ffffff"],
        fColor: ["#000000"]
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

    let model = this._bioservice.getDetailsModel();
    if (model) {
      let data = model.value;
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
    }
    this.router.navigate(["../download"], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.myForm.dirty && !this.myForm.valid) {
      return this.dialogService.confirm(
        "Changes will not be saved if you leave the page. Discard changes?"
      );
    }
    return true;
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
      message = this.capFirst(word) + " is required.";
    }
    return message;
  }

  loadData() {
    let data = {
      personal: {
        fullName: "rajat",
        birthDate: new Date(1994, 5, 16),
        birthTime: "10:20",
        height: "5'11\"",
        birthPlace: "varanasi",
        complexion: "fair",
        bloodGroup: "o+",
        qualification: "B.tech Bits Pilani",
        occupation: "Software Engineer, Amazon Bangalore",
        hobbies: "Reading, Dancing, Singing"
      },
      family: {
        fatherName: "ram",
        fatherOccupation: "Silk Yarn Business Varanasi",
        motherName: "jaishri",
        motherOccupation: "homeMaker",
        brothers: [
          {
            brotherName0: "Rajat",
            brotherOccupation0: "Btech"
          },
          {
            brotherName1: "Vijay",
            brotherOccupation1: "Pursuing CA"
          }
        ],
        sisters: [
          {
            sisterName0: "Payal",
            sisterOccupation0: "Tax Management"
          }
        ]
      },
      contact: {
        address: "rathyatra, mahmoorganj, varanasi",
        contact1: "9898989898",
        contact2: "9898989898",
        email: "rajat.dhoot@gmail.com"
      },
      paternal: {
        grandfatherName: "gfName",
        grandmotherName: "gmName",
        uncles: [
          { uncleName0: "Pawan", uncleOccupation0: "Business" },
          { uncleName1: "XYZ", uncleOccupation1: "Business" }
        ],
        aunts: [{ auntName0: "Sushila", auntOccupation0: "Housewife" }]
      },
      maternal: {
        "grandfatherName#": "gfName",
        "grandmotherName#": "gmName",
        "uncles#": [
          { "uncleName#0": "Dinesh", "uncleOccupation#0": "Business" },
          { "uncleName#1": "Sunil", "uncleOccupation#1": "Business" }
        ],
        "aunts#": [{ "auntName#0": "Rajshree", "auntOccupation#0": "LIC" }]
      },
      colorSchema: {
        bgColor: "#ffcccc",
        fColor: "#000000"
      }
    };
    data.family.brothers.forEach(brother => this.addBrother());
    data.family.sisters.forEach(sister => this.addSister());
    data.paternal.uncles.forEach(uncle => this.addUncle("paternal"));
    data.paternal.aunts.forEach(aunt => this.addAunt("paternal"));
    data.maternal["uncles#"].forEach(uncle => this.addUncle("maternal", "#"));
    data.maternal["aunts#"].forEach(aunt => this.addAunt("maternal", "#"));
    setTimeout(() => this.detailsForm.setValue({ ...data }), 1000);
    this.detailsForm.markAsDirty();
  }
}
